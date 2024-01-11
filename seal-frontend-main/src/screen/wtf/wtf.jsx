import { Flex, cv } from "opize-design-system";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Header, View } from "../../components";

import WTFImg from '../../assets/wtf.png'

const StyledLink = styled(Link)`
    color: ${cv.text1};
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`

const Img = styled.img`
    width: 100%;
`

export function Wtf() {
    return(
        <View>
            <Header></Header>
            <Flex.Center style={{width: '100%'}}>
                <Img alt="goback" src={WTFImg} />
            </Flex.Center>
            <Flex.Center>
                <StyledLink to='/'>돌아가기</StyledLink>
            </Flex.Center>
        </View>
    )
}