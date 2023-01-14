import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './SearchEvent.css';
const SearchEvent=({searchInput})=>{
    const[searchValue, setSearhValue]=useState(searchInput?searchInput:"");
    const navigate = useNavigate();
    const handleInputChange=(e)=>{
        setSearhValue(e.target.value);
    }
    const handleSubmitForm=(e)=>{
        e.preventDefault();
        navigate(`/search/${searchValue}`);

    }
    return(
        <div className="search-bar-container">
            <form action="" onSubmit={handleSubmitForm}>
                <div className="input-search-container">
                    <input type="text" className="input-search" value={searchValue} name="user-search" id="" placeholder="Fiestas, obras teatrales, conciertos..." onChange={handleInputChange}/>
                    <i className="bi bi-search icon-search"></i>
                </div>
            </form>
        </div>
    );
}
export default SearchEvent;