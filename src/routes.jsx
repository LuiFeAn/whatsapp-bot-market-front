import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Demand from './pages/Demand';

export default function MainRoutes({headerTitle}){

    return (
        <Routes>

            <Route path='/' element={<Home headerTitle={headerTitle}/>}/>

            <Route path='/pedidos' element={<Demand headerTitle={headerTitle}/>}/>

        </Routes>
    )

}