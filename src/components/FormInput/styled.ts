import styled from 'styled-components'

import { Select, Card, Form } from 'antd'

interface textProps {
    lineHeight?: number
}

export const SelectBox = styled(Select)`
    text-align: left;
`

export const Text = styled.span<textProps>`
    display: inline-block;
    line-height: ${(props) => `${props.lineHeight}px` || '16px'};
`

export const Container = styled.div`
    width: 100%;
`

export const MoneyUnitContainer = styled.div`
    text-align: left;
    line-height: 30px;
`

export const FormCard = styled(Card)`
    width: 90%;
    margin: 16px 0px;
`

export const MoneyUnit = styled(Text)`
    margin-left: 8px;
`

export const SubmitButtonContainer = styled.div`
    @media screen and (max-width: 1480px) {
        text-align: right;
    }

    @media screen and (max-width: 768px) {
        text-align: left;
    }
`

export const GenderOptionContainer = styled.div`
    @media screen and (max-width: 768px) {
        text-align: left;
    }
`

export const CitizenID = styled(Form.Item)`
    margin-bottom: 0px;
`
