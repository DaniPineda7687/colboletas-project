import { useContext } from "react";
import { AppContext } from "../AppContext";
import "./AddFavoriteButton.css";
const AddFavoriteButton = ({event}) =>{
    const{state,dispatch}=useContext(AppContext);
    const{favorites}=state;
    const handlerAddFavorite=()=>{
        dispatch({type:"ADD_TO_FAVORITES",payload:{favorite:`${event._id}`}})
    }
    return (
        <div className='header-card-favorites' onClick={handlerAddFavorite}>
            <i className={`bi ${favorites.includes(event._id) ? "bi-heart-fill" : "bi-heart"}`}></i>
        </div>
    );
}

export default AddFavoriteButton;