import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../AppContext";
import EventList from "../components/EventList";
import NavBar from "../components/NavBar";
import { axiosInstance } from "../utils/axiosInstance";

const FavoritesScreen=()=>{
    const [eventFav,setEventFav]=useState([]);
    const {state,dispatch}=useContext(AppContext);
    const {favorites} = state; 
    
    const getFavoriteEvents=async()=>{
        const favoriteEvents = await Promise.all(favorites.map(async(id)=>{
            const {data} = await axiosInstance.get(`events/searchid?id=${id}`);
            return data
        }))
        setEventFav(favoriteEvents);
    }
    useEffect(()=>{
        getFavoriteEvents();
    },[favorites])

    return(
        <>
            <NavBar value={"favorites"}/>
            <div className="main-container">
                <p className="section-title section-title-mod">Favoritos</p>
                <EventList events={eventFav}/>
            </div>
        </>
    );
}

export default FavoritesScreen;