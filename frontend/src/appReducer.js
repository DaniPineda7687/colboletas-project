const appReducer=(state,action)=>{
    const{type,payload}=action;
    switch(type){
        case "ADD_TO_FAVORITES":
            if(state.favorites.includes(payload.favorite)){
                const newFavorites = state.favorites.filter(fav=>fav!=payload.favorite)
                localStorage.setItem("userInfo",JSON.stringify(
                    {
                        ...state,
                        favorites:[...newFavorites]
                    }
                ))
                return {
                    ...state,
                    favorites:[...newFavorites],
                }
            }else{
                localStorage.setItem("userInfo",JSON.stringify(
                    {
                        ...state,
                        favorites:[...state.favorites,payload.favorite]
                    }
                ))
                return{
                    ...state,
                    favorites:[...state.favorites,payload.favorite]
                }
            }
           case "USER_LOGIN":
                localStorage.setItem("userInfo",JSON.stringify(
                    {
                        ...state,
                        userData:[...payload.userData],
                    }
                ))
                return {
                    ...state,
                    userData:[...payload.userData],
                }
                
            case "USER_LOGOUT":
                localStorage.setItem("userInfo",JSON.stringify(
                    {
                        ...state,
                        userData:[],
                    }
                ))
                return{
                    ...state,
                    userData:[]
                }
        default:
            throw new Error(`Error ${type} is not defined`)
    }
}

export default appReducer;