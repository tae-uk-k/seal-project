import { cv, Flex } from "opize-design-system"
import { Link } from "react-router-dom"
import styled from "styled-components"

const Divver = styled(Link)`
    display: flex;
    gap: 8px;
    user-select: none;
    cursor: pointer;
    text-decoration: none;
    color: ${cv.text1};
`

const Img = styled.img`
    height: 128px;
    width: 128px;
    border-radius: 4px;
    border: 0;
    background-color: ${cv.bg_element3};
`

const Category = styled.div`
    padding: 3px 8px;
    background-color: ${cv.bg_element3};
    border-radius: 999px;
    font-size: 10px;
    color: ${cv.text1};
    width: fit-content;
`

const Title = styled.h2`
    font-size: 16px;
    font-weight: 400;
`

const SubTitle = styled.div`
    font-size: 12px;
    color: ${cv.text3};
`

const Content = styled.div`
    font-size: 12px;
    color: ${cv.text3};
`

export function PostItem({
    img, title, category, subTitle, content, to
}) {
    return (
        <Divver to={to}>
            <Flex>
                <Img src={img} alt='' />
            </Flex>
            <Flex style={{flexDirection: 'column', gap: '4px'}}>
                <Category>{category}</Category>
                <Title>{title}</Title>
                <SubTitle>{subTitle}</SubTitle>
                <Content>{content}</Content>
            </Flex>
        </Divver>
    )
}