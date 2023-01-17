import { useContext } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../AppContext";
import NavBar from "../components/NavBar";
import { axiosInstance } from "../utils/axiosInstance";
import {toast} from "react-toastify"
import "./LoginScreen.css";
import { useEffect } from "react";
const LoginScreen=()=>{
    const[userEmail, setUserEmail]=useState("");
    const[userPassword, setUserPassword]=useState("");
    const[userData, setUserData]=useState([]);
    const{state, dispatch}=useContext(AppContext);
    const[isVisible, setIsVisible]=useState(false);
    const navigate = useNavigate();
    const onSubmitForm=(e)=>{
        e.preventDefault();
        getUserLogged();
    }
    const getUserLogged=async()=>{
        try{
            const {data} = await axiosInstance.get("users/login",{
                params:{
                    email:userEmail,
                    password:userPassword,
                }
            })
            console.log(data)
            setUserData(data);
            dispatch({type:"USER_LOGIN",payload:{userData:data}});
            if(!data[0].isAdmin){
                navigate("/")
            }else{
                navigate("/admin/scanner")
            }

        }catch(err){
            toast(err.response.data,{
                type:"error",
                autoClose:3000,
            })
        }
    }
    useEffect(()=>{
        if(state.userData.length>0){
            navigate("/")
        }
    },[state])
    return(
        <>
            <NavBar/>
            <div className="main-container">
                <h1 className="section-title">Iniciar sesión</h1>
                <p className="title-secondary subtitle-login">Inicia sesion con tu cuenta y compra las boletas para tu evento favorito</p>
                <form className="login-form" onSubmit={onSubmitForm}> 
                    <label htmlFor="email">Email
                        <input type="email" name="email" id="email" onChange={(e)=>setUserEmail(e.target.value)} />
                    </label>
                    <label htmlFor="password" className="password-container">Contraseña
                        <input type={isVisible?"text":"password"} name="password" id="password" onChange={(e)=>setUserPassword(e.target.value)} />
                        <i className={isVisible?"bi bi-eye-slash":"bi bi-eye"} onClick={()=>setIsVisible(!isVisible)}></i>
                    </label>
                    <button>Iniciar sesión</button>
                </form>
                <p className="auxiliar-text">¿No tienes una cuenta? <Link to="/register">Registrate</Link></p>
            </div>
        </>
    );
}

export default LoginScreen;