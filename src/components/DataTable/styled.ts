import styled from 'styled-components'

import { Card, Button } from 'antd'

const BLUE = '#1890ff'

export const FormTableCard = styled(Card)`
    width: 90%;
`

export const DeleteButton = styled(Button)`
    color: red;
`

export const EditButton = styled(Button)`
    color: ${BLUE};
`

export const ButtonContainer = styled.div`
    text-align: right;
    margin-bottom: 8px;
`

export const DeleteListButton = styled(Button)`
    color: white;
    background-color: red;

    :focus {
        background-color: red;
        color: white;
        border: none;
    }
`
