import { useState } from "react";
import QrReader from "react-web-qr-reader";
import { axiosInstance } from "../utils/axiosInstance";
import "./CodeQRReader.css";
import {toast} from "react-toastify"
import { useEffect } from "react";
import { useContext } from "react";
import { AppContext } from "../AppContext";
import {useNavigate} from "react-router-dom"
import NavBarAdmin from "../components/NavBarAdmin";
const CodeQRReader=()=>{
    const delay = 500;
    const{state,dispatch}=useContext(AppContext)
    const navigate = useNavigate();
    const previewStyle = {
        height: 240,
        width: 320,
    };

    const handleErrorScan=(err)=>{
        console.log("Error al escanear ", err);
    }
    const handleSuccesScan=async(result)=>{
        //Verificar que la referencia de pago del qr exista en la bd de compras
        try{
            const {data} = await axiosInstance.get(`payments/ticket/${result.data}`);
            //Actualizar el claimed de la boleta
            if(data.length>0){
                if(data[0].claimed===false){
                    const updateState = await axiosInstance.put(`payments/claimticket/${data[0].paymentRef}`);     
                    toast("El ticket es válido",{
                        type:"success",
                        position:"bottom-center",
                        closeButton:true,
                        autoClose:6000,
                        hideProgressBar:false,
                        toastId:"ticket_claimed",
                    })
                }else{
                    toast("El ticket ya fue reclamado",{
                        type:"error",
                        position:"bottom-center",
                        closeButton:true,
                        autoClose:6000,
                        hideProgressBar:false,
                        toastId:"ticket_claimed",
                    })
                }
            }else{
                //No hay tickets con esa referencia
                toast("No hay tickets con esta referencia",{
                    type:"error",
                    position:"bottom-center",
                    closeButton:true,
                    autoClose:6000,
                    hideProgressBar:false,
                    toastId:"ticket_claimed",
                })
            }
        }catch(err){
            //ticket no valido/formato no valido
            toast("El ticket no es válido",{
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
        if(state.userData.length===0){
            navigate("/")
        }else if(state.userData[0].isAdmin===false){
            navigate("/")
        }
        
    })
    return(
        <>
        <NavBarAdmin/>
            <div className="main-container">
                <p className="section-title title-admin">Lector de tickets</p>
                <div className="qr-reader-container">
                    <QrReader
                        delay={delay}
                        style={previewStyle}
                        onError={handleErrorScan}
                        onScan={handleSuccesScan}
                    />
                </div>
            </div>
        </>
    );

}

export default CodeQRReader;