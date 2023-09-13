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

       try {

            await econoAPI.patch(`/demands/${demandId}`,{
                status,
                motivo:reason
            });

            toast.success(`Pedido ${status.toLowerCase()} com sucesso !`);

       }catch(err){

            toast.error(`Não foi possível ${status} o pedido no momento.`)

       }finally{

            await demandOptions.getDemands();

       }


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

        if( value === 'RECEBIDOS' ){

           return handleDemand('RECEBIDO','Pedidos que foram recebidos');

        }

        if( value === 'ACEITOS' ){

            return handleDemand('SEPARAÇÃO','Pedidos aceitos que já se encontram em fase de separação');

        }

        if( value === 'A PRONTA ENTREGA' ){

            return handleDemand('ENTREGA','Pedidos em rota de entrega ou recebíveis no estabelecimento');

        }

        if( value === 'FINALIZADOS' ){

            return handleDemand('FINALIZADO','Pedidos finalizados');

        }

        if( value === 'REJEITADOS' ){

            return handleDemand('REJEITADO','Pedidos rejeitados');

        }



    }

    async function downloadProof(client){

        const response = await econoAPI.get(`/proofs/${client.comprovante}`,{
            responseType:'arraybuffer'
        });

        const { data } = response;

        const imageData = new Blob([data]);

        const url = window.URL.createObjectURL(imageData);

        const link = document.createElement('a');

        link.href = url;

        link.setAttribute('download',`${client.comprovante}`);

        document.body.appendChild(link);

        link.click();

        window.URL.revokeObjectURL(url);

    }

    return (
        <S.DeliveryContainer>

            <div className='filters'>


                <span>Pedidos</span>

                <select onChange={handleSelectInput}>

                    <option>RECEBIDOS</option>

                    <option>ACEITOS</option>

                    <option>A PRONTA ENTREGA</option>

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
                            <div id={demand.id} className='delivery-item'>

                                <p><strong>Pedido N° {demand.demand_id}</strong></p>

                                <p><strong>CLIENTE: {demand.nome_completo.toUpperCase()}</strong></p>

                                <p><strong>MÉTODO DE PAGAMENTO: {demand.metodo_pagamento}</strong></p>

                                <div className='demand-buttons'>

                                    <Link target='_blank' to={demand.demand_id.toString()}>

                                    <ButtonSt>

                                        VISUALIZAR
                                        
                                    </ButtonSt>

                                    </Link>

                                    { demandOptions.demandType === 'RECEBIDO' && (
                                        <>

                                            { demand.metodo_pagamento === 'PIX' && (

                                                <ButtonSt onClick={ () => downloadProof( demand) }  variant="contained">COMPROVANTE</ButtonSt>

                                            )}

                                            <ButtonSt onClick={ () => changeDemandStatus(demand.demand_id,'APROVADO') }  variant="contained">ACEITAR</ButtonSt>

                                            <ButtonSt onClick={ () => setDemandRecuse(true) } variant="contained">RECUSAR</ButtonSt>

                                        </>
                                    )}

                                    { demandOptions.demandType === 'SEPARAÇÃO' && (
                                        <>
                                        

                                        <ButtonSt onClick={ () => changeDemandStatus(demand.demand_id,demand.metodo_entrega)}>{demand.metodo_entrega === 'ENTREGAR EM CASA' ? 'JÁ SAIU PARA ENTREGA' : 'JÁ PODE SER BUSCADO NO ESTABELECIMENTO'}</ButtonSt>



                                        </>
                                    )}

                                    { demandOptions.demandType === 'ENTREGA' && (
                                        <>

                                            <ButtonSt onClick={ () => changeDemandStatus(demand.demand_id,'FINALIZADO') } variant="contained">
                                                { demand.metodo_entrega === 'ENTREGAR EM CASA' ? 'FINALIZADO ( ENTREGUE EM DOMICÍLIO )' : 'FINALIZADO ( ENTREGUE NO ESTABELECIMENTO )' }
                                            </ButtonSt>

                                        </>
                                    )}

                                    
                                </div>


                            </div>
                        </>
                    ))}

                    <br></br> <br></br>

                     <Stack spacing={2}>

                        <Pagination onChange={handlePage} count={100} variant="outlined" shape="rounded" />

                     </Stack>


                </div>

            </div>


        </S.DeliveryContainer>
    )

}