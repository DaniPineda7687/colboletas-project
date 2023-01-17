import {createContext, useReducer} from "react"
import appReducer from "./AppReducer";


export const AppContext = createContext();

export const AppProvider=({children})=>{
    let initialState={
        favorites:[],
        userData:[],    
    }
    if(localStorage.getItem("userInfo")){
        initialState=JSON.parse(localStorage.getItem("userInfo"))
    }
    const[state,dispatch]=useReducer(appReducer,initialState);
    const value = {
        state,
        dispatch
    }
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}