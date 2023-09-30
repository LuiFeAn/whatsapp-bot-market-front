import * as S from './styles';

import Header from '../Header';

import GlobalStyles from '../../assets/styles/global';

import { defaultTheme } from '../../assets/themes/default';

import MainRoutes from '../../routes';

import { ThemeProvider } from 'styled-components';

import { toast } from 'react-toastify';

import { useState, useEffect } from 'react';

import { socket } from '../../services/socketIO';

import { useContext } from 'react';

import { BotStatusContext } from '../../contexts/BotStatusContext';

export default function App(){

    const { setBotStatus } = useContext(BotStatusContext);

    const [ headerTitle, setHeaderTitle ] = useState('');

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

                <Header title={headerTitle}/>

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