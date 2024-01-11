import { cv } from "opize-design-system";
import styled from "styled-components";


// export const View = styled.div`
//     width: 400px;
//     padding: 0px 12px;
//     margin: 0 auto;
//     min-height: 100%;
//     margin-top: 40px;
//     padding-top: 20px;
// `

const Outer = styled.div`
    width: 100%;
    overflow-x: hidden;
    background-color: ${props => props.backgroundColor || cv.bg_page2};
    padding-bottom: 80px;
`

const Inner = styled.div`
    width: 400px;
    padding: 0px ${props => props.noPadding ? 0 : 12}px;
    margin: 0 auto;
    min-height: 100%;
    padding-top: 60px;
`

export function View(props) {
    return (
        <Outer backgroundColor={props.backgroundColor}>
            <Inner noPadding={props.noPadding}>
                {props.children}
            </Inner>
        </Outer>
    )
}