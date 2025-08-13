import React, { useEffect, useState } from 'react'
import { BusinessAreaWareHouseImport } from './Imports'
const { Text, Form, useFormik, SaveButton, Email, TextArea, SingleSelect, SelectStatus, AddBusinessAreaWareHouseSchema, useNavigate, useDispatch, useSelector, ToastContainer, toast, companyBusinessAreaListTodo, addWareHouseTodo, Loader, lang } = BusinessAreaWareHouseImport

export default function AddBusinessAreaWareHouseForm() {

    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const company_area = useSelector(state => state && state.companyBusinessAreaList && state.companyBusinessAreaList.data)
    // console.log(company_area)

    const area_option = company_area && company_area.map(val => (
        { "value": val.id, "label": val.name }
    ))

    const initialValues = {

        businessAreaId: '',
        name: '',
        shortName: '',
        address: '',
        postalCode: '',
        email: '',
        status: '',

    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: initialValues,
        validationSchema: AddBusinessAreaWareHouseSchema,

        onSubmit: (values, action) => {
            // console.log("values", values)
            dispatch(addWareHouseTodo({ 'values': values })).then((res) => add_res(res.payload, action))
        }
    })

    const add_res = (res, action) => {
        if (res && res.status == 201) {
            toast.success(lang.ware_house + ' ' + lang.success_add, { position: "bottom-right" })
            action.resetForm()
            setTimeout(() => {
                navigate('/warehouse-list')
            }, 1500);
        } else if (res && res.status == 401) {
            localStorage.clear()
            navigate('/login')
        } else if (res && res.status == 400) {
            toast.error("400 BAD REQUEST", { position: "bottom-right" })
        } else {
            toast.error(lang.wrong, { position: "bottom-right" })
        }
    }

    const area_res = (res) => {
        if (res && res.status == 200) {
            setLoading(false)
        } else if (res && res.status == 401) {
            localStorage.clear()
            navigate('/login')
        } else {
            setLoading(false)
        }
    }

    useEffect(() => {
        setLoading(true)
        dispatch(companyBusinessAreaListTodo({ 'search': '' })).then((res) => area_res(res.payload))
    }, [])

    return (
        <>
            {loading ?
                <div className="layout">
                    <Loader />
                </div>
                :
                <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                    <div className="layout">
                        <div className='container-fluid'>
                            <div className="row">

                                <div className="col-md-3">
                                    <SingleSelect
                                        closeMenu={true}
                                        label_name={lang.business_area}
                                        // placeholder='Select Business Area'
                                        disabled={false}
                                        option={area_option ? area_option : []}
                                        name='businessAreaId'
                                        defaultValue={""}
                                        onChange={(e) =>
                                            setFieldValue('businessAreaId', e.value)
                                        }
                                        onBlur={handleBlur}
                                        error={errors.businessAreaId && touched.businessAreaId ? (<span className='text-danger form_label' >{errors.businessAreaId}</span>) : null}
                                    />
                                </div>

                                <div className="col-md-3">
                                    <Text
                                        label_name={lang.name}
                                        placeholder=''
                                        disabled={false}
                                        name='name'
                                        value={values.name || ''}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={errors.name && touched.name ? (<span className='text-danger form_label' >{errors.name}</span>) : null}
                                    />
                                </div>

                                <div className="col-md-3">
                                    <Text
                                        label_name={lang.short_name}
                                        placeholder=''
                                        disabled={false}
                                        name='shortName'
                                        value={values.shortName || ''}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={errors.shortName && touched.shortName ? (<span className='text-danger form_label' >{errors.shortName}</span>) : null}
                                    />
                                </div>

                                <div className="col-md-3">
                                    <TextArea
                                        label_name={lang.address}
                                        placeholder=''
                                        disabled={false}
                                        rows={1}
                                        name='address'
                                        value={values.address || ''}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={errors.address && touched.address ? (<span className='text-danger form_label' >{errors.address}</span>) : null}
                                    />
                                </div>

                                <div className="col-md-3">
                                    <Email
                                        label_name={lang.email}
                                        placeholder=''
                                        disabled={false}
                                        name='email'
                                        value={values.email || ''}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={errors.email && touched.email ? (<span className='text-danger form_label' >{errors.email}</span>) : null}
                                    />
                                </div>

                                <div className="col-md-3">
                                    <Text
                                        label_name={lang.postal_code}
                                        placeholder=''
                                        disabled={false}
                                        name='postalCode'
                                        value={values.postalCode || ''}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={errors.postalCode && touched.postalCode ? (<span className='text-danger form_label' >{errors.postalCode}</span>) : null}
                                    />
                                </div>

                                <div className="col-md-3">
                                    <SelectStatus
                                        closeMenu={true}
                                        label_name={lang.status}
                                        // placeholder='Select Status'
                                        disabled={false}
                                        name='status'
                                        defaultValue={""}
                                        onChange={(e) =>
                                            setFieldValue('status', e.value)
                                        }
                                        onBlur={handleBlur}
                                        error={errors.status && touched.status ? (<span className='text-danger form_label' >{errors.status}</span>) : null}
                                    />
                                </div>

                                <div className="text-end">
                                    <SaveButton
                                        button_name={lang.submit}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
            }

            <ToastContainer />
        </>
    )
}



