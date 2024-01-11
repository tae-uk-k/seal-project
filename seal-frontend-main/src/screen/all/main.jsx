import { Flex } from "opize-design-system";
import styled from "styled-components";
import { Header, View } from "../../components";
import Logo from '../../assets/alpha_fit.png'
import { BottomNav } from "../../components/bottomNav";
import { useState } from "react";

const Img = styled.img`
    height: 20px;
`

export function Main(props) {
    const [ list, setList ] = useState([])

    return (
        <View>
            <Header>
                <Flex style={{justifyContent: 'space-between'}}>
                    <Img src={Logo} alt='' />
                </Flex>
            </Header>
            <Flex style={{flexDirection: 'column', gap: '16px'}}>
                아직 준비중입니다...
            </Flex>
            <BottomNav />
        </View>
    )
}