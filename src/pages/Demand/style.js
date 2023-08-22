import styled from "styled-components";

export const DeliveryContainer = styled.section`

    width:100%;
    padding-bottom: 150px;

    .demand-empty {

        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        padding:30px;

    }

    .demand-handler-container{

        position: relative;
        width: 60%;
        display: flex;
        padding:30px;
        margin-top:20px;
        align-items: center;
        justify-content: center;

        #demand-text{

            background-color: green;
            color:white;
            border-radius: 5px;
            font-weight: bold;
            padding:20px;

        }

        .demands{

            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            justify-content: center;
            gap:20px;

        }


    }

    .filters{

        
        padding:20px;
        box-shadow: 6px 6px 6px 6px grey;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap:20px;

        span{
            font-weight: bold;
        }

        select{

            width: 350px;
            height: 40px;
            text-align: center;
            border-radius: 10px;
            font-weight: bold;
            font-size: 15px;
            cursor: pointer;
        }

        input[type='date']{

            width: 350px;
            height: 40px;
            text-align: center;
            outline:none;
            border-radius: 10px;
            font-size: 20px;
            padding-left: 20px;

        }
        

        input{
            width: 250px;
            height: 40px;
        }

    }

    .delivery-options{

        display: flex;
        gap:20px;
        width: 100%;

        button {

           width: 250px;
           height: 50px;

        }


    }

    .delivery-item{

        width: 80%;
        background: white;
        box-shadow: 6px 6px 6px 6px grey;
        padding:20px;
        border-radius: 10px;

    }

`;