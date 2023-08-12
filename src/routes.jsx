import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Demand from './pages/Demand';

export default function MainRoutes(){

    return (
        <Routes>

            <Route path='/' element={<Home/>}/>

            <Route path='/pedidos' element={<Demand/>}/>

        </Routes>
    )

}