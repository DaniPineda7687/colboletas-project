import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import NavBar from "../components/NavBar";
import { axiosInstance } from "../utils/axiosInstance";
import { calcularEdad } from "../utils/helpers";

const RegisterScreen=()=>{
    const[name,setName]= useState("");
    const[lastName,setLastName]= useState("");
    const[username,setUsername]= useState("");
    const[email,setEmail]= useState("");
    const[birthday,setBirthday]= useState("");
    const[password,setPassword]= useState("");
    const[passwordNew,setPasswordNew]= useState("");
    const navigate = useNavigate();
    const handleUserRegister=async(e)=>{
        e.preventDefault();
        
        if(password!=passwordNew){
            //Contraseñas no coinciden
            toast("Las contraseñas no coinciden",{
                type:"error",
                autoClose:3000,
            })
        }else if(password.length<8){
            //Contraseña debe tener minimo 8 caracteres
            toast("La contraseña debe tener mínimo 8 caracteres",{
                type:"error",
                autoClose:3000,
            })
        }else if(calcularEdad(birthday)<14){
            //No cuenta con la edad suficiente para crear una cuenta
            toast("Debe tener al menos 14 años para crear la cuenta",{
                type:"error",
                autoClose:3000,
            })
        }else{
            try{
                console.log({name,lastName,username,email,birthday,password,passwordNew})
                const{data} = await axiosInstance.post("users/register",{
                    name,
                    lastName,
                    username,
                    email,
                    birthday,
                    password,
                })
                toast("Registro exitoso!",{
                    type:"success",
                    autoClose:2000,
                })
                navigate("/login")

            }catch(err){
                //Mostrar el error del back
                toast(err.response.data,{
                    type:"error",
                    autoClose:3000,
                })
            }

        }
    }
    return(
        <>
            <NavBar/>
            <div className="main-container">
                <h1 className="section-title">Registrate</h1>
                <p className="title-secondary subtitle-login">Crea una cuenta y podrás comprar boletos para tu evento favorito</p>
                <form className="login-form" onSubmit={handleUserRegister}> 
                    <label htmlFor="name">Nombres
                        <input type="text" name="name" id="name" onChange={(e)=>setName(e.target.value)}/>
                    </label>
                    <label htmlFor="lastName">Apellidos
                        <input type="text" name="lastName" id="lastName" onChange={(e)=>setLastName(e.target.value)}/>
                    </label>
                    <label htmlFor="username">Username
                        <input type="text" name="username" id="username" onChange={(e)=>setUsername(e.target.value)}/>
                    </label>
                    <label htmlFor="email">Email
                        <input type="email" name="email" id="email" onChange={(e)=>setEmail(e.target.value)}/>
                    </label>
                    <label htmlFor="birthday">Fecha de nacimiento
                        <input type="date" name="birthday" id="birthday" onChange={(e)=>setBirthday(e.target.value)}/>
                    </label>
                    <label htmlFor="password" className="password-container">Contraseña
                        <input type="password" name="password" id="password" onChange={(e)=>setPassword(e.target.value)} />
                        <i className="bi bi-eye" ></i>
                    </label>
                    <label htmlFor="password" className="password-container">Repite la contraseña
                        <input type="password" name="password" id="password" onChange={(e)=>setPasswordNew(e.target.value)} />
                    </label>
                    <button>Registrarse</button>
                </form>
                <p className="auxiliar-text">¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link></p>
            </div>
        </>
    );

}

export default RegisterScreen;