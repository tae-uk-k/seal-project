import { Flex, TextField } from "opize-design-system";
import styled from "styled-components";
import { Header, View } from "../../components";
import { PostItem } from "../../components/postItem";
import Logo from '../../assets/alpha_fit.png'
import { BottomNav } from "../../components/bottomNav";
import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Back } from "../../components/back";

const Img = styled.img`
    height: 20px;
`
const StyledForm = styled.form`

`

export function Search(props) {
    const [ searchText, setSearchText ] = useState('')

    const [ list, setList ] = useState([])
    const { register, handleSubmit, formState: { errors, isDirty }, watch } = useForm();

    useEffect(() => {
        ;(async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_SERVER}/post`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                setList(res.data.posts)
            } catch (err) {
                setList([
                    {
                        id: 123,
                        title: '제목',
                        category: '모의 면접',
                        content: "글 내용",
                        createdAt: '123',
                        tag : ['태그1', '태그2'],
			            status: "상태(open, close, pause)",
			            condition: {
			            	grade: [1, 2],
			            	line: "자연",
                        },
                        author: {
                            id: "유저 아이디",
                            name: "유저 이름",
                            grade: "학년",
                            class: "반",
                            number: "번호",
                        },
                    },

                ])
                // console.error(err)
            }
        })()
    }, [])

    return (
        <View>
            <Header>
                <Back />
                <TextField value={searchText} onChange={e => setSearchText(e.target.value)} placeholder='검색어를 입력하세요' />
            </Header>
            
            {/* <StyledForm onSubmit={handleSubmit(submit)}>
                <TextField {...register('input', {
                                required: true
                        })} label='' error={errors.title?.type === 'required' && '제목'} />
            </StyledForm> */}
            <Flex style={{flexDirection: 'column', gap: '16px'}}>
                {
                    list.filter((e) => {
                        if (e.title.toLowerCase().includes(searchText)) return true
                        if (e.content.toLowerCase().includes(searchText)) return true
                        if (e.category.toLowerCase().includes(searchText)) return true

                        else return false
                    }).map(e => <PostItem key={e.id} to={`/post/${e.id}`} title={e.title} category={e.category} content={e.content} subTitle="3학년, 2시간 전" />)
                }
            </Flex>
            <BottomNav />
        </View>
    )
}