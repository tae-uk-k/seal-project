import { cv } from "opize-design-system";
import styled from "styled-components";

const HeaderOuter = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    border-bottom: solid 1px ${cv.border3};
    background-color: #ffffff;
    height: 48px;
    z-index: 10;
`

const HeaderInner = styled.div`
    width: 400px;
    padding: 0px 12px;
    margin: 0 auto;
    height: 100%;
    display: flex;
    align-items: center;
`

export function Header(props) {
    return (
        <HeaderOuter>
            <HeaderInner>
                {props.children}
            </HeaderInner>
        </HeaderOuter>
    )
}