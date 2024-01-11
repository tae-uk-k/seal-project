import React from "react";

import { Button, TextField, cv, Select } from "opize-design-system";
import { Flex, Logo, View } from "../../components";
import { LayoutBottom } from "../../components/layout/bottom";
import { useForm } from 'react-hook-form'
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
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

export function SignUp() {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const password = useRef({});
    password.current = watch("password", '');

    const submit = async (data) => {
        console.log(data)
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_SERVER}/auth/sign-up`, {
                id: data.id,
                password: data.password,
                name: data.name,
                type: data.type,
                grade: data.studentId.slice(0, 1),
                class: data.studentId.slice(1, 2),
                number: data.studentId.slice(2, 4),
            })
            console.log(res)
            localStorage.setItem('token', res.data.token)
            navigate('/') 
        } catch (err) {
            console.error(err)
            if (err.response) {
                switch (err.response.data.code) {
                    case 'wrong_password':
                        toast.error('비밀번호가 잘못됬어요.')
                        break
                    case 'account_already_exist':
                        toast.error('이미 아이디가 존재해요.')
                        break
                    case 'wrong_id':
                        toast.error('잘못된 아이디에요.')
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
                <StyledForm onSubmit={handleSubmit(submit)}>
                    <TextField {...register('name', {
                        required: true
                    })} label='이름' error={errors.name?.type === 'required' && '이름을 입력해주세요'} />

                    <TextField {...register('id', {
                        required: true
                    })} label='아이디' error={errors.id?.type === 'required' && '아이디를 입력해주세요'} />
                    
                    <TextField {...register('password', {
                        required: true
                    })} label='비밀번호'
                        type="password"
                        error={errors.password?.type === 'required' && '비밀번호를 입력해주세요'}  />

                    <TextField {...register('repeatPassword', {
                        required: true,
                        validate: value => value === password.current || '비밀번호가 틀립니다.'
                    })} label='비밀번호 재확인'
                        type="password"
                        error={errors.repeatPassword?.message}  />
                        
                    <TextField {...register('studentId')} label='학번' />

                    <Select {...register('type', {
                        required: true
                    })} label='구분'>
                        <Select.Option value={'student'}>학생</Select.Option>
                        <Select.Option value={'teacher'}>선생님</Select.Option>
                        <Select.Option value={'other'}>기타</Select.Option>
                    </Select>

                    <Button
                        label='회원가입'
                        type='submit'
                        variant={'contained'}
                        width='100%'
                        size="large"
                    />
                    <Flex.Center>
                        <StyledLink to='/sign-in'>로그인</StyledLink>
                    </Flex.Center>
                </StyledForm>
                
                
            </LayoutBottom>
        </View>
    )
}