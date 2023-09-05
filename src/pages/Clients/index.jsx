import { useEffect } from 'react';
import * as S from './style';
import econoAPI from '../../services/econobotAPI';
import { useState } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import usePaginationProps from '../../hooks/usePaginationProps';
import deleteIcon from '../../assets/images/delete-icon.png';
import updateIcon from '../../assets/images/update-icon.png';
import messageIcon from '../../assets/images/message-icon.png';
import useLoading from '../../hooks/useLoading';
import Modal from '../../components/Modal';
import { toast } from 'react-toastify';
import phoneMask from '../../utils/phoneNumberMask';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../components/Input';
import Button from '../../components/Button';
import ReactInputMask from 'react-input-mask';

export default function Clients(){

    const { search, page, quanty } = usePaginationProps();

    const Nav = useNavigate();

    const { setLoading, loading } = useLoading();

    const [ users, setUsers ] = useState([]);

    const [ getContacts, setGetContacts ] = useState(false);

    const [ withPromotion, setWithPromotion ] = useState(false);

    const [ currentUser, setCurrentUser ] = useState(false);

    const [ sendMessage, setSendMessage ] = useState(false);

    const [ deleteUser, setDeleteUser ] = useState(false);

    const [ message, setMessage ] = useState('');

    const [ registerNewUser, setRegisterNewUser ] = useState(false);

    async function getUsers(){

        try{

            setLoading(true);

            const response = await econoAPI.get(`/users?search=${search.getter}&page=${page.getter}&quanty=${quanty.getter}&contacts=${getContacts}&withPromotion=${withPromotion}`);

            const { data } = response

            setUsers(data);

       }catch(err){


       }finally{

            setLoading(false);

       }

    }

    useEffect( () => {

        getUsers();

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

    function cancelDelete(){
        setDeleteUser(false)
    }

    function cancelSendMessage(){
        setSendMessage(false);
    }

    async function confirmSendMessage(){

        try{
            await econoAPI.post('/messages',{
                toUser: currentUser.id,
                message,
            });

            toast.success('Mensagem enviada com sucesso');
            
        }catch(err){

            toast.error('Não foi possível enviar esta mensagem')

        }finally{

            setSendMessage(false);

        }

    }

    async function confirmDelete(){

        try{
            await econoAPI.delete(`/users/${currentUser.id}`);
            setCurrentUser(false);
            await getUsers();            
            toast.success(`${currentUser.nome_completo.toUpperCase()} removido com sucesso da lista de clientes`);
        }catch(err){
            toast.error(`Não foi possível remover ${currentUser.nome_completo.toUpperCase()} da lista de clientes`)
        }

    }

    function handleMessage(event){

        setMessage(event.target.value);

    }

    function cancelRegister(){
        setRegisterNewUser(false);
    }

    function newRegister(){
        setRegisterNewUser(true);
    }

    return(
        <>

        <Modal 
            visible={deleteUser} 
            confirmHandler={confirmDelete}
            cancelHandler={cancelDelete}
            title={`Tem certeza que deseja remover "${currentUser.nome_completo?.toUpperCase()}" da lista de clientes ?`}
            description={'Todo o histórico de compras deste usuário será removido permanentemente.'}
        />

         <Modal 
            visible={sendMessage} 
            confirmHandler={confirmSendMessage}
            cancelHandler={cancelSendMessage}
            title={`Enviando mensagem a ${currentUser.nome_completo}`}
            CancelTitle='Cancelar'
            confirmTitle='Enviar'
        >
            <input onChange={handleMessage} placeholder='Mensagem'></input>
        </Modal>

        <S.Container>

            <Button style={ { height:'30px'}} onClick={newRegister}>CADASTRAR NOVO CLIENTE</Button>

            <Modal visible={registerNewUser} titleColor={'blue'} cancelHandler={cancelRegister} confirmTitle='Cadastrar' CancelTitle='Cancelar' title={'CADASTRAR NOVO USUÁRIO'}>

                <S.NewRegisterContainer>

                    <ReactInputMask mask='(99) 99999-9999' placeholder='N° Whatsapp'></ReactInputMask>

                    <ReactInputMask placeholder='N° Telefone para Contato'></ReactInputMask>

                    <Input placeholder='Nome Completo'></Input>

                    <Input placeholder='Endereço'></Input>

                    <Input placeholder='Bairro'></Input>

                    <Input placeholder='N° Casa'></Input>

                    <Input placeholder='Complemento'></Input>;

                </S.NewRegisterContainer>

            </Modal>

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

                            { users.length > 0 && users.map( user => (
                                <tr className='user'>

                                    <tr className='infos'>

                                        <p>{user.nome_completo?.toUpperCase()}</p>

                                        <p>{phoneMask(user.id)}</p>

                                    </tr>

                                    <tr className='icons'>

                                        <img onClick={ () => {
                                            setCurrentUser(user);
                                            setSendMessage(true)
                                        } } src={messageIcon}/>

                                        <img onClick={ () => {
                                            setCurrentUser(user)
                                            setDeleteUser(true)
                                        } } src={deleteIcon}/>

                                        <img onClick={ () => Nav(`${user.id}`)} src={updateIcon}/> 

                                    </tr>

                                </tr>
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
