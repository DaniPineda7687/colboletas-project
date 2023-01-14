import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CategoriesEvent from "../components/CategoriesEvent";
import EventList from "../components/EventList";
import NavBar from "../components/NavBar";
import { axiosInstance } from "../utils/axiosInstance";

const CategoriesScreen=()=>{
    const {categoryId} = useParams();
    const[eventsByCategory, setEventsByCategory]=useState([]);
    const getEventsByCategory = async()=>{
        const {data} = await axiosInstance.get(`events/category/${categoryId}`);
        setEventsByCategory(data);
    }
    useEffect(()=>{
        getEventsByCategory();
        
    },[categoryId]) 

    return(
        <>
            <NavBar/>
            <div className="main-container">
                <CategoriesEvent selectUser={categoryId}/>
                <EventList events={eventsByCategory} />
            </div>

        </>
    );

}

export default CategoriesScreen;