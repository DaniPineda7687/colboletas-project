import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../AppContext";
import NavBar from "../components/NavBar";
import { axiosInstance } from "../utils/axiosInstance";
import "./UserTicket.css";
import TicketEvent from "../components/TicketEvent";
const UserTickets=()=>{
    const{state, dispatch}=useContext(AppContext);
    const[ticketsBuy, setTicketsBuy]=useState([]);
    const[infoEventsUser, setInfoEventsUser]=useState([]);
    const{userData}=state;  
    const getPurchasesUser=async()=>{
        const{data}= await axiosInstance.get(`payments/user/${userData[0]._id}`);
        const eventsUser = await Promise.all(data.map(async(element)=>{
            const{data}=await axiosInstance.get(`events/searchid?id=${element.eventId}`);
            return data;
        }))
        setInfoEventsUser(eventsUser);
        setTicketsBuy(data)
    }

    
    useEffect(()=>{
        getPurchasesUser();
    },[])
    return(
        <>
            <NavBar value={"tickets"}/>
            <div className="main-container">
                <p className="section-title section-title-mod">Tus tickets</p>
                {
                    infoEventsUser.length>0
                    ?
                    <div className="tickets-user-container">
                        {
                            infoEventsUser.map((event,index)=>{
                                return(
                                    <>
                                        <TicketEvent event={event} userData={userData} ticketsBuy={ticketsBuy} index={index}/>  
                                    </>
                                )
                            })
                        }
                        
                    </div>
                    :
                    <p>No tienes tickets en tu cuenta</p>
                }
            </div>
        </>
    );
}

export default UserTickets;