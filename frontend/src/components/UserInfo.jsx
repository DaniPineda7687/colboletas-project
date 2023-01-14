import { useEffect } from 'react';
import { useContext } from 'react';
import { AppContext } from '../AppContext';
import './UserInfo.css'

const UserInfo=()=>{
    const{state,dispatch}=useContext(AppContext);

    /**
     * Se supone que el usuario ya paso por la pantalla de login
     * Simulacion de un usuario que inicia sesion
     * El dispatch deberia ejecutarse en el momento en el que el usuario se loguea de manera correcta en la pantalla de login
     * En este caso se ejecutara en este sitio 
     */
    //UserInfo seria la respuesta del servidor al iniciar sesion
    const userInfo=[
        {
            _id:"1223234235",
            name:"Daniel Pineda",
            image:"https://static.fundacion-affinity.org/cdn/farfuture/PVbbIC-0M9y4fPbbCsdvAD8bcjjtbFc0NSP3lRwlWcE/mtime:1643275542/sites/default/files/los-10-sonidos-principales-del-perro.jpg",
            email:"danielspineda87@gmail.com",
            password:"123456",
            birthday:new Date(2002,10,25),
    
        }
    ]
    console.log(userInfo);
    useEffect(()=>{
        dispatch({type:"USER_LOGIN", payload:{userData:userInfo}})
    },[])
    
    return(
        <div className="">
            {
                state.userData.length>0
                ?
                <div className='user-info-container'>
                    <div className="username">
                        <p className="section-title">Bienvenido</p>
                        <p className="subtitle">{state.userData[0].name}</p>
                    </div>
                    <div className="image-profile-container">
                        <figure className='image-profile'>
                            <img src={state.userData[0].image} alt="Foto de perfil" />
                        </figure>
                    </div>
                </div>
                :
                <div>
                    <div className="username">
                        <p className="section-title">Bienvenido</p>
                        <p className="subtitle">Iniciar sesión</p>
                        <p className="subtitle">Registrarse</p>
                    </div>
                </div>
            }
        </div>
    );
}
export default UserInfo;