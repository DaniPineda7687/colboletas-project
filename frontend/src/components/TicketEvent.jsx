import QRCode from "react-qr-code";
import { Link } from "react-router-dom";
import "./TicketEvent.css";
const TicketEvent = ({event,userData,ticketsBuy,index,claimed,filter}) => {
  //<TicketEvent event, userData, ticke,index, true,not-claimed
  const months = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
  const isTicketRender=()=>{
    if(filter==="all"){
      return "ticket-main-container"
    }else if(filter==="not-claimed" && claimed=== true){
      return "ticket-none-display"
    }else if(filter==="not-claimed" && claimed===false){
      return "ticket-main-container"
    }else if(filter==="claimed" && claimed=== true){
      return "ticket-main-container"
    }else if(filter==="claimed" && claimed===false){
      return "ticket-none-display"
    }
  }
  return (
    <>
    {//ticket-main-container
    }
      <div className={isTicketRender()}>
        <div className={`ticket-header-container ${claimed ? "ticket-claimed" : "ticket-not-claimed"}`}>
          <div className="header-image">
          <Link to={`/event/${event._id}`}>
            <img src={event.image} alt="" />
          </Link>
          </div>
          <div className="header-info">
            <p className="info-title">{event.name}</p>
            <p className="info-organizer">Organizado por: {event.organizer}</p>
          </div>
        </div>
        <div className={`ticket-body-container ${claimed ? "ticket-claimed" : "ticket-not-claimed"}`}>
          <div className="body-container">
            <div className="location-info">
              <p className="body-title">Ubicación</p>
              <p className="body-subtitle">
                {event.place} - {event.city}
              </p>
            </div>
            <div className="user-info">
              <p className="body-title">Nombre</p>
              <p className="body-subtitle">{userData[0].name}</p>
            </div>
            <div className="date-info">
              <p className="body-title">Fecha</p>
              <p className="body-subtitle">{`${
                months[new Date(event.date).getMonth() - 1]
              } ${new Date(event.date).getDay()} ${new Date(
                event.date
              ).getFullYear()}`}</p>
            </div>
            <div className="hour-info">
              <p className="body-title">Hora</p>
              <p className="body-subtitle">{event.hour}</p>
            </div>
            <div className="dress-info">
              <p className="body-title">Edad</p>
              <p className="body-subtitle">{event.minimAge} años</p>
            </div>
            <div className="price-info">
              <p className="body-title">Precio</p>
              <p className="body-subtitle">{event.ticketPrice} pesos</p>
            </div>
          </div>
        </div>
        {
          !claimed 
          ?
          <div className={`ticket-footer-container ${claimed ? "ticket-claimed" : "ticket-not-claimed"}`}>
            <QRCode
              value={`${ticketsBuy[index].paymentRef}`}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            />
            <p>{`${ticketsBuy[index].paymentRef}`}</p>
          </div>
          :
          ""
        }
      </div>
    </>
  );
};

export default TicketEvent;
