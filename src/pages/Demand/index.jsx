import * as S from './style';
import BounceLoader from "react-spinners/BounceLoader";
import { Button } from '@mui/material';
import emptyIcon from '../../assets/images/empty.png';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { demandContext } from '../../contexts/demandContext';

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

export default function Demand(){

    const demandOptions = useContext(demandContext);

    return (
        <S.DeliveryContainer>


            <BounceLoader
                color={'blue'}
                loading={demandOptions.loading}
                cssOverride={override}
                size={120}
                aria-label="Loading Spinner"
                data-testid="loader"
            />

            { !demandOptions.loading && (
                <div className='filters'>

                    <div className='delivery-options'>
                
                        <Button onClick={ () => demandOptions.handleDemandType('RECEBIDO') } variant="contained">Feitos</Button>

                        <Button onClick={ () => demandOptions.handleDemandType('CONFIRMADO') } variant="contained">Confirmados</Button>

                        <Button onClick={ () => demandOptions.handleDemandType('REJEITADO') } variant="contained">Rejeitados</Button>

                        <Button onClick={ () => demandOptions.handleDemandType('FINALIZADO') } variant="contained">Finalizados</Button>

                     </div>

                     <br/>

                     <div className='date-input'>

                        <label>
                        
                                <input value={demandOptions.demandDate} onChange={demandOptions.handleDemandDate} type='date'></input>


                        </label>

                     </div>



                </div>
            )}

            <div className='demand-handler-container'>

                <div className='demands'>

                    <p id='demand-text'>PEDIDOS {demandOptions.demandType}S</p>

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

                                <Link target='_blank' to={demand.carrinho_id.toString()}>Visualizar</Link>


                            </div>
                        </>
                    ))}

                </div>

            </div>

        </S.DeliveryContainer>
    )

}