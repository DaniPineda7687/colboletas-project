import { useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css"
const NavBar=({value})=>{

    const [itemMenu, setItemMenu]= useState(value?value:"home");
    return(
        <header className="header-container">
            <nav className="navbar-container">
                <ul className="nav-list-container">
                    <li onClick={()=>setItemMenu("home")}><Link to="/"><i className={`bi ${itemMenu==="home" ? "bi-house-fill" : "bi-house"}`}></i></Link></li>
                    <li onClick={()=>setItemMenu("favorites")}><Link to="/favorites"><i className={`bi ${itemMenu==="favorites" ? "bi-heart-fill" : "bi-heart"}`}></i></Link></li>
                    <li onClick={()=>setItemMenu("tickets")}><Link to="/tickets"><i className={`bi ${itemMenu==="tickets" ? "bi-ticket-fill" : "bi-ticket"}`}></i></Link></li>
                    <li onClick={()=>setItemMenu("settings")}><Link to="#"><i className={`bi ${itemMenu==="settings" ? "bi-gear-fill" : "bi-gear"}`}></i></Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default NavBar;