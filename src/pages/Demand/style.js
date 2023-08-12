import styled from "styled-components";

export const DeliveryContainer = styled.section`

    width:100%;
    padding-left:150px;
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

        #demand-text{

            background-color: green;
            color:white;
            font-weight: bold;
            padding:20px;

        }

        .demands{

            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            gap:20px;

        }


    }

    .filters{

        input[type='date']{

            width: 350px;
            height: 40px;
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

        width: 60%;
        background: white;
        box-shadow: 2px 2px 2px 2px grey;
        padding:20px;
        border-radius: 10px;

    }

`;