import React from 'react'

import InputMask from 'react-input-mask'

import { titleOption, nationals, genders } from '../Mocks/formOptions'

import { Form, Input, Select, Row, Col, DatePicker, Radio, Button } from 'antd'
import {
    SelectBox,
    Text,
    FormCard,
    MoneyUnit,
    SubmitButtonContainer,
    GenderOptionContainer,
} from './styled'

type Props = {
    form: any
    isMobile: boolean
    isEdit: boolean
    onCancel: () => void
    onFinish: () => void
    onChangeGender?: (gender: string) => void
    selectedGender?: string
}

const dateFormat = 'DD/MM/YYYY'

const FormInput = ({
    form,
    onFinish,
    isMobile,
    isEdit,
    onCancel,
    selectedGender,
    onChangeGender,
}: Props) => {
    const { Option } = Select

    return (
        <FormCard>
            <Form form={form} onFinish={onFinish}>
                <Row gutter={[8, 8]} justify="start">
                    <Col xs={{ span: 6 }} md={{ span: 4 }} lg={{ span: 4 }}>
                        <Form.Item
                            label="Title"
                            name="title"
                            initialValue={titleOption[0]}
                            rules={[{ required: true }]}
                        >
                            <SelectBox>
                                {titleOption.map((title, index) => (
                                    <Option key={index} value={title}>
                                        {title}
                                    </Option>
                                ))}
                            </SelectBox>
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 8 }} md={{ span: 10 }} lg={{ span: 10 }}>
                        <Form.Item
                            label="Firstname"
                            name="firstName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Firstname is required',
                                },
                                {
                                    pattern: new RegExp('^[A-Za-zก-ํ]{1,20}$'),
                                    message: 'Firstname must be character',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 8 }} md={{ span: 10 }} lg={{ span: 10 }}>
                        <Form.Item
                            label="Lastname"
                            name="lastName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Lastname is required',
                                },
                                {
                                    pattern: new RegExp('^[A-Za-zก-ํ]{1,20}$'),
                                    message: 'Lastname must be character',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 8]} justify="start">
                    <Col span={8}>
                        <Form.Item
                            label="Birthday"
                            name="birthDay"
                            rules={[
                                {
                                    required: true,
                                    message: 'Birthday is required',
                                },
                            ]}
                        >
                            <DatePicker format={dateFormat} />
                        </Form.Item>
                    </Col>
                    {nationals && nationals.length > 0 && (
                        <Col span={10}>
                            <Form.Item
                                label="Nationality"
                                name="nationality"
                                initialValue={nationals[0].nationality}
                            >
                                <SelectBox>
                                    {nationals.map((national, index) => (
                                        <Option
                                            key={index}
                                            value={national.nationality}
                                        >
                                            {national.nationality}
                                        </Option>
                                    ))}
                                </SelectBox>
                            </Form.Item>
                        </Col>
                    )}
                </Row>
                {!isMobile ? (
                    <Row gutter={[8, 8]} justify="start">
                        <Col span={4}>
                            <Form.Item
                                label="CitizenID"
                                name="citizenID1"
                                rules={[
                                    {
                                        pattern: new RegExp('^[0-9]{1}$'),
                                        message: 'must be 1 digit number',
                                    },
                                ]}
                            >
                                <Input maxLength={1} />
                            </Form.Item>
                        </Col>
                        <Col span={1}>
                            <Text lineHeight={28}>-</Text>
                        </Col>
                        <Col span={4}>
                            <Form.Item
                                name="citizenID2"
                                rules={[
                                    {
                                        pattern: new RegExp('^[0-9]{4}$'),
                                        message: 'must be 4 digits number ',
                                    },
                                ]}
                            >
                                <Input maxLength={4} />
                            </Form.Item>
                        </Col>
                        <Col span={1}>
                            <Text lineHeight={28}>-</Text>
                        </Col>
                        <Col span={4}>
                            <Form.Item
                                name="citizenID3"
                                rules={[
                                    {
                                        pattern: new RegExp('^[0-9]{5}$'),
                                        message: 'must be 5 digits number ',
                                    },
                                ]}
                            >
                                <Input maxLength={5} />
                            </Form.Item>
                        </Col>
                        <Col span={1}>
                            <Text lineHeight={28}>-</Text>
                        </Col>
                        <Col span={3}>
                            <Form.Item
                                name="citizenID4"
                                rules={[
                                    {
                                        pattern: new RegExp('^[0-9]{2}$'),
                                        message: 'must be 2 digits number ',
                                    },
                                ]}
                            >
                                <Input maxLength={2} />
                            </Form.Item>
                        </Col>
                        <Col span={1}>
                            <Text lineHeight={28}>-</Text>
                        </Col>
                        <Col span={2}>
                            <Form.Item
                                name="citizenID5"
                                rules={[
                                    {
                                        pattern: new RegExp('^[0-9]{1}$'),
                                        message: 'must be 1 digit number ',
                                    },
                                ]}
                            >
                                <Input maxLength={1} />
                            </Form.Item>
                        </Col>
                    </Row>
                ) : (
                    <Row justify="start">
                        <Form.Item
                            label="CitizenID"
                            name="citizenID"
                            rules={[
                                {
                                    pattern: new RegExp(
                                        '^[0-9]{1}-[0-9]{4}-[0-9]{5}-[0-9]{2}-[0-9]{1}$'
                                    ),
                                    message: 'invalid CitizenID',
                                },
                            ]}
                        >
                            <InputMask mask="9-9999-99999-99-9">
                                {(inputProps: any) => <Input {...inputProps} />}
                            </InputMask>
                        </Form.Item>
                    </Row>
                )}

                {onChangeGender && genders && genders.length > 0 && (
                    <Row justify="start">
                        <Form.Item
                            label="Gender"
                            name="gender"
                            initialValue={'Male'}
                        >
                            <GenderOptionContainer>
                                <Radio.Group
                                    name="test"
                                    value={selectedGender}
                                    onChange={(e) =>
                                        onChangeGender(e.target.value)
                                    }
                                >
                                    {genders.map((gender, index) => (
                                        <Radio value={gender} key={index}>
                                            {gender}
                                        </Radio>
                                    ))}
                                </Radio.Group>
                            </GenderOptionContainer>
                        </Form.Item>
                    </Row>
                )}
                {nationals && nationals.length > 0 && (
                    <Row justify="start">
                        <Col
                            xs={{ span: 24 }}
                            md={{ span: 6 }}
                            lg={{ span: 6 }}
                        >
                            <Form.Item
                                label="Mobile Phone"
                                name="callingCode"
                                initialValue={nationals[0].callingCode}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Calling code is required',
                                    },
                                ]}
                            >
                                <Select>
                                    {nationals.map((national, index) => (
                                        <Option
                                            value={national.callingCode}
                                            key={index}
                                        >
                                            {national.callingCode}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        {!isMobile && (
                            <Col span={1}>
                                <Text lineHeight={32}>-</Text>
                            </Col>
                        )}

                        <Col
                            xs={{ span: 24 }}
                            md={{ span: 6 }}
                            lg={{ span: 6 }}
                        >
                            <Form.Item
                                name="phoneNumber"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Phone number is required',
                                    },
                                    {
                                        pattern: new RegExp('^[0-9]{4,12}$'),
                                        message: 'must be 4-12 digits number ',
                                    },
                                ]}
                            >
                                <Input maxLength={12} />
                            </Form.Item>
                        </Col>
                    </Row>
                )}
                <Row>
                    <Form.Item label="Passport No" name="passport">
                        <Input />
                    </Form.Item>
                </Row>
                <Row>
                    <Col span={10}>
                        <Form.Item
                            label="Expected Salary"
                            name="salary"
                            rules={[
                                {
                                    required: true,
                                    message: 'Expected Salary is required',
                                },
                                {
                                    pattern: new RegExp('^[0-9]{1,10}$'),
                                    message: 'salary must be 1-10 digits',
                                },
                            ]}
                        >
                            <Input maxLength={10} />
                        </Form.Item>
                    </Col>
                    <MoneyUnit lineHeight={32}>{'THB'}</MoneyUnit>
                    <Col xs={{ span: 24 }} md={{ span: 10 }} lg={{ span: 10 }}>
                        <SubmitButtonContainer>
                            <Row
                                gutter={[8, 8]}
                                justify={isMobile ? 'start' : 'end'}
                            >
                                {isEdit && (
                                    <Col>
                                        <Button
                                            type="primary"
                                            onClick={onCancel}
                                        >
                                            Cancel
                                        </Button>
                                    </Col>
                                )}

                                <Col>
                                    <Button type="primary" htmlType="submit">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </SubmitButtonContainer>
                    </Col>
                </Row>
            </Form>
        </FormCard>
    )
}

export default FormInput
