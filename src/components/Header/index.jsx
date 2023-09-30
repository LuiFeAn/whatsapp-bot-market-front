import * as S from './styles';
import logo from '../../assets/images/logo.png';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useContext } from 'react';
import { BotStatusContext } from '../../contexts/BotStatusContext';

export default function Header({title}) {

    const { loadingBotStatus, botStatus } = useContext(BotStatusContext);

    const Nav = useNavigate();
    
    return (
        <S.HeaderContainer botStatusColor={ botStatus ? 'green' : 'red'}>

            <div className='logo-title'>

                <img width={150} height={150} src={logo}/>

                { !loadingBotStatus && (
                    <p>{ botStatus ? 'CONECTADO' : 'DESCONECTADO'}</p>
                )}

            </div>

            <div className='page-option'>

                <h2>{title}</h2>

                <Button onClick={ () => Nav(-1) }>Voltar</Button>

            </div>

        </S.HeaderContainer>
    )

}

