import * as S from './styles';
import logo from '../../assets/images/logo.png';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

export default function Header({title, botStatus}) {

    const Nav = useNavigate();
    
    return (
        <S.HeaderContainer>

            { botStatus ? <p>Conectado</p> : <p>Desconectado</p> }

            <div className='logo-title'>

                <img width={150} height={150} src={logo}/>

            </div>

            <div className='page-option'>

                <h2>{title}</h2>

                <Button onClick={ () => Nav(-1) }>Voltar</Button>

            </div>

        </S.HeaderContainer>
    )

}

