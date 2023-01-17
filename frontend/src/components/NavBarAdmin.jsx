import { useContext } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../AppContext";
import "./NavBar.css"
const NavBarAdmin=()=>{
    const{state,dispatch}=useContext(AppContext);
    const navigate = useNavigate();
    const handleUserLogout=()=>{
        dispatch({type:"USER_LOGOUT"});
        navigate("/");
    }
    return(
        <header className="header-container">
            <nav className="navbar-container">
                <ul className="nav-list-container">
                    <li onClick={handleUserLogout}><Link><i className="bi bi-box-arrow-left"></i></Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default NavBarAdmin;