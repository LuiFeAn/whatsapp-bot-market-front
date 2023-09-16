
import styled from 'styled-components';

export const Container = styled.div`

    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
    gap:20px;

    img {
        width: 300px;
        height: 300px;
    }

    .insert-booklet {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap:20px;
    }

    .booklet-area{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        gap:30px;

        .booklet-items{
            display: flex;
            align-content: center;
            justify-content: center;
            flex-direction: column;
        }
    }

`;

export const BookletButton = styled.button`

    width: 80px;
    height: 80px;
    border: 1px solid black;
    text-align: center;
    border-radius: 10%;
    font-size:20px;
    cursor: pointer;

`;