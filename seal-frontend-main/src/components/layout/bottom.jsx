import styled from "styled-components";

const LayoutButtonOuter = styled.div`
    position: fixed;
    bottom: 20px;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: center;
`

const LayoutBottomInter = styled.div`
    width: 100%;
    max-width: 400px;
    padding: 0px 8px;
    display: flex;
    justify-content: center;
`

export function LayoutBottom({children}) {
    return (
        <LayoutButtonOuter>
            <LayoutBottomInter>
                {children}
            </LayoutBottomInter>
        </LayoutButtonOuter>
    )
}