import './NearbyEvents.css'
import {Map, GeolocateControl, Layer, Marker, NavigationControl, Popup, Source}  from "react-map-gl"
import 'mapbox-gl/dist/mapbox-gl.css';
import { useMemo, useState } from 'react';
import { useEffect } from 'react';
import { axiosInstance } from '../utils/axiosInstance';
import axios from 'axios';


const NearbyEvents=()=>{
    const [mapReference, setMapReference] = useState(null);
    const [userLocation,setUserLocation] = useState(null);
    const [nearEventsButton,setnearEventsButton] = useState(null);
    const [allEvents, setAllEvents] = useState(null);
    const [nearEventsToUser,setNearEventsToUser] = useState(null);

    const getAllEvents= async()=>{
        const {data} = await axiosInstance.get(`events/`);
        setAllEvents(data);
    }
    const handlerLocation = ()=>{
        if(nearEventsButton!=null){
            nearEventsButton.trigger();
        }
    }
    
    const nearEventsCal = (userLoc,totalEvents)=>{
        const nearEvents = [];
        const distanceAround = 10;
        if(totalEvents != null && userLoc!=null){
            totalEvents.forEach(element => {
                const {coords} = element;
                const long = coords[1];
                const lat = coords[0];
                axios.get(`https://api.mapbox.com/directions/v5/mapbox/driving/${long}%2C${lat}%3B${userLoc.longitude}%2C${userLoc.latitude}?alternatives=true&geometries=geojson&language=en&overview=simplified&steps=true&access_token=pk.eyJ1IjoiZGFuaXBpbmVkYTc2ODciLCJhIjoiY2xhdm1rd3IwMDczdTNzbXoyZXJhN29taCJ9.30hpkvZsDhbXyboZaVMtCw`).then(resp =>{
                    if(resp.data.routes[0].distance/1000<=distanceAround){
                        nearEvents.push(element);
                    }    
    
                })
            });
        }
        setNearEventsToUser(nearEvents);
    }

    const markers = useMemo(
        ()=> nearEventsToUser!=null ?
        nearEventsToUser.map((item,index)=>
            (<Marker
                key={`marker-${index}`}
                longitude={item.coords[1]}
                latitude={item.coords[0]}
            />)) : [],[userLocation]
        );

    useEffect(()=>{
        if(allEvents==null){
            getAllEvents();
            console.log(allEvents)
        }
    })
    useEffect(()=>{
        if(userLocation!=null && allEvents!=null && nearEventsToUser==null){
            nearEventsCal(userLocation,allEvents);
            console.log(nearEventsToUser)
        }
    })

    
    return(
        <div>
            <div className="header-section">
                <p className="title-secondary">Eventos Cercanos</p>
            </div>
            <button onClick={handlerLocation}>Eventos Cercanos</button>
            <div className='nearby-events-map-container'>
                <Map 
                    mapboxAccessToken='pk.eyJ1IjoiZGFuaXBpbmVkYTc2ODciLCJhIjoiY2xhdm1rd3IwMDczdTNzbXoyZXJhN29taCJ9.30hpkvZsDhbXyboZaVMtCw'
                    initialViewState={{
                    longitude:-74.08175,
                    latitude:4.60971,
                    zoom:13,
                    }}
                    mapStyle="mapbox://styles/mapbox/streets-v11"
                    ref={(ref)=>ref && setMapReference(ref.getMap())}
                >            

                <NavigationControl position='bottom-right'/>
                <GeolocateControl
                    onGeolocate={(event) => {
                    setUserLocation({longitude:event.coords.longitude,latitude:event.coords.latitude});
                    }
                    }
                    ref={(ref) => {
                        if(ref!=null && nearEventsButton===null)
                        {
                            setnearEventsButton(ref)
                            console.log(ref)
                        }
                    }
                    }
                    position='bottom-right'
                    trackUserLocation
                />
                {markers}
                </Map>
            </div>
        </div>
    );
}

export default NearbyEvents;