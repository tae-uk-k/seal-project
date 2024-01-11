import { cv } from "opize-design-system";
import styled from "styled-components";


const Div = styled.div`
    width: 32px;
    height: 32px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 999px;
    margin-left: -6px;
    margin-right: 4px;
    
    &:hover {
        background-color: ${cv.bg_element3};
    }

    -webkit-tap-highlight-color : transparent;
`

export function HeaderButton(props) {
    return (
        <Div onClick={() => props.onClick()}>
            { props.children }
        </Div>
    )
}