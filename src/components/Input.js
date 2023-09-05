import styled from "styled-components";

export const Input = styled.input`

    width: 350px;
    height: 40px;
    border-radius: 4px;
    border: none;
    padding-left: 20px;

    & + & {
        margin-top:10px;
    }

`;