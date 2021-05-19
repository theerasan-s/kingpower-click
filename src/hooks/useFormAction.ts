import { useState } from 'react'

import { Form } from 'antd'

import { formData } from '../types/dataTypes'

import moment from 'moment'

export default function useFormAction(
    isMobile: boolean,
    formDataList: formData[]
) {
    const [form] = Form.useForm()
    const [isEdit, setEdit] = useState(false)
    const [record, setRecord] = useState({} as formData)
    const [listDelete, setListDelete] = useState([] as formData[])
    const [dataList, setDataList] = useState(formDataList)
    const [selectedGender, setSelectedGender] = useState('Male')

    const onSubmitForm = () => {
        let citizenID = ''

        if (!isMobile) {
            const citizenID1 = form.getFieldValue('citizenID1')
            const citizenID2 = form.getFieldValue('citizenID2')
            const citizenID3 = form.getFieldValue('citizenID3')
            const citizenID4 = form.getFieldValue('citizenID4')
            const citizenID5 = form.getFieldValue('citizenID5')
            citizenID = `${citizenID1}-${citizenID2}-${citizenID3}-${citizenID4}-${citizenID5}`
        } else {
            citizenID = form.getFieldValue('citizenID')
        }

        const title = form.getFieldValue('title')
        const firstName = form.getFieldValue('firstName')
        const lastName = form.getFieldValue('lastName')
        const birthDay = form.getFieldValue('birthDay')
        const nationality = form.getFieldValue('nationality')
        const gender = form.getFieldValue('gender')
        const callingCode = form.getFieldValue('callingCode')
        const phoneNumber = form.getFieldValue('phoneNumber')
        const phone = callingCode + phoneNumber
        const passport = form.getFieldValue('passport')
        const salary = form.getFieldValue('salary')

        const data = {
            key: isEdit ? record.key : formDataList.length + 1,
            title: title,
            firstName: firstName,
            lastName: lastName,
            fullName: `${firstName}  ${lastName}`,
            birthDay: birthDay,
            nationality: nationality,
            citizenID: citizenID,
            gender: gender,
            callingCode: callingCode,
            phoneNumber: phoneNumber,
            phone: phone,
            passport: passport,
            salary: salary,
        }

        if (isEdit) {
            const index = formDataList.findIndex(
                (data) => data.key === record.key
            )
            formDataList[index] = data

            const newDataList = [...formDataList]
            localStorage.setItem('formData', JSON.stringify(newDataList))
            resetField()
            setEdit(false)

            return setDataList(newDataList)
        }

        const newDataList = [...formDataList, data]

        localStorage.setItem('formData', JSON.stringify(newDataList))
        setDataList(newDataList)
        resetField()
    }

    const onDelete = (item: formData) => {
        const newDataList = formDataList.filter((data) => data.key !== item.key)
        const finalDataList: formData[] = []

        if (newDataList.length > 0) {
            newDataList.map((data, index) => {
                data.key = index
                return finalDataList.push(data)
            })
        }

        localStorage.setItem('formData', JSON.stringify(finalDataList))
        setDataList(finalDataList)
    }

    const onListDelete = () => {
        const finalDataList: formData[] = formDataList.filter((data) => {
            for (let i = 0; i < listDelete.length; i++) {
                if (listDelete[i].key === data.key) {
                    return false
                }
            }
            return true
        })

        localStorage.setItem('formData', JSON.stringify(finalDataList))
        setDataList(finalDataList)
    }

    const onCheckFormData = (selectedRows: formData[]) => {
        setListDelete(selectedRows)
    }

    const onEdit = (record: formData) => {
        setEdit(true)
        setRecord(record)

        const splitCitizenID = record.citizenID.split('-')

        if (!isMobile) {
            form.setFieldsValue({
                citizenID1:
                    splitCitizenID[0] === 'undefined' ? '' : splitCitizenID[0],
            })
            form.setFieldsValue({
                citizenID2:
                    splitCitizenID[1] === 'undefined' ? '' : splitCitizenID[1],
            })
            form.setFieldsValue({
                citizenID3:
                    splitCitizenID[2] === 'undefined' ? '' : splitCitizenID[2],
            })
            form.setFieldsValue({
                citizenID4:
                    splitCitizenID[3] === 'undefined' ? '' : splitCitizenID[3],
            })
            form.setFieldsValue({
                citizenID5:
                    splitCitizenID[4] === 'undefined' ? '' : splitCitizenID[4],
            })
        }

        const date = new Date(record.birthDay)
        const birthDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
        const formatBirthDate = moment(birthDate, 'DD/MM/YYYY')

        form.setFieldsValue({ citizenID: record.citizenID })
        form.setFieldsValue({ title: record.title })
        form.setFieldsValue({ firstName: record.firstName })
        form.setFieldsValue({ lastName: record.lastName })
        form.setFieldsValue({ birthDay: formatBirthDate })
        form.setFieldsValue({ nationality: record.nationality })
        form.setFieldsValue({ gender: record.gender })
        form.setFieldsValue({ callingCode: record.callingCode })
        form.setFieldsValue({ phoneNumber: record.phoneNumber })
        form.setFieldsValue({ passport: record.passport })
        form.setFieldsValue({ salary: record.salary })
        setSelectedGender(record.gender)
    }

    const resetField = () => {
        setSelectedGender('Male')
        form.resetFields()
    }

    const onCancelEdit = () => {
        setEdit(false)
        resetField()
    }

    const onChangeGender = (selectedGender: string) => {
        setSelectedGender(selectedGender)
    }

    return {
        form,
        dataList,
        isEdit,
        selectedGender,
        onSubmitForm,
        onDelete,
        onEdit,
        onListDelete,
        onCheckFormData,
        onCancelEdit,
        onChangeGender,
    }
}
