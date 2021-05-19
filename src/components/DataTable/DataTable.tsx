import React from 'react'

import { Table } from 'antd'
import {
    FormTableCard,
    EditButton,
    DeleteButton,
    ButtonContainer,
    DeleteListButton,
} from './styled'
import { formData } from '../../types/dataTypes'

type Props = {
    formData: formData[]
    isMobile: boolean
    onDelete: (record: formData) => void
    onEdit: (record: formData) => void
    onCheckDelete: (selectedRows: formData[]) => void
    onDeleteList: () => void
}

const DataTable = ({
    formData,
    onDelete,
    onEdit,
    isMobile,
    onCheckDelete,
    onDeleteList,
}: Props) => {
    const columns = [
        {
            title: 'Name',
            dataIndex: 'fullName',
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
        },
        {
            title: 'Mobile Phone',
            dataIndex: 'phone',
        },
        {
            title: 'Nationality',
            dataIndex: 'nationality',
        },
        {
            title: 'Action',
            key: 'action',
            render: (record: formData) => (
                <div>
                    <EditButton type="text" onClick={() => onEdit(record)}>
                        Edit
                    </EditButton>
                    <span>/</span>
                    <DeleteButton type="text" onClick={() => onDelete(record)}>
                        Delete
                    </DeleteButton>
                </div>
            ),
        },
    ]

    return (
        <FormTableCard>
            <ButtonContainer>
                <DeleteListButton onClick={onDeleteList}>
                    Delete
                </DeleteListButton>
            </ButtonContainer>

            {isMobile ? (
                <Table
                    columns={columns}
                    dataSource={formData}
                    scroll={{ x: 1300 }}
                    rowSelection={{
                        type: 'checkbox',
                        onChange: (_selectedRowKeys, selectedRows) =>
                            onCheckDelete(selectedRows),
                    }}
                    pagination={{ pageSize: 5 }}
                />
            ) : (
                <Table
                    columns={columns}
                    dataSource={formData}
                    rowSelection={{
                        type: 'checkbox',
                        onChange: (_selectedRowKeys, selectedRows) =>
                            onCheckDelete(selectedRows),
                    }}
                    pagination={{ pageSize: 5 }}
                />
            )}
        </FormTableCard>
    )
}

export default DataTable
