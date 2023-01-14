import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EventList from "../components/EventList";
import NavBar from "../components/NavBar";
import SearchEvent from "../components/SearchEvent";
import { axiosInstance } from "../utils/axiosInstance";

const SearchScreen=()=>{
    const{searchInput}=useParams();
    const[searchEvents, setSearchEvents]=useState([]);
    const getSearchEvents = async()=>{
        const {data} = await axiosInstance.get(`events/search?query=${searchInput}`);
        setSearchEvents(data);
    }
    useEffect(()=>{
        getSearchEvents();
    },[searchInput]) 



    return(
        <>
            <NavBar/>
            <div className="main-container">
                <p className="section-title section-title-mod">Resultados</p>
                <SearchEvent searchInput={searchInput}/>
                <EventList events={searchEvents}/>
            </div>
        </>
    );
}

export default SearchScreen;