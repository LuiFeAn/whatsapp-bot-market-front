import styled from 'styled-components';

export default styled.button`

    width: 250px;
    height: 55px;
    background-color: ${({theme}) => theme.geralColor };
    border-radius: 10px;
    font-weight: bold;
    color:white;
    cursor: pointer;

    a{
        color:white;
        text-decoration: none;
    }

    & + & {
        margin-left: 15px;
    }

`;