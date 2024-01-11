import { cv } from "opize-design-system"
import styled from "styled-components"

const StyledButton = styled.button`
    position: fixed;
    right: 32px;
    bottom: 80px;
    width: 52px;
    height: 52px;
    background-color: ${cv.bg_element5};
    border-radius: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`

export function FloatingButton(props) {
    return (
        <StyledButton onClick={props.onClick}>
            {props.children}
        </StyledButton>
    )
}