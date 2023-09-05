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

    .modal{

        background-color: white;
        border-radius: 10px;
        padding:40px;
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        word-wrap: break-word;

        .buttons{

            padding:40px;
            display: flex;
            align-items: center;
            justify-content: center;
            color:white;
            font-weight: bold;
            gap:20px;

            button {
                width: 150px;
                height: 50px;
                border-radius: 10px;
                border: none;
                cursor: pointer;
            }

        }

    }

`;