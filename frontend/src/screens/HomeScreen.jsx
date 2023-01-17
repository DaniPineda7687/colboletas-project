import { useContext } from "react";
import { AppContext } from "../AppContext";
import CategoriesEvent from "../components/CategoriesEvent";
import NavBar from "../components/NavBar";
import NearbyEvents from "../components/NearbyEvents";
import PopularEvents from "../components/PopularEvents";
import SearchEvent from "../components/SearchEvent";
import UserInfo from "../components/UserInfo";

const HomeScreen=()=>{

    const{state,dispatch}=useContext(AppContext);
    return(
        <div>
            <NavBar/>
            <div className="main-container">
                <UserInfo/>
                <SearchEvent/>
                <CategoriesEvent/>
                <PopularEvents/>
                <NearbyEvents/>
            </div>
        </div>
    );
}

export default HomeScreen;