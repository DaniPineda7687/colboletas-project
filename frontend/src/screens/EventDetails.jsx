import { useEffect,useContext,useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../AppContext";
import AddFavoriteButton from "../components/AddFavoriteButton";
import NavBar from "../components/NavBar";
import PreviousButton from "../components/PreviousButton";
import { axiosInstance } from "../utils/axiosInstance";
import "./EventDetail.css"
const EventDetails=()=>{
    const months = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
    const {idEvent}=useParams();
    const [eventUser, setEventUser]=useState(undefined);
    const[viewMap, setViewMap]=useState(false);
    const[coordsUser,setCoordsUser]=useState([]);
    const{state,dispatch}=useContext(AppContext);
    const navigate = useNavigate();


    const postPayment =async(userId,eventId,paymentRef,paymentId)=>{
        const data = await axiosInstance.post("payments/register",{
                userId,
                eventId,
                paymentRef,
                paymentId
        })
    }

    const getEventById = async() =>{
        const {data} = await axiosInstance.get(`events/searchid?id=${idEvent}`)
        
        setEventUser(data);
        const imageContainer = document.querySelector(".image-event-container");
        imageContainer.style.cssText=`background-image: url(${data.image}); background-repeat: no-repeat; background-size: contain; background-attachment: fixed;`
    }

    const handleViewMapHowArrive=()=>{
        if (!"geolocation" in navigator) {
            return alert("Tu navegador no soporta el acceso a la ubicación. Intenta con otro");
        }
        const onUbicacionConcedida = ubicacion => {
            const {coords}=ubicacion;
            const {latitude,longitude}=coords;
            setCoordsUser([latitude,longitude])
        }
        const onErrorDeUbicacion = err => {
            console.log("Error obteniendo ubicación: ", err);
        }
        const opcionesDeSolicitud = {
            enableHighAccuracy: true, // Alta precisión
            maximumAge: 0, // No queremos caché
            timeout: 5000 // Esperar solo 5 segundos
        };
        navigator.geolocation.getCurrentPosition(onUbicacionConcedida, onErrorDeUbicacion, opcionesDeSolicitud);
        setViewMap(true);
    }
    const handleViewMapNormal=()=>{
        setViewMap(false);
    }
    const handlerPayTicket=()=>{
        if(state.userData.length>0){
            const timePayment = new Date().getTime();
            const checkout = new WidgetCheckout({
                currency: 'COP',
                amountInCents: eventUser.ticketPrice*100,
                reference: `${eventUser._id}${timePayment}`,
                publicKey: 'pub_test_4TTfBWI9mfxQeBIwun5ly2ObT5SWWe9v',
                })
              checkout.open(function ( result ) {
                var transaction = result.transaction
                if(transaction.status==="APPROVED"){
                    //GUARDAR LO ANTERIOR EN UN ESQUEMA DE LA BD DE COMPRAS
                    postPayment(state.userData[0]._id,eventUser._id,transaction.reference,transaction.id);
                    navigate("/tickets");
                }else{
                    //MENSAJE DE ERROR - REINTENTAR PAGO
                    toast("Error en la transacción, por favor intentelo nuevamente",{
                        type:toast.TYPE.ERROR,
                        autoClose:4000,
                    });
                }
              })
        }else{
            //Error debe iniciar sesion
            navigate("/login")
            toast("Debe iniciar sesion para continuar con la compra",{
                type:"error",
                position:"bottom-center",
                closeButton:true,
                autoClose:6000,
                hideProgressBar:false,
                toastId:"ticket_claimed",
            })   
        }

    }
    useEffect(()=>{
        getEventById();
    },[idEvent])

    return(
        <>
            <NavBar/>
            {
                eventUser
                ?
                <div className="event-detail-main-container">
                    <div className="image-event-container">
                        <PreviousButton/>
                        <AddFavoriteButton event={eventUser}/>
                    </div>
                    <div className="details-event-container">
                        <div className="general-info">
                                <p className="title-event">{eventUser.name}</p>
                            <div className="other-info-event">
                                <p className="organizer-event"><i className="bi bi-person"></i> Organizado por: {eventUser.organizer}</p>
                                <p><i className="bi bi-geo-alt"></i> {eventUser.place} - {eventUser.city} </p>
                                <p><i className="bi bi-clock"></i>{` ${new Date(eventUser.date).getDay()} de ${months[new Date(eventUser.date).getMonth()-1]}`} - {eventUser.hour}</p>
                                <p className="organizer-event"><i className="bi bi-people"></i> Edad mínima: {eventUser.minimAge} años</p>
                            </div>
                        </div>
                        <div className="other-actions-event">
                            <div className="direction-event-actions">
                                <div className="action-button view-location-button" onClick={handleViewMapNormal}>
                                    <p><i className="bi bi-geo-alt"></i>Ver ubicación</p>
                                </div>
                                <div className="action-button how-arrive-button" onClick={handleViewMapHowArrive}>
                                    <p><i className="bi bi-compass"></i>¿Cómo llegar?</p>
                                </div>
                            </div>
                            <div className="action-button buy-button" onClick={handlerPayTicket}>
                                    <p><i className="bi bi-ticket-detailed"></i>Comprar ticket</p>
                                    
                            </div>
                        </div>
                    </div>
                        <div className="map-event-site">
                            {
                                !viewMap
                                ?
                                <iframe width="600" height="450" loading="lazy" allowFullScreen
                                    src={`https://www.google.com/maps/embed/v1/place?q=place_id:${eventUser?.placeId}&key=AIzaSyBDfOBQP3Y2SS5GNJPz4JkgayCEl7r50Os`}>
                                </iframe>
                                :
                                <iframe width="600" height="450" loading="lazy" allowFullScreen
                                    src={`https://www.google.com/maps/embed/v1/directions?origin=place_id:${eventUser?.placeId}&destination=${coordsUser[0]},${coordsUser[1]}&key=AIzaSyBDfOBQP3Y2SS5GNJPz4JkgayCEl7r50Os`}>
                                </iframe>
                            }
                        </div>
                </div>
                :
                ""
            }
        </>
    );
}

export default EventDetails;