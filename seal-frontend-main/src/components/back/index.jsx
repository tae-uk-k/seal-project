import { cv } from "opize-design-system";
import { CaretLeft } from "phosphor-react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";


const StyledLink = styled.div`
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
`

export function Back(props) {
    const navigate = useNavigate()

    return (
        <StyledLink onClick={() => navigate(-1)}>
            <CaretLeft size={20} weight={'bold'} />
        </StyledLink>
    )
}