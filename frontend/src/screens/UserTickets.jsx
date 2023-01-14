import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../AppContext";
import NavBar from "../components/NavBar";
import { axiosInstance } from "../utils/axiosInstance";
import QRCode from "react-qr-code";
import "./UserTicket.css";
const UserTickets=()=>{
    const months = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
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
                                        <div className="ticket-main-container">
                                            <div className="ticket-header-container">
                                                <div className="header-image">
                                                    <img src={event.image} alt="" />
                                                </div>
                                                <div className="header-info">
                                                    <p className="info-title">{event.name}</p>
                                                    <p className="info-organizer">Organizado por: {event.organizer}</p>
                                                </div>
                                            </div>
                                            <div className="ticket-body-container">
                                                <div className="body-container">
                                                    <div className="location-info">
                                                        <p className="body-title">Ubicación</p>
                                                        <p className="body-subtitle">{event.place} - {event.city}</p>
                                                    </div>
                                                    <div className="user-info">
                                                        <p className="body-title">Nombre</p>
                                                        <p className="body-subtitle">{userData[0].name}</p>
                                                    </div>
                                                    <div className="date-info">
                                                        <p className="body-title">Fecha</p>
                                                        <p className="body-subtitle">{`${months[new Date(event.date).getMonth()-1]} ${new Date(event.date).getDay()} ${new Date(event.date).getFullYear()}`}</p>
                                                    </div>
                                                    <div className="hour-info">
                                                        <p className="body-title">Hora</p>
                                                        <p className="body-subtitle">{event.hour}</p>
                                                    </div>
                                                    <div className="dress-info">
                                                        <p className="body-title">Edad</p>
                                                        <p className="body-subtitle">{event.minimAge} años</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="ticket-footer-container">
                                                <QRCode
                                                    value={`${ticketsBuy[index].paymentId}`}
                                                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                                />
                                                <p>{`${ticketsBuy[index].paymentId}`}</p>
                                            </div>
                                        </div>
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