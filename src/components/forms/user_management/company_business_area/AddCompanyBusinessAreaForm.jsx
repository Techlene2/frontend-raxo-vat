import React, { useEffect, useState } from 'react'
import { CompanyBusinessAreaImport } from './Imports'
const { Text, Form, useFormik, SaveButton, Email, TextArea, SingleSelect, SelectStatus, AddCompanyBusinessAreaSchema, useNavigate, useDispatch, useSelector, companyListTodo, cityListTodo, Loader, addCompanyBusinessAreaTodo, ToastContainer, toast, debounce, lang } = CompanyBusinessAreaImport

export default function AddCompanyBusinessAreaForm() {

    const [loading, setLoading] = useState(false)
    const [cityLoading, setCityLoading] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const company = useSelector(state => state && state.companyList && state.companyList.data)
    const city = useSelector(state => state.cityList && state.cityList.data)
    // console.log(company)

    const company_option = company && company.map(val => (
        { "value": val.id, "label": val.name }
    ))

    const city_option = city && city.map(val => (
        { "value": val.id, "label": val.name }
    ))

    const initialValues = {

        company: '',
        name: "",
        description: '',
        address: "",
        code: '',
        postalCode: "",
        email: '',
        phone: '',
        mobile: '',
        city: '',
        status: '',

    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: initialValues,
        validationSchema: AddCompanyBusinessAreaSchema,

        onSubmit: (values, action) => {
            // console.log("values", values)
            dispatch(addCompanyBusinessAreaTodo({ 'values': values })).then((res) => add_res(res.payload, action))
        }
    })

    const add_res = (res, action) => {
        if (res && res.status == 201) {
            toast.success(lang.bussiness_area + ' ' + lang.success_add, { position: "bottom-right" })
            action.resetForm()
            setTimeout(() => {
                navigate('/company-area-list')
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

    const company_res = (res) => {
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
        dispatch(companyListTodo({ 'search': '' })).then((res) => company_res(res.payload))
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
                                        label_name={lang.company}
                                        // placeholder='Select Comapny'
                                        disabled={false}
                                        option={company_option ? company_option : []}
                                        name='company'
                                        defaultValue={""}
                                        onChange={(e) =>
                                            setFieldValue('company', e.value)
                                        }
                                        onBlur={handleBlur}
                                        error={errors.company && touched.company ? (<span className='text-danger form_label' >{errors.company}</span>) : null}
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
                                    <TextArea
                                        label_name={lang.description}
                                        placeholder=''
                                        disabled={false}
                                        rows={1}
                                        name='description'
                                        value={values.description || ''}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={errors.description && touched.description ? (<span className='text-danger form_label' >{errors.description}</span>) : null}
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
                                        label_name={lang.code}
                                        placeholder=''
                                        disabled={false}
                                        name='code'
                                        value={values.code || ''}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={errors.code && touched.code ? (<span className='text-danger form_label' >{errors.code}</span>) : null}
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
                                        label_name={lang.phone}
                                        placeholder=''
                                        disabled={false}
                                        name='phone'
                                        value={values.phone || ''}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={errors.phone && touched.phone ? (<span className='text-danger form_label' >{errors.phone}</span>) : null}
                                    />
                                </div>

                                <div className="col-md-3">
                                    <Text
                                        label_name={lang.mobile_no}
                                        placeholder=''
                                        disabled={false}
                                        name='mobile'
                                        value={values.mobile || ''}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={errors.mobile && touched.mobile ? (<span className='text-danger form_label' >{errors.mobile}</span>) : null}
                                    />
                                </div>

                                <div className="col-md-3">
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
