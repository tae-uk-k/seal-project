import axios from "axios";
import { TextField, Select, Button, Flex, StyledLink, cv, Box, useDialog } from "opize-design-system";
import { Trash } from "phosphor-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { Header, View } from "../../components";
import { Back } from "../../components/back";
import { BottomNav } from "../../components/bottomNav";

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
    margin-bottom: 16px;
`

const UserInfo = styled.div`
    margin-bottom: 32px;
`

const H1 = styled.h1`
    font-size: 20px;
    font-weight: 600;
`

const P = styled.p`
    font-size: 12px;
    color: ${cv.text3};
`

function PasswordBox() {
    const { register, handleSubmit, formState: { errors, isDirty }, watch, setValue } = useForm();

    const password = useRef({});
    password.current = watch("password", '');

    const submit = async (data) => {
        await axios.patch(`${process.env.REACT_APP_API_SERVER}/my/password`, {
            oldPassword: data.oldPassword,
            password: data.password,
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        setValue('oldPassword', '')
        setValue('password', '')
        setValue('repeatPassword', '')
        toast.info('비밀번호를 변경했어요.')
    }

    return (
        <StyledForm onSubmit={handleSubmit(submit)}>
            <Box footer={<Button type='submit' label='변경하기' variant='contained' width='100%' />} header='비밀번호'>
                <TextField {...register('oldPassword', {
                    required: true
                })} label='기존 비밀번호'
                    type="password"
                    error={errors.oldPassword?.type === 'required' && '기존 비밀번호를 입력해주세요'} />

                <TextField {...register('password', {
                    required: true
                })} label='비밀번호'
                    type="password"
                    error={errors.password?.type === 'required' && '비밀번호를 입력해주세요'} />

                <TextField {...register('repeatPassword', {
                    required: true,
                    validate: value => value === password.current || '비밀번호가 틀립니다.'
                })} label='비밀번호 재확인'
                    type="password"
                    error={errors.repeatPassword?.message} />
            </Box >
        </StyledForm>
    )
}

function DeleteAccount() {
    const navigate = useNavigate()
    const dialog = useDialog()

    const deleteAccount = async () => {
        const func = async () => {
            await axios.delete(`${process.env.REACT_APP_API_SERVER}/my`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            toast.info('계정을 삭제했어요.')
            localStorage.removeItem('token')
            navigate('/sign-in')
        }

        dialog({
            title: '정말로 계정을 삭제하실건가요?',
            content: '삭제한 계정은 되돌릴 수 없어요',
            icon: <Trash color={cv.red1} />,
            buttons: [
                {
                    label: '돌아가기',
                    onClick: () => null,
                    variant: 'text'
                },
                {
                    label: '삭제',
                    onClick: func,
                    color: 'red',
                    variant: 'contained'
                }
            ]
        })
    }

    return (
        <Box>
            <Button label='계정 삭제' variant="text" color="red" onClick={() => deleteAccount()} width="100%" />
        </Box>
    )
}

export function My() {
    const navigate = useNavigate()
    const [data, setData] = useState({})
    const { register, handleSubmit, formState: { errors, isDirty }, watch, setValue } = useForm();

    const submit = async (data) => {
        console.log(data)
        await axios.patch(`${process.env.REACT_APP_API_SERVER}/my`, {
            name: data.name,
            phone: data.phone,
            grade: data.studentId.slice(0, 1),
            class: data.studentId.slice(1, 2),
            number: data.studentId.slice(2, 4),
            type: data.select
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        toast.info('정보를 수정했어요.')
    }

    useEffect(() => {
        ; (async () => {
            const res = await axios.get(`${process.env.REACT_APP_API_SERVER}/my`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            setData(res.data)
            setValue('name', res.data.name)
            setValue('studentId', `${res.data.grade}${res.data.class}${res.data.number}`)
            setValue('select', res.data.type)
            setValue('phone', res.data.phone)
        })()
    }, [setValue])

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/sign-in')
    }

    return (
        <View>
            <Header>
                <Back />
                내 정보
            </Header>
            <UserInfo>
                <H1>{data.name}</H1>
                <P>{data.grade}{data.class}{data.number} ({data.year})</P>
            </UserInfo>

            <StyledForm onSubmit={handleSubmit(submit)}>
                <Box footer={<Button type='submit' label='변경하기' variant='contained' width='100%' />} header='내 정보'>
                    <TextField {...register('name', {
                        required: true
                    })} label='이름' error={errors.name?.type === 'required' && '이름'} />
                    <TextField {...register('studentId', {
                        required: true
                    })} label='학번' error={errors.studentId?.type === 'required' && '학번'} />
                    <Select {...register('select', {
                        required: true
                    })} name='구분' label='구분'>
                        <Select.Option value='student'>학생</Select.Option>
                        <Select.Option value='teacher'>선생님</Select.Option>
                        <Select.Option value='other'>기타</Select.Option>
                    </Select>
                    <TextField {...register('phone')} label='연락처' />
                </Box >
            </StyledForm>

            <PasswordBox />

            <DeleteAccount />
            <Button type='submit' label='로그아웃' variant='text' width='100%' onClick={() => logout()} />

            <BottomNav />
        </View>
    )
}