import styled from "styled-components";


export const HeaderContainer = styled.header`

    position:relative;
    background-color: ${({theme}) => theme.geralColor };
    display: flex;
    align-content: space-between;
    color:white;
    font-weight: bold;

    .logo-title{
        display: flex;
        align-items: center;
        justify-content: center;
        gap:20px;

        p{

            width: 50%;
            padding:20px; 
            border-radius:10px;  
            background: ${({botStatusColor}) => botStatusColor};

        }

    }

    .page-option{
        
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        gap:20px;
        right:60px;
        top:35px;

        button{
            background-color: white;
            color:black;
        }

    }

`;