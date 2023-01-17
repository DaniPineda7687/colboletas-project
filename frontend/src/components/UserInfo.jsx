import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../AppContext';
import './UserInfo.css'

const UserInfo=()=>{
    const{state,dispatch}=useContext(AppContext);
    const navigate = useNavigate();
    const handleLogout=()=>{
        dispatch({type:"USER_LOGOUT"})
    }
    console.log(state);
    return(
        <div className="">
            {
                state.userData.length>0
                ?
                <div className='user-info-container'>
                    <div className="main-info-user">
                        <p className="section-title">Bienvenido</p>
                        <p className="subtitle">{state.userData[0].username}</p>
                        <p className='subtitle' onClick={handleLogout}>Cerrar sesión</p>
                    </div>
                    <div className="image-profile-container">
                        <figure className='image-profile'>
                            <img src={state.userData[0].image} alt="Foto de perfil" />
                        </figure>
                    </div>
                </div>
                :
                <div>
                    <div className="main-info-user">
                        <p className="section-title">Bienvenido</p>
                        <p className="subtitle" onClick={()=>navigate("/login")}>Iniciar sesión</p>
                        <p className="subtitle" onClick={()=>navigate("/register")}>Registrarse</p>
                    </div>
                </div>
            }
        </div>
    );
}
export default UserInfo;