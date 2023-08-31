import * as S from './styles';

import Header from '../Header';

import GlobalStyles from '../../assets/styles/global';

import { defaultTheme } from '../../assets/themes/default';

import MainRoutes from '../../routes';

import { DemandProvider } from '../../contexts/demandContext';

import { ThemeProvider } from 'styled-components';

import { useState } from 'react';

export default function App(){

    const [ headerTitle, setHeaderTitle ] = useState('');

    return(
        <>

            <ThemeProvider theme={defaultTheme}>

                <GlobalStyles/>

                <Header title={headerTitle}/>

                <S.Container>

                    <DemandProvider>

                        <MainRoutes headerTitle={{
                            getter: headerTitle,
                            setter: setHeaderTitle
                        }}/>

                    </DemandProvider>

                </S.Container>

            </ThemeProvider>

        </>
    )

}