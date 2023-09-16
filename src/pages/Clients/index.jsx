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
import Button from '../../components/Button';
import ClientForm from './Form';

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

    const [ registerNewUserModal, setRegisterNewUserModal ] = useState(false);

    const [ forEdit, setForEdit ] = useState(false);

    const [ forInsert, setForInsert ] = useState(false);

    const [ clearFields, setClearFields ] = useState(false);

    const [ sendBookletList, setSendBookletList ] = useState([]);

    const [ currentUserFilterSelect, setCurrentUserFilterSelect ] = useState('Clientes');

    useEffect( () => {

        if( registerNewUserModal ){

           setForInsert(true);

        }

    },[registerNewUserModal]);

    async function getUsers(){

        try{

            setLoading(true);

            const response = await econoAPI.get(`/users?search=${search.getter}&page=${page.getter}&quanty=${quanty.getter}&contacts=${getContacts}&withPromotion=${withPromotion}&getAll=false`);

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

        setCurrentUserFilterSelect(value);

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
            await econoAPI.delete(`/users/${currentUser.usuario_id}`);
            setCurrentUser(false);
            setDeleteUser(false)
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
        setRegisterNewUserModal(false);
        setClearFields(true);
    }

    function newRegister(){
        setRegisterNewUserModal(true);
        setClearFields(false);
    }

    function handleUpdateUser(){
        setClearFields(false);
        setForEdit(true);
    }

    function handleCancelUpdateUser(){
        setForEdit(false);
        setClearFields(true);
    }

    async function handleSelectAll(){

        const users = await econoAPI.get(`/users?getAll=true&contacts=${getContacts}&withPromotion=${withPromotion}`);

        const dontExists = users.data.filter( (
            user => !sendBookletList.includes(user.usuario_id)
        ) ).map( (
            user => user.usuario_id
        ) );

        setSendBookletList( prev => [ ...prev, ...dontExists ] );
    }


    async function handleSendBookletButton(){

        const promise = econoAPI.post('/send-booklets',{
            toUsers: sendBookletList
        });

        await toast.promise(promise,{
            success:{
                render(){

                    setSendBookletList([]);

                    return 'Encartes enviados com sucesso'

                }
            },
            error:'Não foi possível enviar os encartes',
            pending:'Enviando encartes...'
        });

    }

    function handleAddClientSendBooklet(client){

        if( !sendBookletList.some( list => list === client.usuario_id )){

            setSendBookletList( prev => [ ...prev, client.usuario_id, ] );

        }else{

            setSendBookletList( prev => prev.filter( list => list != client.usuario_id) );

        }        

    }

    async function handleClientInfos(infos){

        const { whatsapp, fullName, ...rest } = infos;

        try {

            const otherInfosValues = Object.values(rest)
            .some( value => value );

            const method = !forEdit ? 'post' : 'patch'

            const methodURI = method === 'post' ? '' : currentUser.usuario_id;

            await econoAPI[method](`/users/${methodURI}`,{
                whatsappId: whatsapp,
                fullName
            });

            if( method === 'post' ){

                rest.whatsappId = whatsapp;

            }

            if( otherInfosValues ){

                await econoAPI[method](`users/infos/${methodURI}`,{
                    ...rest,
                });
    
            }

            toast.success(`Cliente ${ !forEdit ? 'cadastrado' : 'atualizado com'} com sucesso !`);
    
            if( !forEdit ){
    
                setRegisterNewUserModal(false);
    
            }

            if( forEdit ){

                setForEdit(false);

            }

            await getUsers();
    
            setClearFields(true);
    
        }catch(err){

            err.response.data.errors.forEach( error => toast.error(error));

        }


    }


    return(
        <>

        <Modal 
            visible={deleteUser} 
            confirmHandler={confirmDelete}
            cancelHandler={cancelDelete}
            title={`Tem certeza que deseja remover "${currentUser.nome_completo?.toUpperCase()}" da lista de clientes ?`}
            description={'Todo o histórico de compras deste usuário será removido permanentemente.'}
        >
            <button onClick={confirmDelete}>Remover</button>
            <button onClick={cancelDelete}>Cancelar</button>
        </Modal>

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

            <Button style={ { height:'40px',border:'none'}} onClick={newRegister}>CADASTRAR NOVO CLIENTE</Button>

            <ClientForm 
                onCancelSubmit={cancelRegister}
                clearFields={clearFields} 
                onSubmit={handleClientInfos} 
                visible={registerNewUserModal}
                title='CADASTRAR NOVO USUÁRIO' 
                forEdit={false}/>

            <ClientForm 
                onCancelSubmit={handleCancelUpdateUser} 
                onSubmit={handleClientInfos}
                clearFields={clearFields}
                title={`ATUALIZAR INFORMAÇÕES DE "${currentUser.nome_completo?.toUpperCase()}"`} 
                visible={forEdit} 
                forEdit={true}/>

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

                                    <tr onClick={ () => handleAddClientSendBooklet(user) } className={`infos ${
                                        sendBookletList.includes(user.usuario_id) ? 'selected' : ''
                                    }`}>

                                        <p>{user.nome_completo?.toUpperCase()}</p>

                                        <p>{phoneMask(user.usuario_id)}</p>

                                    </tr>

                                    <tr className='icons'>

                                        {/* <img onClick={ () => {
                                            setCurrentUser(user);
                                            setSendMessage(true)
                                        } } src={messageIcon}/> */}

                                        <img onClick={ () => {
                                            setCurrentUser(user)
                                            setDeleteUser(true)
                                        } } src={deleteIcon}/>

                                        <img onClick={ () => {
                                            setCurrentUser(user);
                                            handleUpdateUser()
                                        }} src={updateIcon}/> 

                                    </tr>

                                </tr>
                            ))}

                        </>
                    )}


                </tr>


            </table>

             <div className='batch-options'>

                    <Button style={ { height:'40px',border:'none'}} onClick={handleSelectAll}>SELECIONAR TODOS OS {currentUserFilterSelect.toUpperCase()}</Button>

                    { sendBookletList.length > 0 && (
                        <>
                            <p><strong>{sendBookletList.length} usuário(s) selecionado(s)</strong></p>

                            <Button style={ { height:'40px',border:'none'}} onClick={handleSendBookletButton}>ENVIAR ENCARTES</Button>

                            <Button style={ { height:'40px',border:'none'}} onClick={newRegister}>DELETAR TODOS OS SELECIONADOS</Button>
                            
                        </>
                    )}

            </div>

            <br/><br/>

            <Stack spacing={2}>

                <Pagination onChange={page.handler} count={100} variant="outlined" shape="rounded" />

            </Stack>

        </S.Container>

        </>
    )

}
