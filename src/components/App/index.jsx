import * as S from './styles';

import Header from '../Header';

import GlobalStyles from '../../assets/styles/global';

import { defaultTheme } from '../../assets/themes/default';

import MainRoutes from '../../routes';

import { ThemeProvider } from 'styled-components';

import { io } from 'socket.io-client';

import { toast } from 'react-toastify';

import { useState, useEffect } from 'react';

export default function App(){

    const [ headerTitle, setHeaderTitle ] = useState('');

    useEffect(() => {

        const socket = io('ws://localhost:3005/api');

        socket.on('new-demand',function(){

            console.log('uaiii');

            toast.success(`Você recebeu um novo pedido`,{
                autoClose:15000
            });

        });

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