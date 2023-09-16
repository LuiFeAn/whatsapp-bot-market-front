import { useCallback, useEffect, useState } from 'react';
import * as S from './style';
import econoAPI from '../../services/econobotAPI';
import { toast } from 'react-toastify';
import useLoading from '../../hooks/useLoading';
import ResourceCrudIcons from '../../components/ResourceCrudIcons';

export default function BookletPage(){

    const [ booklets, setBooklets ] = useState([]);

    const { loading, setLoading } = useLoading();

    async function handleInputFile(event){

        await sendBooklet(event.target.files[0]);

        await getBooklets();

    }

    async function getBooklets(){

        setLoading(true);

        const response = await econoAPI.get('/booklets');

        setLoading(false);

        setBooklets(response.data);

    }

    async function sendBooklet(booklet){

        const form = new FormData();

        form.append('encarte',booklet);

        await toast.promise(econoAPI.post('/booklets',form),{
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

    return (
        <S.Container>

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