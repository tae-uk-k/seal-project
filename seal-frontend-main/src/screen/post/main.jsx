import { Flex } from "opize-design-system";
import styled from "styled-components";
import { Header, View } from "../../components";
import { PostItem } from "../../components/postItem";
import Logo from '../../assets/alpha_fit.png'
import { BottomNav } from "../../components/bottomNav";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { HeaderButton } from "../../components/headerButton";
import { MagnifyingGlass, Plus } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import { FloatingButton } from "../../components/floatButton";

const Img = styled.img`
    height: 20px;
`

export function Main(props) {
    const [ list, setList ] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        ;(async () => {
            try {
                // throw Error()
                const res = await axios.get(`${process.env.REACT_APP_API_SERVER}/post`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                setList(res.data.posts)
            } catch (err) {
                console.error(err)
                // setList([
                //     {
                //         id: 123,
                //         title: '제목',
                //         category: '모의 면접',
                //         createdAt: '123',
                //         tag : ['태그1', '태그2'],
			    //         status: "상태(open, close, pause)",
			    //         condition: {
			    //         	grade: [1, 2],
			    //         	line: "자연",
                //         },
                //         author: {
                //             id: "유저 아이디",
                //             name: "유저 이름",
                //             grade: "학년",
                //             class: "반",
                //             number: "번호",
                //         },
                //     }, {
                //         id: 124,
                //         title: '제목',
                //         category: '모의 면접',
                //         createdAt: '123',
                //         tag : ['태그1', '태그2'],
			    //         status: "상태(open, close, pause)",
			    //         condition: {
			    //         	grade: [1, 2],
			    //         	line: "자연",
                //         },
                //         author: {
                //             id: "유저 아이디",
                //             name: "유저 이름",
                //             grade: "학년",
                //             class: "반",
                //             number: "번호",
                //         },
                //     },

                // ])
                // console.error(err)
            }
        })()
    }, [])

    return (
        <View>
            <Header>
                <Flex style={{justifyContent: 'space-between', width: '100%', alignItems: 'center'}}>
                    <Img src={Logo} alt='' />
                    <Flex>
                        <HeaderButton onClick={() => navigate('/post/search')}>
                            <MagnifyingGlass size={20} weight={'bold'} />
                        </HeaderButton>
                    </Flex>
                </Flex>
            </Header>
            <Flex style={{flexDirection: 'column', gap: '16px'}}>
                {
                    list.map(e => <PostItem key={e.id} to={`/post/${e.id}`} title={e.title} category={e.category} content={e.content} subTitle="3학년, 2시간 전" />)
                }
            </Flex>
            <FloatingButton onClick={() => navigate('/post/write')}>
                <Plus size={32} color="#fff" />
            </FloatingButton>
            <BottomNav />
        </View>
    )
}