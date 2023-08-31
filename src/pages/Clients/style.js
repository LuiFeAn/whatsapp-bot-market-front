import styled from "styled-components";

export const Container = styled.div`

    width: 80%;
    background-color:#eceff5;
    border-radius: 10px;
    outline: 2px solid #dee1e7;
    padding:30px;
    padding-bottom:100px;

    .search-area{

        width: 100%;
        display: flex;
        align-items: center;
        gap:20px;
        justify-content: space-around;

        
        input, select{

            width: 350px;
            border-radius:10px;
            height: 40px;
            text-align: center;
            border:none;

        }

        @media(max-width:760px){

            flex-direction: column;

        }

    }

    .user{

        display: flex;
        gap: 20px;
        align-items:center;
        justify-content: space-between;

        .icons{
            display: flex;
            align-items: center;
            justify-content: center;
            gap:20px;
        }

        img{
            cursor: pointer;
            width: 30px;
            height: 30px;;
        }

    }

    table{
        width: 100%;
    }

`;