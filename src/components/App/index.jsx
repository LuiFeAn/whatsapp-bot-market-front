import * as S from './styles';

import Header from '../Header';

import GlobalStyles from '../../assets/styles/global';

import { defaultTheme } from '../../assets/themes/default';

import MainRoutes from '../../routes';

import { ThemeProvider } from 'styled-components';

import { io } from 'socket.io-client';

import { useState, useEffect } from 'react';

export default function App(){

    const [ headerTitle, setHeaderTitle ] = useState('');

    useEffect(() => {

        const socket = io('ws://localhost:3001');

        socket.on('new-demand',function(){

            toast.success(`Você recebeu um novo pedido`,{
                autoClose:15000
            });

        });

        return () => socket.close();

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