import styled from "styled-components";


export const Container = styled.div`

    display: flex;
    align-items: center;
    justify-content: center;
    gap:30px;
    width: 100%;
    padding-bottom: 100px;
    flex-wrap: wrap;

    @media(max-width:760px){

        padding: 0px;
        flex-direction: column;
        justify-content: center;

    }

`;