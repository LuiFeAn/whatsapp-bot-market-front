import { useEffect, useState } from 'react';
import * as S from './style';
import econoAPI from '../../services/econobotAPI';
import { toast } from 'react-toastify';
import useLoading from '../../hooks/useLoading';

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

        console.log(booklet);

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

    return (
        <S.Container>

           <div className='insert-booklet'>

                <input onChange={handleInputFile} type="file" id="fileInput" class="hidden"/>

           </div>

           { !loading && booklets.length > 0 && booklets.map( booklet => (
                <img src={booklet.encarte}/>
            ))}

        </S.Container>
    )

}