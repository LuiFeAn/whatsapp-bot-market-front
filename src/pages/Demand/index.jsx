import * as S from './style';
import emptyIcon from '../../assets/images/empty.png';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import econoAPI from '../../services/econobotAPI';
import { toast } from 'react-toastify';
import { useState, useMemo, useCallback } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useEffect } from 'react';
import ButtonSt from '../../components/Button';
import { BeatLoader } from 'react-spinners';
import { Input} from '../../components/Input';
import useLoading from '../../hooks/useLoading';
import { io } from 'socket.io-client';

export default function Demand({headerTitle}){

    const date = useMemo( () => new Date(),[]);

    const getCurrentDay = useCallback(function(){

        const addZeroToDate = date => date < 10 ? `0${date}` : date;

        return `${date.getFullYear()}-${addZeroToDate(date.getMonth() + 1)}-${addZeroToDate(date.getDate())}`;

    }, []);

    const [ currentDemandTitle, setCurrentDemandTitle ] = useState('Pedidos recebidos');

    const [ demands, setDemands ] = useState([]);

    const [ demandType, setDemandType ] = useState('RECEBIDO');

    const [ demandDate, setDemandDate ] = useState(getCurrentDay());

    const [ currentPage, setCurrentPage ] = useState(1);

    const [ paginationLimit, setPaginationLimit ] = useState(20);

    const [ clientSearch,setClientSearch ] = useState('');

    const { loading, setLoading } = useLoading();

    function handleDemandType(type){

        setDemandType(type);

    }

    function handleClientSearch(event){
        window.scrollTo({
            top:0,
            behavior:'smooth'
        })
        setClientSearch(event.target.value);
    }

    function handleDemandDate(event){

        setDemandDate(event.target.value);

    }

    async function getDemands(){

        try{

            setLoading(true);

            const response = await econoAPI.get(`/demands?type=${demandType}&date=${demandDate}&page=${currentPage}&quanty=${paginationLimit}&user_search=${clientSearch}`);

            const { data } = response;

            setDemands(data);

        }catch(err){

            console.log(err);

        }finally{

            setLoading(false);

        }

    }


    useEffect( () => {

        getDemands();

    },[demandType,demandDate,currentPage,paginationLimit,clientSearch]);

    // useEffect(() => {

    //     const socket = io('ws://localhost:3001');

    //     socket.on('new-demand',async function(){

    //         await getDemands();

    //     });

    // },[]);


    async function changeDemandStatus(demandId,status){

       try {

            await econoAPI.patch(`/demands/${demandId}`,{
                status,
            });

            await getDemands();

            toast.success(`Pedido gerenciado com sucesso !`);

       }catch(err){

            toast.error(`Não foi possível gerenciar o pedido.`)

       }


    }

    function handlePage(event,value){

       setCurrentPage(value);

    }

    useEffect( () => {

        headerTitle.setter('Pedidos');

    },[]);

    function handleDemand(status,demandTitle){

       handleDemandType(status);

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

        if( value === 'RECUSADOS' ){

            return handleDemand('RECUSADO','Pedidos RECUSADOS');

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

    useEffect( () => {

        return () =>handleDemandType('RECEBIDO')

    },[]);

    return (
        <S.DeliveryContainer>

            <div className='filters'>

                <div className='filter-items'>

                    <span>Pesquisa</span>

                    <Input onChange={handleClientSearch} placeholder='Pesquise pelo cliente'></Input>

                </div>

                <div className='filter-items'>

                    <span>Pedidos</span>

                    <select onChange={handleSelectInput}>

                        <option>RECEBIDOS</option>

                        <option>ACEITOS</option>

                        <option>A PRONTA ENTREGA</option>

                        <option>FINALIZADOS</option>

                        <option>RECUSADOS</option>

                    </select>

                </div>

                <div className='filter-items'>

                    <span>Data</span>

                    <input value={demandDate} onChange={handleDemandDate} type='date'></input>

                </div>

            </div>

            <div className='demand-handler-container'>

                <div className='demands'>

                    <p id='demand-text'>{currentDemandTitle.toUpperCase()}</p>

                    { !loading &&demands.length === 0 && (

                        <div className='demand-empty'>

                            <img width={200} height={200} src={emptyIcon}/>

                        </div>

                    )}

                    <br></br><br />

                    {loading && (
                       <BeatLoader size={20} color='blue'/>
                    )}

                    { !loading &&demands.map( demand => (
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

                                    {demandType === 'RECEBIDO' && (
                                        <>

                                            { demand.metodo_pagamento === 'PIX' && (

                                                <ButtonSt onClick={ () => downloadProof( demand) }  variant="contained">COMPROVANTE</ButtonSt>

                                            )}

                                            <ButtonSt onClick={ () => changeDemandStatus(demand.demand_id,'APROVADO') }  variant="contained">ACEITAR</ButtonSt>

                                            <ButtonSt onClick={ () => changeDemandStatus(demand.demand_id,'RECUSADO') } variant="contained">RECUSAR</ButtonSt>

                                        </>
                                    )}

                                    {demandType === 'SEPARAÇÃO' && (
                                        <>
                                        

                                        <ButtonSt onClick={ () => changeDemandStatus(demand.demand_id,demand.metodo_entrega)}>{demand.metodo_entrega === 'ENTREGAR EM CASA' ? 'JÁ SAIU PARA ENTREGA' : 'JÁ PODE SER BUSCADO NO ESTABELECIMENTO'}</ButtonSt>



                                        </>
                                    )}

                                    {demandType === 'ENTREGA' && (
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