import { Header, View } from "../../components";
import { TextField, Button, Radio, RadioGroup, TextArea, Select, Checkbox } from 'opize-design-system'
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Back } from "../../components/back";
import axios from "axios";

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
`

export function Write(props) {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors, isDirty }, watch } = useForm();

    const submit = async (data) => {
        console.log(data)

        let grade = []
        if (data.grade1) grade = [...grade, 1]
        if (data.grade2) grade = [...grade, 2]
        if (data.grade3) grade = [...grade, 3]

        const form = {
            title: data.title,
            content: data.content,
            category: data.category,
            tag: '',
            contact: data.contact,
            condition: {
                grade,
                line: '',
                quote: Number(data.quote)
            }
        }

        const res = await axios.post(`${process.env.REACT_APP_API_SERVER}/post`, form, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        console.log(res)

        navigate('/post')
    }

    return (
        <View>
            <Header>
                <Back />
                글쓰기
            </Header>
            <StyledForm onSubmit={handleSubmit(submit)}>

                <TextField required {...register('title', {
                            required: true
                    })} label='제목' error={errors.title?.type === 'required' && '제목'} />

                <TextArea required {...register('content', {
                    required: true
                })}
                    label='내용'
                    error={errors.content?.type === 'required' && '내용을 작성해주세요.'}
                    placeholder='모집에 대한 내용을 작성해주세요. 부적절한 글은 삭제될 수 있어요.'
                    
                />
                
                <RadioGroup label='분류' required>
                    <Radio {...register("category")} label='모의면접' value='interview' />
                    <Radio {...register("category")} label='모의 자소서 첨삭' value='correction' />
                    <Radio {...register("category")} label='프로젝트' value='project' />
                </RadioGroup>

                <Checkbox {...register('grade1')} text='1학년' label='학년'  />
                <Checkbox {...register('grade2')} text='2학년' />
                <Checkbox {...register('grade3')} text='3학년' />

                <Select {...register('location')} label='장소' required>
                    <Select.Option value='null'>미정</Select.Option>
                    <Select.Option value='class'>교실</Select.Option>
                    <Select.Option value='inSchool'>학교 내</Select.Option>
                    <Select.Option value='outSchool'>학교 외</Select.Option>
                </Select>

                <TextField required {...register('date', {
                        required: true
                })} label='날짜' error={errors.date?.type === 'required' && '예상 날짜를 입력해주세요.'} />
                
                <TextArea required {...register('contact', {
                    required: true
                })}
                    label='연락방법'
                    error={errors.contact?.type === 'required' && '연락방법을 작성해주세요'}
                    placeholder='전화번호, 이메일, 학년 반 등 연락할 방법을 적어주세요.'
                    
                />
                
                <TextField required {...register('quote', {
                            required: true
                    })} label='참여인원' error={errors.quote?.type === 'required' && '참여인원'} type='number'  />

                <Button type='submit' label='등록하기' variant='contained' width='100%' />
            </StyledForm>
        </View>
    )
}