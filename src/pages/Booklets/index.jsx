import { useEffect, useState } from 'react';
import * as S from './style';
import econoAPI from '../../services/econobotAPI';


export default function BookletPage(){

    const [ booklet, setBooklet ] = useState({});

    const [ booklets, setBooklets ] = useState([]);

    function handleInputFile(event){
        setBooklet(event.target.files[0]);
    }

    async function getBooklets(){

        const response = await econoAPI.get('/booklets');

        setBooklets(response.data);

    }

    async function sendBooklet(){

        const form = new FormData();

        form.append('encarte',booklet);

        await econoAPI.post('/booklets',form);

    }

    useEffect( () => {

        getBooklets();

        sendBooklet();

    },[booklet]);

    return (
        <S.Container>

           <div className='insert-booklet'>

                <span>CLIQUE PARA ADICIONAR UM ENCARTE</span>

                <S.BookletButton>
                    +
                    <input onChange={handleInputFile} type="file" id="fileInput" class="hidden"/>
                </S.BookletButton>

           </div>

        </S.Container>
    )

}