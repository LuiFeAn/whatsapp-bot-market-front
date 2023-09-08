import * as S from './style';
import { createPortal } from "react-dom";

export default function Modal({
    visible,
    children,
    clear = false,
    title,
    description,
    modalWidth = '100%',
    titleColor = 'red',
}) {

    if( visible ){

        return createPortal(
            <S.Container style={{ width: modalWidth }}>
    
                <div className='modal'>
    
                    <h3 style={{color:titleColor}}>{title}</h3>

                    <p><strong>{description}</strong></p>

                    <div className='buttons'>

                        { children }

                    </div>
    
                </div>
    
            </S.Container>,
            document.getElementById('modal')
        );

    }

    return null

}