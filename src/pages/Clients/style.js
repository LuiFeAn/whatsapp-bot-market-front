import styled from "styled-components";

export const Container = styled.div`

    width: 70%;
    background-color:#eceff5;
    border-radius: 10px;
    outline: 2px solid #dee1e7;
    padding:30px;
    padding-bottom:100px;

    .batch-options{
        display: flex;
        margin-top:30px;
        align-items: start;
        justify-content: start;
    }

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

            width: 100%;
            flex-direction: column;

            input, select{

                width: 150px;
                border-radius:10px;
                height: 40px;
                text-align: center;
                border:none;

            }

        }

    }

    .user{

        display: flex;
        gap: 20px;
        align-items:center;
        justify-content: space-between;
        margin-top: 20px;

        .infos{
            width: 100%;
            padding:5px;
            display: flex;
            align-items: center;
            word-wrap: break-word;
            gap:20px;
            cursor: pointer;
        }

        .selected{
            background-color: white;
            transition: 1s;
            border-radius: 10px;
        }

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
        tr{
             word-wrap: break-word;
        }
    }

`;

export const NewRegisterContainer = styled.form`


    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap:30px;

    input {
        border:2px solid black;
        font-weight: 16px;
        border-radius: 10px;
    }

    .but{
        display: flex;
        align-items: center;
        justify-content: center;
        gap:20px;
    }

`;