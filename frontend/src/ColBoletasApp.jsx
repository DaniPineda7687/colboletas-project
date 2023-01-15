import CategoriesScreen from './screens/CategoriesScreen'
import PopularScreen from './screens/PopularScreen'
import SearchScreen from './screens/SearchScreen'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import FavoritesScreen from './screens/FavoritesScreen'
import EventDetails from './screens/EventDetails'
import UserTickets from './screens/UserTickets'
import CodeQRReader from './screens/CodeQRReader'
const ColBoletasApp=()=>{
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<HomeScreen/>} />
                <Route path='/categories/:categoryId' element={<CategoriesScreen/>}/>
                <Route path='/popular' element={<PopularScreen/>} />
                <Route path='/search/:searchInput' element={<SearchScreen/>} />
                <Route path='/favorites' element={<FavoritesScreen/>}/>
                <Route path='/event/:idEvent' element={<EventDetails/>}/>

                <Route path='/tickets' element={<UserTickets/>}/>
                <Route path='/admin/scanner' element={<CodeQRReader/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default ColBoletasApp;