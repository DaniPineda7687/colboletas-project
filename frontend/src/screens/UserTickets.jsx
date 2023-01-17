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
    const[filter, setFilter]=useState("all");
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
                    state.userData.length>0
                    ?
                    <>
                        <div className="tickets-filters-container">
                            <div className={`all-tickets ticket-filter ${filter==="all" ? "filter-selected":""}`} onClick={()=>setFilter("all")}>
                                <p>Todos</p>
                            </div>
                            <div className={`not-claimed-tickets ticket-filter ${filter==="claimed" ? "filter-selected":""}`} onClick={()=>setFilter("claimed")}>
                                <p>Reclamados</p>
                            </div>
                            <div className={`claimed-tickets ticket-filter ${filter==="not-claimed" ? "filter-selected":""}`} onClick={()=>setFilter("not-claimed")}>
                                <p>Sin reclamar</p>
                            </div>
                        </div>
                        {
                            infoEventsUser.length>0
                            ?
                            <div className="tickets-user-container">
                                {
                                    infoEventsUser.map((event,index)=>{
                                        return(
                                            <TicketEvent key={event._id} event={event} userData={userData} ticketsBuy={ticketsBuy} index={index} claimed={ticketsBuy[index].claimed} filter={filter}/>  
                                        )
                                    })
                                }
                                
                            </div>
                            :
                            <h1>No tienes tickets en tu cuenta</h1>
                        }
                    </>
                    :
                    <h1>Inicia sesión para consultar tus boletos</h1>
                }
            </div>
        </>
    );
}

export default UserTickets;