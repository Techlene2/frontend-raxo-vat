import React, { useEffect, useState } from 'react'
import { DriverImport } from './Imports'
const { Text, TextArea, Form, useFormik, SaveButton, AddDriverSchema, updateDriverTodo, driverDetailsTodo, Loader, useLocation, useSelector, useDispatch, useNavigate, DatePicker, Number, toast, ToastContainer, SingleSelect, moment, lang } = DriverImport

export default function UpdateDriverForm() {

    const [loading, setLoading] = useState(true)
    const [breakLoading, setBreakLoading] = useState(true)

    const { state } = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const driver = useSelector(state => state && state.driverDetails && state.driverDetails.data)
    // console.log(driver)

    const initialValues = {
        id: driver && driver.id,
        name: driver && driver.name,
        date_of_birth: driver && driver.dateOfBirth,
        gender: driver && driver.gender,
        contact: driver && driver.contactInfo,
        address: driver && driver.address,
        license_number: driver && driver.licenseNumber,
        license_expiry_date: driver && driver.licenseExpiryDate,
    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: initialValues,
        validationSchema: AddDriverSchema,
        enableReinitialize: true,

        onSubmit: (values, action) => {
            // console.log(values)
            dispatch(updateDriverTodo({ 'values': values })).then((res) => update_res(res.payload, action))
        },
    })

    const update_res = (res, action) => {
        if (res && res.status == 200) {
            toast.success(lang.driver + ' ' + lang.success_update, { position: "bottom-right" })
            setTimeout(() => {
                navigate('/driver-list')
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

    const gender = [
        { "value": 'male', "label": 'Male' },
        { "value": 'female', "label": 'Female' },
        { "value": 'other', "label": 'Other' },
    ]

    const driver_res = (res, action) => {
        if (res && res.status == 200) {
            setLoading(false)
            setBreakLoading(false)
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
        dispatch(driverDetailsTodo({ 'id': state })).then((res) => driver_res(res.payload))
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
                                            <DatePicker
                                                label_name={lang.date_of_birth}
                                                placeholder='Choose Date'
                                                option={{
                                                    altInput: true,
                                                    altFormat: "F j, Y",
                                                    dateFormat: 'Y-m-d', // Customize date format as needed
                                                    minDate: '', // Before dates disabled
                                                    maxDate: '', // After dates disabled
                                                    disable: [], // Disable particular date ranges
                                                    mode: "single", //multiple-single-range
                                                    defaultDate: [], //comma separated multiple dates
                                                    conjunction: "", // Multiple dates seperation
                                                }}
                                                name='date_of_birth'
                                                value={values.date_of_birth || ''}
                                                onChange={(e) => {
                                                    setFieldValue('date_of_birth', moment(e[0]).format("YYYY-MM-DDTHH:mm:ss[Z]"))
                                                }}
                                                onBlur={handleBlur}
                                                error={errors.date_of_birth && touched.date_of_birth ? (<span className='text-danger form_label' >{errors.date_of_birth}</span>) : null}
                                            />
                                        </div>

                                        <div className="col-md-3">
                                            <SingleSelect
                                                closeMenu={true}
                                                label_name={lang.gender}
                                                // placeholder=''
                                                disabled={false}
                                                option={gender ? gender : []}
                                                name='gender'
                                                defaultValue={gender && gender.find((option) => option.value == values.gender)}
                                                onChange={(e) => {
                                                    setFieldValue('gender', e.value);
                                                }}
                                                onBlur={handleBlur}
                                                error={errors.gender && touched.gender ? (<span className='text-danger form_label' >{errors.gender}</span>) : null}
                                            />
                                        </div>

                                        <div className="col-md-3">
                                            <Number
                                                label_name={lang.contact}
                                                placeholder=''
                                                disabled={false}
                                                name='contact'
                                                value={values.contact || ''}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                error={errors.contact && touched.contact ? (<span className='text-danger form_label' >{errors.contact}</span>) : null}
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
                                            <Text
                                                label_name={lang.license_number}
                                                placeholder=''
                                                disabled={false}
                                                name='license_number'
                                                value={values.license_number || ''}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                error={errors.license_number && touched.license_number ? (<span className='text-danger form_label' >{errors.license_number}</span>) : null}
                                            />
                                        </div>

                                        <div className="col-md-3">
                                            <DatePicker
                                                label_name={lang.license_expiry_date}
                                                placeholder='Choose Date'
                                                option={{
                                                    altInput: true,
                                                    altFormat: "F j, Y",
                                                    dateFormat: 'Y-m-d', // Customize date format as needed
                                                    minDate: '', // Before dates disabled
                                                    maxDate: '', // After dates disabled
                                                    disable: [], // Disable particular date ranges
                                                    mode: "single", //multiple-single-range
                                                    defaultDate: [], //comma separated multiple dates
                                                    conjunction: "", // Multiple dates seperation
                                                }}
                                                name='license_expiry_date'
                                                value={values.license_expiry_date || ''}
                                                onChange={(e) => {
                                                    setFieldValue('license_expiry_date', moment(e[0]).format("YYYY-MM-DDTHH:mm:ss[Z]"))
                                                }}
                                                onBlur={handleBlur}
                                                error={errors.license_expiry_date && touched.license_expiry_date ? (<span className='text-danger form_label' >{errors.license_expiry_date}</span>) : null}
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
