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
        

        @media(max-witdh:760px){
            padding: 0px;
        }

    }

    .demand-handler-container{

        position: relative;
        width: 100%;
        display: flex;
        margin-top:20px;
        align-items: center;
        justify-content: center;
        

        #demand-text{

            width: 100%;
            text-align: center;
            background-color: green;
            color:white;
            border-radius: 5px;
            font-weight: bold;
            padding:20px;
            font-size: 1.0em;
            

        }

        .demands{

            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap:20px;

            @media(max-width:760px){
                justify-content: center;
                align-items: center;
            }

            .demand-buttons{

                display: flex;
                align-items: center;
                justify-content: center;
                gap:20px;

                @media(max-width:760px){
                flex-direction: column;
                }


            }


        }

        @media(max-width:760px){
            width: 100%;
            padding:0px;
        }



    }

    .filters{

        
        padding:20px;
        box-shadow: 6px 6px 6px 6px grey;
        display: flex;
        justify-content: space-around;
        align-items: center;
        gap:20px;

        .filter-items{
            display: flex;
            height: 100px;
            flex-direction: column;
            align-items: start;
            gap:25px;
            justify-content: center;

             @media(max-width:760px){
                align-items: center;
                justify-content: center;
             }
        }

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

        }
        

        input{
            width: 250px;
            height: 40px;
        }

        @media(max-width:760px){
          flex-direction: column;
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

        @media(max-width:760px){
            display: flex;
            flex-direction: column;
            align-items: center;
            gap:30px;
            justify-content: center;
        }

    }

`;