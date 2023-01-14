import EventCard from "./EventCard";
import "./EventList.css";
const EventList = ({events})=>{
    return(
        <>
            <div className="events-list-container">
                {
                    events.length>0
                    ?
                    events.map(event=>{
                        return(
                            <EventCard key={event.name} event={event}/>
                        );
                    })
                    :
                    <h1>No se encontraron resultados</h1>
                }
            </div>
        </>
    );
}

export default EventList;