import React from "react";

import { Button, TextField, cv } from "opize-design-system";
import { Flex, Logo, View } from "../../components";
import { LayoutBottom } from "../../components/layout/bottom";
import { useForm } from 'react-hook-form'
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
`

const StyledLink = styled(Link)`
    color: ${cv.blue1};
    text-decoration: none;
    font-size: .875rem;

    &:hover {
        text-decoration: underline;
    }
`

export function SignIn() {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm();

    const login = async (data) => {
        console.log(data)
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_SERVER}/auth/sign-in`, {
                id: data.id,
                password: data.password,
            })
            console.log(res)
            localStorage.setItem('token', res.data.token)
            navigate('/')
        } catch (err) {
            console.error(err)
            if (err.response) {
                switch (err.response.data.code) {
                    case 'wrong_password':
                        toast.error('비밀번호가 틀렸어요.')
                        break
                    case 'user_not_found':
                        toast.error('존재하지 않는 아이디에요.')
                        break
                    default:
                        toast.error('예상하지 못한 문제가 발생했어요. 개발자에게 연락해주세요.')
                }
            } else {
                toast.error('서버에 연결할 수 없어요.')
            }
        }
    }

    return (
        <View>
            <Flex.Center><Logo width="200px" /></Flex.Center>
            
            <LayoutBottom>
                <StyledForm onSubmit={handleSubmit(login)}>
                    <TextField {...register('id', {
                        required: true
                    })} label='아이디' error={errors.id?.type === 'required' && '아이디를 입력해주세요'} />
                    
                    <TextField {...register('password', {
                        required: true
                    })} label='비밀번호'
                        type="password"
                        error={errors.password?.type === 'required' && '비밀번호를 입력해주세요'}  />
                        
                    <Button
                        label='로그인'
                        type='submit'
                        variant='contained'
                        width='100%'
                        size="large"
                    />
                    <Flex.Center>
                        <StyledLink to='/sign-up'>회원가입</StyledLink>
                    </Flex.Center>
                </StyledForm>
            
            </LayoutBottom>
        </View>
    )
}