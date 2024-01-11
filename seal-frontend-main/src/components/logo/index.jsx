import styled from "styled-components";
import LogoImg from '../../assets/alpha.png'

const StyledLogo = styled.img`
    width: ${(props) => props.width};
`

export function Logo({
    width = '128px'
}) {
    return <StyledLogo src={LogoImg} alt='' width={width} />
}