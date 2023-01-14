import { useContext } from "react";
import { AppContext } from "../AppContext";
import {Link} from "react-router-dom"
import AddFavoriteButton from "./AddFavoriteButton";

const EventCard=({event})=>{
    const months = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
    const{state,dispatch}=useContext(AppContext);
    const{favorites}=state;
    /*const handlerAddFavorite=()=>{
        dispatch({type:"ADD_TO_FAVORITES",payload:{favorite:`${event._id}`}})
    }
*/
    return(
        <>
            <Link to={`/event/${event._id}`}>
                <div className="event-card">
                    <img src={event.image} alt="..." />                 
                    <div className='header-card'>
                        <div className='header-card-people'>
                            <p>{event.participants} participantes</p>
                        </div>
                        <AddFavoriteButton event={event}/>
                    </div>

                    <div className="body-card">
                        <div className='body-card-header'>
                            <p>{event.name}</p>
                        </div>
                        <div className='body-card-footer'>
                            <p className='card-footer--organizer'>{event.organizer}</p>
                            <p className='card-footer--date'>{`${months[new Date(event.date).getMonth()-1]} ${new Date(event.date).getDay()} ${new Date(event.date).getFullYear()}`}</p>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    );
}

export default EventCard;