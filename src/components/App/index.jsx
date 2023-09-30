import * as S from './styles';

import Header from '../Header';

import GlobalStyles from '../../assets/styles/global';

import { defaultTheme } from '../../assets/themes/default';

import MainRoutes from '../../routes';

import { ThemeProvider } from 'styled-components';

import { toast } from 'react-toastify';

import { useState, useEffect } from 'react';

import { socket } from '../../services/socketIO';

export default function App(){

    const [ headerTitle, setHeaderTitle ] = useState('');

    const [ botStatus, setBotStatus ] = useState(false);

    useEffect(() => {

        socket.on('new-demand', () => toast.success(`Você recebeu um novo pedido`,{
            autoClose:15000
        }));

        socket.on('bot-already', () => setBotStatus(true) );

    },[]);

    return(
        <>

            <ThemeProvider theme={defaultTheme}>

                <GlobalStyles/>

                <Header botStatus={botStatus} title={headerTitle}/>

                <S.Container>

                <MainRoutes headerTitle={{
                            getter: headerTitle,
                            setter: setHeaderTitle
                        }}/>

                </S.Container>

            </ThemeProvider>

        </>
    )

}