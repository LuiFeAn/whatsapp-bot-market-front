import * as S from './style';

import deleteIcon from '../../assets/images/delete-icon.png';

import updateIcon from '../../assets/images/update-icon.png';

export default function ResourceCrudIcons({currentItem, forDelete = true, forEdit = true, onDelete, onEdit }){

    return (
        <S.Container>

            { forDelete && (
                <img onClick={ () => onDelete(currentItem) } src={deleteIcon}/>
            )}
            
            { forEdit && (
                 <img onClick={ () => onEdit(currentItem) } src={updateIcon}/>
            )}

        </S.Container>
    )

}