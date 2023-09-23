import styled from "styled-components";

export const Container = styled.div`

    width:100%;
    background:rgba(0,0,0,0.2);
    backdrop-filter: blur(5px);
    position: fixed;
    height: 100%;
    left:0px;
    display: flex;
    align-items: center;
    justify-content: center;
    top:0px;

    h3{
        background-color: #2e3092;
        padding:20px;
        border-radius: 10px;
        color:white !important;
    }

    .modal{

        width: 40%;
        background-color: white;
        border-radius: 10px;
        padding:40px;
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        word-wrap: break-word;

        @media(max-width:760px){
            width: 80%;

            input{
                width:200px;
            }

        }

        button {
                width: 150px;
                height: 50px;
                font-weight: bold;
                border-radius: 10px;
                border: none;
                cursor: pointer;
            }

    }

`;