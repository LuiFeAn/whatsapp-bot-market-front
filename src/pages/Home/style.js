import styled from "styled-components";


export const Container = styled.div`

    display: flex;
    align-items: center;
    gap:10px;
    width: 100%;
    padding-left:100px;

    @media(max-width:760px){

        padding: 0px;
        flex-direction: column;
        justify-content: center;

    }

`;