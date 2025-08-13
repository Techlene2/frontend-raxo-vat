import React, { useState } from 'react'
import { EmployeeImport } from './Imports'
const { Text, File, Email, Form, SelectStatus, useDispatch, useSelector, useNavigate, toast, ToastContainer, useFormik, SaveButton, addEmployeeTodo, AddEmployeeSchema, cityListTodo, TextArea, SingleSelect, DatePicker, moment, debounce, lang } = EmployeeImport

export default function AddEmployeeForm() {

    const [cityLoading, setCityLoading] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const city = useSelector(state => state.cityList && state.cityList.data)

    const city_option = city && city.map(val => (
        { "value": val.id, "label": val.name }
    ))

    const gender_option = [
        { "value": "male", "label": "Male" },
        { "value": "female", "label": "Female" },
        { "value": "others", "label": "Others" }
    ]

    const user_type_option = [
        // { "value": "User", "label": "User" },
        { "value": "Employee", "label": "Employee" },
        { "value": "Driver", "label": "Driver" },
        { "value": "Attender", "label": "Attender" },
    ]

    const initialValues = {
        user_type: "Employee",
        firstName: "",
        lastName: "",
        dob: "",
        gender: "",
        email: "",
        fatherName: "",
        motherName: "",
        mobileNo: "",
        status: "",
        profile: "",
        isUser: false,

        city: "",
        postalCode: "",
        phoneNo: "",
        address: "",

        license_no: "",
        license_expiry: "",
        passport_no: "",
        passport_expiry: "",
        visa_no: "",
        visa_issue: "",
        visa_expiry: "",

    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: initialValues,
        validationSchema: AddEmployeeSchema,
        enableReinitialize: true,

        onSubmit: (values, action) => {
            // console.log(values)
            dispatch(addEmployeeTodo({ 'values': values })).then((res) => add_res(res.payload, action))
        },
    })

    const add_res = (res, action) => {
        if (res && res.status == 201) {
            toast.success(lang.employee + ' ' + lang.success_add, { position: "bottom-right" })
            action.resetForm()
            setTimeout(() => {
                navigate('/employee-list')
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

    const city_res = (res) => {
        if (res && res.status == 200) {
            setCityLoading(false)
        } else {
            setCityLoading(false)
        }
    }

    const load_city = debounce((e) => {
        if (e) {
            setCityLoading(true)
            dispatch(cityListTodo({ 'search': `search=${e}` })).then((res) => city_res(res.payload))
        }
    }, 500)

    return (
        <>
            <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                <div className="layout">
                    <div className='container-fluid'>
                        <div className="row">

                            <h6>{lang.basic + ' ' + lang.info}</h6>

                            <div className="col-md-2">
                                <SingleSelect
                                    closeMenu={true}
                                    label_name={lang.user_type}
                                    // placeholder='Select Gender'
                                    disabled={false}
                                    option={user_type_option ? user_type_option : []}
                                    name='user_type'
                                    defaultValue={user_type_option && user_type_option.find((option) => option.value == values.user_type)}
                                    onChange={(e) =>
                                        setFieldValue('user_type', e.value)
                                    }
                                    onBlur={handleBlur}
                                    error={errors.user_type && touched.user_type ? (<span className='text-danger form_label' >{errors.user_type}</span>) : null}
                                />
                            </div>

                            <div className="col-md-2">
                                <Text
                                    label_name={lang.first_name}
                                    placeholder=''
                                    disabled={false}
                                    name='firstName'
                                    value={values.firstName || ''}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.firstName && touched.firstName ? (<span className='text-danger form_label' >{errors.firstName}</span>) : null}
                                />
                            </div>

                            <div className="col-md-2">
                                <Text
                                    label_name={lang.last_name}
                                    placeholder=''
                                    disabled={false}
                                    name='lastName'
                                    value={values.lastName || ''}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.lastName && touched.lastName ? (<span className='text-danger form_label' >{errors.lastName}</span>) : null}
                                />
                            </div>

                            <div className="col-md-2">
                                <DatePicker
                                    label_name={lang.dob}
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
                                    name='dob'
                                    value={values.dob || ''}
                                    onChange={(e) => {
                                        if (e && e.length) {
                                            setFieldValue('dob', moment(e[0]).format("YYYY-MM-DDTHH:mm:ss[Z]"))
                                        } else {
                                            setFieldValue('dob', '')
                                        }
                                    }}
                                    onBlur={handleBlur}
                                    error={errors.dob && touched.dob ? (<span className='text-danger form_label' >{errors.dob}</span>) : null}
                                />
                            </div>

                            <div className="col-md-2">
                                <SingleSelect
                                    closeMenu={true}
                                    label_name={lang.gender}
                                    // placeholder='Select Gender'
                                    disabled={false}
                                    option={gender_option ? gender_option : []}
                                    name='gender'
                                    defaultValue={""}
                                    onChange={(e) =>
                                        setFieldValue('gender', e.value)
                                    }
                                    onBlur={handleBlur}
                                    error={errors.gender && touched.gender ? (<span className='text-danger form_label' >{errors.gender}</span>) : null}
                                />
                            </div>

                            <div className="col-md-2">
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

                            <div className="col-md-2">
                                <Text
                                    label_name={lang.father_name}
                                    placeholder=''
                                    disabled={false}
                                    name='fatherName'
                                    value={values.fatherName || ''}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.fatherName && touched.fatherName ? (<span className='text-danger form_label' >{errors.fatherName}</span>) : null}
                                />
                            </div>

                            <div className="col-md-2">
                                <Text
                                    label_name={lang.mother_name}
                                    placeholder=''
                                    disabled={false}
                                    name='motherName'
                                    value={values.motherName || ''}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.motherName && touched.motherName ? (<span className='text-danger form_label' >{errors.motherName}</span>) : null}
                                />
                            </div>

                            <div className="col-md-2">
                                <Text
                                    label_name={lang.mobile_no}
                                    placeholder=''
                                    disabled={false}
                                    name='mobileNo'
                                    value={values.mobileNo || ''}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.mobileNo && touched.mobileNo ? (<span className='text-danger form_label' >{errors.mobileNo}</span>) : null}
                                />
                            </div>

                            <div className="col-md-2">
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

                            <div className="col-md-3">
                                <File
                                    label_name={lang.profile}
                                    disabled={false}
                                    name='profile'
                                    onChange={(e) => setFieldValue("profile", e.currentTarget.files[0])}
                                    onBlur={handleBlur}
                                    error={errors.profile && touched.profile ? (<span className='text-danger form_label' >{errors.profile}</span>) : null}
                                />
                            </div>

                            <div className="col-md-1">
                                <Form.Check
                                    type="switch"
                                    label={lang.isUser}
                                    className='form_check mt-4'
                                    name='isUser'
                                    checked={values.isUser || null}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.isUser && touched.isUser ? (<span className='text-danger form_label' >{errors.isUser}</span>) : null}
                            </div>

                        </div>
                    </div>
                </div>

                <div className="layout">
                    <div className='container-fluid'>
                        <div className="row">

                            <h6>{lang.address + ' ' + lang.info}</h6>

                            <div className="col-md-2">
                                <SingleSelect
                                    closeMenu={true}
                                    label_name={lang.city}
                                    // placeholder='Select City'
                                    disabled={false}
                                    option={city_option ? city_option : []}
                                    name='city'
                                    defaultValue={""}
                                    onChange={(e) =>
                                        setFieldValue('city', e.value)
                                    }
                                    onBlur={handleBlur}
                                    onInputChange={(e) => load_city(e)}
                                    loading={cityLoading}
                                    error={errors.city && touched.city ? (<span className='text-danger form_label' >{errors.city}</span>) : null}
                                />
                            </div>

                            <div className="col-md-2">
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

                            <div className="col-md-2">
                                <Text
                                    label_name={lang.phone_no}
                                    placeholder=''
                                    disabled={false}
                                    name='phoneNo'
                                    value={values.phoneNo || ''}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.phoneNo && touched.phoneNo ? (<span className='text-danger form_label' >{errors.phoneNo}</span>) : null}
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

                        </div>
                    </div>
                </div>

                <div className="layout">
                    <div className='container-fluid'>
                        <div className="row">

                            <h6>{lang.driver + ' ' + lang.info}</h6>

                            <div className="col">
                                <Text
                                    label_name={lang.license_no}
                                    placeholder=''
                                    disabled={false}
                                    name='license_no'
                                    value={values.license_no || ''}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.license_no && touched.license_no ? (<span className='text-danger form_label' >{errors.license_no}</span>) : null}
                                />
                            </div>

                            <div className="col">
                                <DatePicker
                                    label_name={lang.license_expiry}
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
                                    name='license_expiry'
                                    value={values.license_expiry || ''}
                                    onChange={(e) => {
                                        if (e && e.length) {
                                            setFieldValue('license_expiry', moment(e[0]).format("YYYY-MM-DDTHH:mm:ss[Z]"))
                                        } else {
                                            setFieldValue('license_expiry', '')
                                        }
                                    }}
                                    onBlur={handleBlur}
                                    error={errors.license_expiry && touched.license_expiry ? (<span className='text-danger form_label' >{errors.license_expiry}</span>) : null}
                                />
                            </div>

                            <div className="col">
                                <Text
                                    label_name={lang.passport_no}
                                    placeholder=''
                                    disabled={false}
                                    name='passport_no'
                                    value={values.passport_no || ''}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.passport_no && touched.passport_no ? (<span className='text-danger form_label' >{errors.passport_no}</span>) : null}
                                />
                            </div>

                            <div className="col">
                                <DatePicker
                                    label_name={lang.passport_expiry}
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
                                    name='passport_expiry'
                                    value={values.passport_expiry || ''}
                                    onChange={(e) => {
                                        if (e && e.length) {
                                            setFieldValue('passport_expiry', moment(e[0]).format("YYYY-MM-DDTHH:mm:ss[Z]"))
                                        } else {
                                            setFieldValue('passport_expiry', '')
                                        }
                                    }}
                                    onBlur={handleBlur}
                                    error={errors.passport_expiry && touched.passport_expiry ? (<span className='text-danger form_label' >{errors.passport_expiry}</span>) : null}
                                />
                            </div>

                            <div className="col">
                                <Text
                                    label_name={lang.visa_no}
                                    placeholder=''
                                    disabled={false}
                                    name='visa_no'
                                    value={values.visa_no || ''}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.visa_no && touched.visa_no ? (<span className='text-danger form_label' >{errors.visa_no}</span>) : null}
                                />
                            </div>

                            <div className="col">
                                <DatePicker
                                    label_name={lang.visa_issue}
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
                                    name='visa_issue'
                                    value={values.visa_issue || ''}
                                    onChange={(e) => {
                                        if (e && e.length) {
                                            setFieldValue('visa_issue', moment(e[0]).format("YYYY-MM-DDTHH:mm:ss[Z]"))
                                        } else {
                                            setFieldValue('visa_issue', '')
                                        }
                                    }}
                                    onBlur={handleBlur}
                                    error={errors.visa_issue && touched.visa_issue ? (<span className='text-danger form_label' >{errors.visa_issue}</span>) : null}
                                />
                            </div>

                            <div className="col">
                                <DatePicker
                                    label_name={lang.visa_expiry}
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
                                    name='visa_expiry'
                                    value={values.visa_expiry || ''}
                                    onChange={(e) => {
                                        if (e && e.length) {
                                            setFieldValue('visa_expiry', moment(e[0]).format("YYYY-MM-DDTHH:mm:ss[Z]"))
                                        } else {
                                            setFieldValue('visa_expiry', '')
                                        }
                                    }}
                                    onBlur={handleBlur}
                                    error={errors.visa_expiry && touched.visa_expiry ? (<span className='text-danger form_label' >{errors.visa_expiry}</span>) : null}
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

            <ToastContainer />
        </>
    )
}
