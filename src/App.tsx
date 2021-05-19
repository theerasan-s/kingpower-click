import React from 'react'

import { Row } from 'antd'
import FormInput from './components/FormInput/FormInput'
import DataTable from './components/DataTable/DataTable'
import useFormAction from './hooks/useFormAction'

import { useMediaQuery } from 'react-responsive'
import { formData } from './types/dataTypes'

import 'antd/dist/antd.css'
import './App.css'

function App() {
    const localData = localStorage.getItem('formData') || '[]'
    const formData: formData[] = JSON.parse(localData)
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
    const {
        form,
        dataList,
        isEdit,
        selectedGender,
        onSubmitForm,
        onDelete,
        onEdit,
        onCheckFormData,
        onListDelete,
        onCancelEdit,
        onChangeGender,
    } = useFormAction(isMobile, formData)

    return (
        <div className="App">
            <Row justify="center">
                <FormInput
                    form={form}
                    isMobile={isMobile}
                    isEdit={isEdit}
                    selectedGender={selectedGender}
                    onFinish={onSubmitForm}
                    onCancel={onCancelEdit}
                    onChangeGender={onChangeGender}
                />
            </Row>
            <Row justify="center">
                <DataTable
                    formData={dataList}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    isMobile={isMobile}
                    onCheckDelete={onCheckFormData}
                    onDeleteList={onListDelete}
                />
            </Row>
        </div>
    )
}

export default App
