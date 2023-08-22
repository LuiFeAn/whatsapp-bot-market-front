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
            error:{
                render({data:{response:{data}}}){

                    let errors = '';

                    data.forEach(function(error){

                        errors += '\n' + error.msg;

                    });

                    return errors

                }
            },
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

    function handleSelectInput(event){

        const { target:{ value } } = event;

        if( value === 'FEITOS' ){

           return handleDemand('RECEBIDO','Pedidos recebidos');

        }

        if( value === 'SEPARADOS' ){

            return handleDemand('SEPARAÇÃO','Pedidos separados');

        }

        if( value === 'EM ROTA DE ENTREGA' ){

            return handleDemand('ENTREGA','Pedidos em rota de entrega');

        }

        if( value === 'RECEBÍVEIS' ){

            return handleDemand('RECEBÍVEL','Pedidos recebíveis no estabelecimento');

        }

        if( value === 'FINALIZADOS' ){

            return handleDemand('FINALIZADO','Pedidos finalizados');

        }

        if( value === 'REJEITADOS' ){

            return handleDemand('REJEITADO','Pedidos rejeitados');

        }



    }

    return (
        <S.DeliveryContainer>

            <div className='filters'>


                <span>Pedidos</span>

                <select onChange={handleSelectInput}>

                    <option>FEITOS</option>

                    <option>SEPARADOS</option>

                    <option>EM ROTA DE ENTREGA</option>

                    <option>RECEBÍVEIS</option>

                    <option>FINALIZADOS</option>

                    <option>REJEITADOS</option>

                </select>

                <span>Data</span>

                <input value={demandOptions.demandDate} onChange={demandOptions.handleDemandDate} type='date'></input>

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

                                    <Link target='_blank' to={demand.carrinho_id.toString()}>VISUALIZAR</Link>

                               </ButtonSt>

                                { demandOptions.demandType === 'RECEBIDO' && (
                                    <>
                                        <ButtonSt onClick={ () => changeDemandStatus(demand.demand_id,'aprovado') }  variant="contained">ACEITAR</ButtonSt>

                                        <ButtonSt onClick={ () => setDemandRecuse(true) } variant="contained">RECUSAR</ButtonSt>

                                    </>
                                )}

                                { demandOptions.demandType === 'SEPARAÇÃO' && (
                                    <>
                                       
                                       { demand.metodo_entrega === 'ENTREGAR EM CASA' && (


                                            <ButtonSt onClick={ () => changeDemandStatus(demand.demand_id,'Saiu para entrega') }  variant="contained">JÁ SAIU PARA ENTREGA</ButtonSt>

                                       )}

                                        { demand.metodo_entrega === 'BUSCAR NA LOJA' && (


                                            <ButtonSt onClick={ () => changeDemandStatus(demand.demand_id,'Recebível') }  variant="contained">JÁ PODE SER BUSCADO NO ESTABELECIMENTO</ButtonSt>

                                       )}



                                    </>
                                )}

                                { demandOptions.demandType === 'ENTREGA' || demandOptions.demandType === 'RECEBÍVEIS' && (
                                    <>

                                        <ButtonSt onClick={ () => changeDemandStatus(demand.demand_id,'finalizado') } variant="contained">FINALIZADO</ButtonSt>

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