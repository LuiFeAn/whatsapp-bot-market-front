import { useEffect, useState } from 'react';
import * as S from './style';
import econoAPI from '../../services/econobotAPI';
import { useParams } from 'react-router-dom';
import useLoading from '../../hooks/useLoading';
import { toBrl } from '../../utils/toBrl';

export default function ShowDemand({headerTitle}){

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

                const cartItemsWithTotal = cartItemsData.map(function(item){

                    const { valor_produto, quantidade } = item;

                    const total = valor_produto * quantidade

                    return {
                        ...item,
                        total
                    }

                });

                setDemand(demandData);

                setCartItems(cartItemsWithTotal);

            }catch(err){


            }finally{

                setLoading(false);

            }

        })();

    },[]);

    useEffect( () => {

        headerTitle.setter(`Pedido N°${id}`);

    },[]);

    return (
        <S.Container>

            { !loading && !demand && (
                <h1>Pedido não existente</h1>
            )}

           { !loading && demand && (
             <div className='demand-items'>

                <h3>INFORMAÇÕES SOBRE O PEDIDO N° {demand.demand_id}</h3>

                <S.UserResume>

                    <p>Cliente: <br/> {demand.nome_completo.toUpperCase()}</p>
                    
                    <p>Número de telefone: <br/> {demand.numero_telefone}</p>

                    <p>Método de pagamento: <br/> {demand.metodo_pagamento}</p>

                    <p>Método de entrega: <br/> {demand.metodo_entrega}</p>

                    <p>Endereço: <br/> {demand.endereco}</p>

                    <p>Bairro: <br/> {demand.bairro}</p>

                    <p>Complemento: <br/> {demand.complemento ?? 'N/A'}</p>

                    <p>Observação:  <br/>{demand.observacao ?? 'N/A'}</p>

                    <p>Troco: <br/> {demand.troco ?? 'N/A'}</p>

                </S.UserResume>

                <br/> <br/> <br/> <br/>

                <table align='left' cellSpacing={40}>

                        <thead>
                          
                            <tr>
                               
                                <th>QTD</th>

                                <th>ITEM</th>

                                <th>PREÇO UNT</th>

                                <th>PREÇO TOTAL</th>

                            </tr>
                        </thead>

                        <tbody>

                            { cartItems.map( (item,id) => (
                        
                                <tr>
                                
                                    <td>{item.quantidade}X</td>
                            
                                    <td>{item.nome_produto.toUpperCase()}</td>

                                    <td>{toBrl(+item.valor_produto)}</td>

                                    <td>{toBrl(item.total)}</td>

                                </tr>

                            ))}
                           
                        </tbody>

                        <hr></hr>

                        <tfoot>

                           <tr>

                                <td>Total: <br/> {toBrl(+demand.total)}</td>

                           </tr>

                        </tfoot>

                    </table>

             </div>
           )}

        </S.Container>
    )

}