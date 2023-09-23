
import { createContext, useEffect, useState, useCallback, useMemo } from "react";
import { io } from 'socket.io-client';
import { toast } from 'react-toastify';
import useLoading from "../hooks/useLoading";
import econoAPI from "../services/econobotAPI";

export const demandContext = createContext({});

export function DemandProvider({ children }){

    const date = useMemo( () => new Date(),[]);

    const getCurrentDay = useCallback(function(){

        const addZeroToDate = date => date < 10 ? `0${date}` : date;

        return `${date.getFullYear()}-${addZeroToDate(date.getMonth() + 1)}-${addZeroToDate(date.getDate())}`;

    }, []);

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

    useEffect(() => {

        const socket = io('ws://localhost:3001');

        socket.on('new-demand',function(){

            toast.success(`Você recebeu um novo pedido`,{
                autoClose:15000
            });

            getDemands();

        });

        return () => socket.close();

    },[]);

    return (
        <demandContext.Provider value={ {
            demands,
            loading,
            demandDate,
            demandType,
            setDemands,
            getDemands,
            setCurrentPage,
            handleClientSearch,
            handleDemandDate,
            handleDemandType
        } }>
            { children }
        </demandContext.Provider>
    )

}