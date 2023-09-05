import * as S from './style';
import { createPortal } from "react-dom";

export default function Modal({
    visible,
    children,
    buttonConfirmColor,
    buttonCancelColor,
    title,
    description,
    modalWidth = '100%',
    titleColor = 'red',
    confirmTitle = 'Sim',
    confirmHandler,
    cancelHandler,
    CancelTitle = 'Não'
}) {

    if( visible ){

        return createPortal(
            <S.Container style={{ width: modalWidth }}>
    
                <div className='modal'>
    
                    <h3 style={{color:titleColor}}>{title}</h3>

                    <p><strong>{description}</strong></p>

                    { children }

                    <div className='buttons'>

                        <button type='button' style={{ background: buttonConfirmColor}} onClick={confirmHandler}>{confirmTitle}</button>

                        <button style={ { background: buttonCancelColor }} onClick={cancelHandler}>{CancelTitle}</button>

                    </div>
    
                </div>
    
            </S.Container>,
            document.getElementById('modal')
        );

    }

    return null

}