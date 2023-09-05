import styled from "styled-components";
import ReactInputMask from "react-input-mask";

export const Input = styled(ReactInputMask)`


    width: 350px;
    height: 40px;
    border-radius: 4px;
    border: none;
    padding-left: 20px;

    & + & {
        margin-top:10px;
    }


`;