import { useEffect, useState } from 'react';
import * as S from './style';
import econoAPI from '../../services/econobotAPI';
import { useParams } from 'react-router-dom';
import useLoading from '../../hooks/useLoading';

export default function ShowDemand(){

    const { id } = useParams();

    const [ demand, setDemand ] = useState(false);

    const [ cartItems, setCartItems ] = useState([]);

    const { loading , setLoading } = useLoading();

    useEffect( () => {

        ( async () => {

            try{

                const demandResponse = await econoAPI.get(`/demands/${id}`);

                const { data: demandData } = demandResponse;

                const cartItemsResponse = await econoAPI.get(`/cart-items/${demandData.carrinho_id}`);

                const { data: cartItemsData } = cartItemsResponse;

                setDemand(demandData);

                setCartItems(cartItemsData);

            }catch(err){


            }finally{

                setLoading(false);

            }

        })();

    },[]);

    return (
        <S.Container>

            { !loading && !demand && (
                <h1>Pedido não existente</h1>
            )}

           { !loading && demand && (
             <div className='demand-items'>

                <h3>INFORMAÇÕES SOBRE O PEDIDO N° {demand.demand_id}</h3>

                <p>Cliente: {demand.nome_completo.toUpperCase()}</p>

                <p>Número de telefone: {demand.numero_telefone}</p>

                <p>Método de pagamento: {demand.metodo_pagamento}</p>

                <p>Método de entrega: {demand.metodo_entrega}</p>

                <p>Endereço: {demand.endereco}</p>

                <p>Bairro: {demand.bairro}</p>

                <p>Complemento: {demand.complemento ?? 'N/A'}</p>

                <p>Total: {demand.total}</p>

                <p>Observação: {demand.observacao ?? 'N/A'}</p>

                <p>Troco: {demand.troco ?? 'N/A'}</p>

                <div className='items'>

                    { cartItems.map( (item,id) => (
                        
                        <div>

                            <p>Produto: {item.nome_produto} Quantidade: {item.quantidade}</p>

                        </div>

                    ))}

                </div>

             </div>
           )}

        </S.Container>
    )

}