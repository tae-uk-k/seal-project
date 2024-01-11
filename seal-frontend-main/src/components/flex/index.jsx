import styled from "styled-components";


const FlexDiv = styled.div`
    display: flex;
`

const FlexCenter = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

export const Flex = Object.assign(FlexDiv, {
    Center: FlexCenter
})