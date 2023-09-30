import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';

import Demand from './pages/Demand';

import ShowDemand from './pages/ShowDemand';

import Clients from './pages/Clients';

import BookletPage from './pages/Booklets';

import Bot from './pages/Bot';

export default function MainRoutes({headerTitle}){

    return (
        <Routes>

            <Route path='/' element={<Home headerTitle={headerTitle}/>}/>

            <Route path='/pedidos' element={<Demand headerTitle={headerTitle}/>}/>

            <Route path='/pedidos/:id' element={<ShowDemand headerTitle={headerTitle}/>}/>

            <Route path='/encartes' element={<BookletPage headerTitle={headerTitle}/>}/>

            <Route path='/clientes' element={<Clients headerTitle={headerTitle}/>}/>

            <Route path='/bot' element={<Bot headerTitle={headerTitle}/>}/>

        </Routes>
    )

}