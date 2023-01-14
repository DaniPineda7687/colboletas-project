import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import EventList from "../components/EventList";
import NavBar from "../components/NavBar";
import { axiosInstance } from "../utils/axiosInstance";
import "./PopularScreen.css"
const PopularScreen=()=>{
    const[popularEvents, setPopularEvents]=useState([]);
    const getPopularEvents = async()=>{
        const {data} = await axiosInstance.get(`events/popular`);
        setPopularEvents(data);
    }
    useEffect(()=>{
        getPopularEvents();
    },[]) 
    return(
        <>
            <NavBar/>
            <div className="main-container">
                <p className="section-title section-title-mod">Eventos populares</p>
                <EventList events={popularEvents}/>
            </div>
        </>

    );
}

export default PopularScreen;