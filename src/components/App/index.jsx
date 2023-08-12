import * as S from './styles';

import Header from '../Header';
import GlobalStyles from '../../assets/styles/global';

import MainRoutes from '../../routes';
import { DemandProvider } from '../../contexts/demandContext';

export default function App(){

    return(
        <>

            <GlobalStyles/>

            <Header/>

            <S.Container>

                 <DemandProvider>

                    <MainRoutes/>

                 </DemandProvider>

            </S.Container>

        </>
    )

}