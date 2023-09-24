import styled from "styled-components";

export const Container = styled.section`

    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding-bottom:150px;

    .demand-items{
        width: 80%;
        text-align: center;

        @media(max-width:760px){
            width: 100%;
        }
    }

    table{
        width: 100%;
        font-size:1.0em;
        border-radius: 10px;
        font-weight: bold;
        text-align: center;

        tfoot{
            width: 100%;
            text-align: center;
        }
    }

`;

export const UserResume = styled.div`

   display: grid;
   font-weight: bold;
   word-break: break-word;
   padding:50px;
   text-transform: uppercase;
   grid-template-columns: repeat(3, 1fr);
   box-shadow: 6px 10px 6px 6px  grey;
   text-align: center;
   justify-content: center;
   border-radius: 10px;

`;