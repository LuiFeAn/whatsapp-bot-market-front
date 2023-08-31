import { useEffect } from 'react';
import * as S from './style';
import econoAPI from '../../services/econobotAPI';
import { useState } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import usePaginationProps from '../../hooks/usePaginationProps';
import deleteIcon from '../../assets/images/delete-icon.png';
import updateIcon from '../../assets/images/update-icon.png';
import useLoading from '../../hooks/useLoading';

export default function Clients(){

    const { search, page, quanty } = usePaginationProps();

    const { setLoading, loading } = useLoading();

    const [ users, setUsers ] = useState([]);

    const [ getContacts, setGetContacts ] = useState(false);

    const [ withPromotion, setWithPromotion ] = useState(false);

    useEffect( () => {

        ( async () => {

           try{

                setLoading(true);

                const response = await econoAPI.get(`/users?search=${search.getter}&page=${page.getter}&quanty=${quanty.getter}&contacts=${getContacts}&withPromotion=${withPromotion}`);

                const { data } = response

                setUsers(data);

           }catch(err){


           }finally{

                setLoading(false);

           }


        })();

    },[search.getter,page.getter,quanty.getter,getContacts,withPromotion]);

    function handleSelect(event){

        const { target: { value } } = event;

        if( value === 'Clientes' ){

            setGetContacts(false);

            setWithPromotion(false);

        }

        if( value === 'Contatos' ){

            setGetContacts(true);

            setWithPromotion(false);

        }

        if( value === 'Clientes com fidelidade' ){

            setWithPromotion(true);

            setGetContacts(false);

        }

    }

    return(
        <>

        <S.Container>

            <div className='search-area'>

                <label>

                    <p>Pesquisa</p>

                    <input onChange={search.handler} placeholder='PESQUISE POR NOME, ID'></input>

                </label>

                <label>
                    
                    <p>Filtro</p>

                    <select onChange={handleSelect}>

                    <option>Clientes</option>

                    <option>Contatos</option>

                    <option>Clientes com fidelidade</option>

                </select>

                </label>

            </div>

            <br/> 
            <br/>

            <table>

                <tr>

                    <strong>Cliente</strong>

                </tr>

                <tr>


                    { loading && (
                        <p style={{textAlign:'center'}}>Carregando...</p>
                    )}

                    { !loading && (
                        <>

                             <br></br>

                            { users.length === 0 && !search.getter && (
                                <p style={{textAlign:'center'}}>Nenhum usuário encontrado</p>
                            )}

                            { users.length === 0 && search.getter && (
                                <p style={{textAlign:'center'}}>Nenhum resultado encontrado para <strong>"{search.getter}"</strong></p>
                            )}

                            <br></br>

                            { users.map( user => (
                                <div className='user'>

                                    <p>{user.nome_completo?.toUpperCase()}</p>

                                    <div className='icons'>

                                        <img src={deleteIcon}/>

                                        <img src={updateIcon}/> 

                                    </div>

                                </div>
                            ))}

                        </>
                    )}


                </tr>


            </table>

            <br/><br/>

            <Stack spacing={2}>

                <Pagination onChange={page.handler} count={100} variant="outlined" shape="rounded" />

            </Stack>

        </S.Container>

        </>
    )

}
