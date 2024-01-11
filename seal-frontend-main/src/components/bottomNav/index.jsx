import { cv } from "opize-design-system";
import { House, IconContext, MagnifyingGlass, User, List } from "phosphor-react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const Outer = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    border-top: solid 1px ${cv.border3};
    background-color: #ffffff;
    height: 52px;
    z-index: 99;
`

const Inner = styled.div`
    width: 400px;
    padding: 4px 36px;
    margin: 0 auto;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const StyledItem = styled(Link)`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
`

const ItemIcon = styled.div`
    
`

const ItemLabel = styled.div`
    font-size: 12px;
    margin-top: -2px;
    color: ${props => props.isSelected ? cv.text1 : cv.text3};
`

function Item(props) {
    return (
        <StyledItem to={props.to}>
            <IconContext.Provider value={{
                size: 24,
                color: props.isSelected ? cv.text1 : cv.text3,
                weight: props.isSelected ? 'fill' : 'regular'
            }}>
                <ItemIcon>{props.icon}</ItemIcon>
            </IconContext.Provider>
            <ItemLabel isSelected={props.isSelected}>{props.label}</ItemLabel>
        </StyledItem>
    )
}

export function BottomNav(props) {
    const location = useLocation()
    const tab = location.pathname.split('/')[1]

    return (
        <Outer>
            <Inner>
                <Item icon={<House />} to='/post' label='홈' isSelected={tab === 'post'} />
                {/* <Item icon={<MagnifyingGlass />} to='/post/search' label='검색' isSelected={tab === 'search'}  /> */}
                <Item icon={<User />} to='/my' label='내 정보' isSelected={tab === 'my'} />
                <Item icon={<List />} to='/all' label='전체' isSelected={tab === 'all'} />
            </Inner>
        </Outer>
    )
}