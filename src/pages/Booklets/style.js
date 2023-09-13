
import styled from 'styled-components';

export const Container = styled.div`

    display: flex;
    align-items: center;
    justify-content: center;
    gap:20px;

    .insert-booklet {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap:20px;
    }

`;

export const BookletButton = styled.button`

    width: 150px;
    height: 150px;
    border: 1px solid black;
    text-align: center;
    border-radius: 10%;
    font-size:20px;
    cursor: pointer;

    input{
        margin-top:-150px;
        opacity: 0%;
    }

`;