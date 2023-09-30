import { useCallback, useEffect, useState } from 'react';
import * as S from './style';
import econoAPI from '../../services/econobotAPI';
import { toast } from 'react-toastify';
import useLoading from '../../hooks/useLoading';
import ResourceCrudIcons from '../../components/ResourceCrudIcons';
import Modal from '../../components/Modal';
import { Input } from '../../components/Input';

export default function BookletPage({headerTitle}){

    const [ booklets, setBooklets ] = useState([]);

    const { loading, setLoading } = useLoading();

    const [ messageInputModal, setMessageInputModal ] = useState(false);

    const [ booklet, setBooklet ] = useState({});

    const [ message, setMessage ] = useState('');

    async function handleInputFile(event){

        setMessageInputModal(true);

        setBooklet(event.target.files[0]);

    }

    async function sendBooket(event){

        event.preventDefault();

        if( message.length === 0 ){

            toast.error('Informe uma mensagem');

            return

        }

        await sendBooklet(booklet,message);

        await getBooklets();

    }

    const handleMessage = event => setMessage(event.target.value);

    async function getBooklets(){

        setLoading(true);

        const response = await econoAPI.get('/booklets');

        setLoading(false);

        setBooklets(response.data);

    }

    async function sendBooklet(booklet,message){

        const form = new FormData();

        form.append('encarte',booklet);

        form.append('mensagem',message);

        setMessageInputModal(false);

        await toast.promise(econoAPI.post('/booklets',form,{
            timeout:0
        }),{
            success:'Encarte enviado',
            pending:'Enviando encarte...',
            error:'Não foi possível enviar o encarte'
        });

    }

    useEffect( () => {

        getBooklets();

    },[]);

    const handleDeleteBooklet = useCallback( async (currentItem) => {

        try{
            
            await econoAPI.delete(`/booklets/${currentItem.id}`);

            toast.success('Encarte removido com sucesso');

            await getBooklets();


        }catch(err){

            toast.error('Não foi possível remover o encarte')

        }


    },[]);

    useEffect( () => {

        headerTitle.setter('Encartes');

    },[]);

    return (
        <S.Container>

            <Modal visible={messageInputModal} title='Adicione uma mensagem ao encarte' description='A mensagem adicionada ao encarte será enviada ao cliente'>

                <form onSubmit={sendBooket}>

                    <Input onChange={handleMessage} placeholder='Mensagem'></Input>

                    <button type='submit'>Adicionar</button>

                </form>

            </Modal>

            <div className='insert-booklet'>

                <input onChange={handleInputFile} type="file" id="fileInput" class="hidden"/>

           </div>

           { loading && (
            <p>Carregando...</p>
           )}

           { !loading && booklets.length > 0 && (

                <div className='booklet-area'>

                { booklets.map( booklet => (
                    
                    <div className='booklet-items'>

                        <img src={booklet.encarte}/>

                        <ResourceCrudIcons currentItem={booklet} onDelete={handleDeleteBooklet} forEdit={false}/>
                        

                    </div>
                ))}

            </div>
           )}

        </S.Container>
    )

}