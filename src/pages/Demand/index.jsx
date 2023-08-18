import * as S from './style';
import { Button } from '@mui/material';
import emptyIcon from '../../assets/images/empty.png';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { demandContext } from '../../contexts/demandContext';
import econoAPI from '../../services/econobotAPI';
import { toast } from 'react-toastify';
import { useState } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useEffect } from 'react';
import ButtonSt from '../../components/Button';

export default function Demand({headerTitle}){

    const demandOptions = useContext(demandContext);

    const [ reason, setReason ] = useState('');

    const [ demandRecuse, setDemandRecuse ] = useState(false);

    const [ currentDemandTitle, setCurrentDemandTitle ] = useState('Pedidos recebidos');

    async function changeDemandStatus(demandId,status){

        const promise = econoAPI.patch(`/demands/${demandId}`,{
            status,
            motivo:reason
        });

        await toast.promise(promise,{
            success:`Pedido ${status} com sucesso !`,
            error:`Não foi possível ${status} este pedido`,
            pending:`${status} pedido...`
        });

        await demandOptions.getDemands();

    }

    function handlePage(event,value){

        demandOptions.setCurrentPage(value);

    }

    useEffect( () => {

        headerTitle.setter('Pedidos');

    },[]);

    function handleDemand(status,demandTitle){

        demandOptions.handleDemandType(status);

        setCurrentDemandTitle(demandTitle);

    }

    return (
        <S.DeliveryContainer>

            <div className='filters'>

                <div className='delivery-options'>
            
                    <Button onClick={ () => handleDemand('RECEBIDO','Pedidos recebidos') } variant="contained">Feitos</Button>

                    <Button onClick={ () => handleDemand('SEPARAÇÃO','Pedidos separados') } variant="contained">Separados</Button>

                    <Button onClick={ () => handleDemand('ENTREGA','Pedidos em rota de entrega') } variant="contained">Em rota de entrega</Button>

                    <Button onClick={ () => handleDemand('FINALIZADO','Pedidos finalizados') } variant="contained">Finalizados</Button>

                    <Button onClick={ () => handleDemand('REJEITADO','Pedidos rejeitados') } variant="contained">Rejeitados</Button>

                    </div>

                    <br/>

                    <div className='date-input'>

                    <label>
                    
                            <input value={demandOptions.demandDate} onChange={demandOptions.handleDemandDate} type='date'></input>


                    </label>

                </div>



            </div>

            <div className='demand-handler-container'>

                <div className='demands'>

                    <p id='demand-text'>{currentDemandTitle.toUpperCase()}</p>

                    { !demandOptions.loading && demandOptions.demands.length === 0 && (

                        <div className='demand-empty'>

                            <img width={200} height={200} src={emptyIcon}/>

                        </div>

                    )}

                    { demandOptions.demands.map( demand => (
                        <>
                            <div className='delivery-item'>

                                <p><strong>Pedido N° {demand.demand_id}</strong></p>

                                <p><strong>CLIENTE: {demand.nome_completo.toUpperCase()}</strong></p>

                                <p><strong>MÉTODO DE PAGAMENTO: {demand.metodo_pagamento}</strong></p>

                               <ButtonSt>

                                <Link target='_blank' to={demand.carrinho_id.toString()}>Visualizar</Link>

                               </ButtonSt>

                                { demandOptions.demandType === 'RECEBIDO' && (
                                    <>
                                        <ButtonSt onClick={ () => changeDemandStatus(demand.demand_id,'aprovado') }  variant="contained">Aceitar</ButtonSt>

                                        <ButtonSt onClick={ () => setDemandRecuse(true) } variant="contained">Recusar</ButtonSt>

                                    </>
                                )}

                                { demandOptions.demandType === 'SEPARAÇÃO' && (
                                    <>
                                        <ButtonSt onClick={ () => changeDemandStatus(demand.demand_id,'Saiu para entrega') }  variant="contained">Saiu pra entrega</ButtonSt>

                                    </>
                                )}

                                { demandOptions.demandType === 'ENTREGA' && (
                                    <>

                                        <ButtonSt onClick={ () => changeDemandStatus(demand.demand_id,'finalizado') } variant="contained">Finalizar</ButtonSt>

                                    </>
                                )}


                            </div>
                        </>
                    ))}

                     <Stack spacing={2}>

                        <Pagination onChange={handlePage} count={100} variant="outlined" shape="rounded" />

                     </Stack>


                </div>

            </div>


        </S.DeliveryContainer>
    )

}