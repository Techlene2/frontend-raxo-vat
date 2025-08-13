import React, { useState, useEffect } from 'react'
import { BusinessAreaWareHouseImport } from './Imports'
const { Text, Form, useFormik, SaveButton, Email, TextArea, SingleSelect, SelectStatus, AddBusinessAreaWareHouseSchema, useNavigate, useLocation, useDispatch, useSelector, ToastContainer, toast, companyBusinessAreaListTodo, Loader, wareHouseDetailsTodo, updateWareHouseTodo, lang } = BusinessAreaWareHouseImport

export default function UpdateBusinessAreaWareHouseForm() {

    const [loading, setLoading] = useState(true)
    const [breakLoading, setBreakLoading] = useState(true)

    const { state } = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const details = useSelector(state => state && state.wareHouseDetails && state.wareHouseDetails.data)
    const company_area = useSelector(state => state && state.companyBusinessAreaList && state.companyBusinessAreaList.data)
    // console.log(details)

    const area_option = company_area && company_area.map(val => (
        { "value": val.id, "label": val.name }
    ))

    const initialValues = {

        id: details && details.id,
        businessAreaId: details && details.businessAreaId && details.businessAreaId.id,
        name: details && details.name,
        shortName: details && details.shortName,
        address: details && details.address,
        postalCode: details && details.postalCode,
        email: details && details.email,
        status: details && details.isActive,

    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: initialValues,
        validationSchema: AddBusinessAreaWareHouseSchema,
        enableReinitialize: true,

        onSubmit: (values, action) => {
            // console.log("values", values)
            dispatch(updateWareHouseTodo({ 'values': values })).then((res) => update_res(res.payload, action))
        }
    })

    const update_res = (res, action) => {
        if (res && res.status == 200) {
            toast.success(lang.ware_house + ' ' + lang.success_update, { position: "bottom-right" })
            action.resetForm()
            setTimeout(() => {
                navigate('/warehouse-list')
            }, 1500);
        } else if (res && res.status == 401) {
            localStorage.clear()
            navigate('/login')
        } else if (res && res.status == 400) {
            toast.error("400", { position: "bottom-right" })
        } else {
            toast.error(lang.wrong, { position: "bottom-right" })
        }
    }

    const ware_house_res = (res) => {
        if (res && res.status == 200) {
            dispatch(companyBusinessAreaListTodo({ 'search': '' })).then((area_res) => {

                if (area_res.payload && area_res.payload.status == 200) {
                    setLoading(false)
                    setBreakLoading(false)
                } else {
                    setBreakLoading(false)
                }
            })

        } else if (res && res.status == 401) {
            localStorage.clear()
            navigate('/login')
        } else {
            setBreakLoading(false)
        }
    }

    useEffect(() => {
        setLoading(true)
        setBreakLoading(true)
        dispatch(wareHouseDetailsTodo({ 'id': state })).then((res) => ware_house_res(res.payload))

    }, [])

    return (
        <>
            {loading && breakLoading ?
                <div className="layout">
                    <Loader />
                </div>
                :

                loading && !breakLoading ?

                    <div className='layout'>
                        <div className='text-center'>
                            <h5>Something went wrong can't able to load update form</h5>
                        </div>
                    </div>

                    :

                    !loading && !breakLoading ?
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
                                                defaultValue={area_option && area_option.find((option) => option.value == values.businessAreaId)}
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
                                                defaultValue={values.status}
                                                onChange={(e) =>
                                                    setFieldValue('status', e.value)
                                                }
                                                onBlur={handleBlur}
                                                error={errors.status && touched.status ? (<span className='text-danger form_label' >{errors.status}</span>) : null}
                                            />
                                        </div>

                                        <div className="text-end">
                                            <SaveButton
                                                button_name={lang.update}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Form>
                        : ''
            }

            <ToastContainer />
        </>
    )
}
