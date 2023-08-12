import * as S from './styles';
import logo from '../../assets/images/logo.png'

export default function Header() {
    
    return (
        <S.HeaderContainer>

            <div className='logo-title'>

                <img width={150} height={150} src={logo}/>

                {/* <h1>ECONOCOMPRAS</h1> */}

            </div>

        </S.HeaderContainer>
    )

}

