
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

    const [ userSearch, setUserSearch ] = useState('');

    const { loading, setLoading } = useLoading();

    function handleDemandType(type){

        setDemandType(type);

    }

    function handleDemandDate(event){

        setDemandDate(event.target.value);

    }

    async function getDemands(){

        try{

            const response = await econoAPI.get(`/pedidos?tipo=${demandType}&data=${demandDate}&pagina=${currentPage}&quantidade=${paginationLimit}&usuario_id=${userSearch}`);

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

    },[demandType,demandDate,currentPage,paginationLimit,userSearch]);

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
            handleDemandDate,
            handleDemandType
        } }>
            { children }
        </demandContext.Provider>
    )

}