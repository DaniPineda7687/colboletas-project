import './PopularEvents.css';
import { Link } from 'react-router-dom';
import EventCard from './EventCard';
import { useState } from 'react';
import { useEffect } from 'react';
import { axiosInstance } from '../utils/axiosInstance';
const PopularEvents=()=>{
    const[popularEvents, setPopularEvents]=useState([]);
    
    const getPopularEvents = async()=>{
        const {data} = await axiosInstance.get(`events/popular?limit=4`);
        setPopularEvents(data);
    }
    useEffect(()=>{
        getPopularEvents();
    },[])   

    return(
        <div className='popular-events-main-container'>
            <div className="header-section">
                <p className="title-secondary">Eventos Populares</p>
                <Link to="/popular" className="link-section">Ver más</Link>
            </div>
            <div className="events-main-container">
                {
                    
                    popularEvents.map(event=>{
                        return(
                            <EventCard key={event.name} event={event}/>
                        )
                    })
                    
                }
            </div>
        </div>
    );
}

export default PopularEvents;