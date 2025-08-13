import React, { useEffect, useState } from 'react'
import { CompanyImport } from './Imports'
const { Text, Form, useFormik, SaveButton, Email, File, TextArea, SingleSelect, AddCompanySchema, useLocation, useDispatch, useSelector, cityListTodo, useNavigate, toast, ToastContainer, Loader, companyDetailsTodo, updateCompanyTodo, debounce, lang } = CompanyImport

export default function UpdateCompanyForm() {

    const [loading, setLoading] = useState(true)
    const [breakLoading, setBreakLoading] = useState(true)
    const [cityLoading, setCityLoading] = useState(false)

    const { state } = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const company_details = useSelector(state => state.companyDetails && state.companyDetails.data)
    const city_list = useSelector(state => state.cityList && state.cityList.data)
    // console.log(company_details)

    const city_option = city_list && city_list.map(val => (
        { "value": val.id, "label": val.name }
    ))

    const initialValues = {

        id: company_details && company_details.id,
        name: company_details && company_details.name,
        address: company_details && company_details.address,
        postalCode: company_details && company_details.postalCode,
        website: company_details && company_details.website,
        email: company_details && company_details.email,
        telephone: company_details && company_details.telephone,
        mobileNo: company_details && company_details.mobileNo,
        fax: company_details && company_details.fax,
        logo: company_details && company_details.logo,
        typeOfCompany: company_details && company_details.typeOfCompany,
        panNo: company_details && company_details.panNo,
        city: company_details && company_details.city && company_details.city.id

    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: initialValues,
        validationSchema: AddCompanySchema,
        enableReinitialize: true,

        onSubmit: (values, action) => {
            // console.log("values", values)
            dispatch(updateCompanyTodo({ 'values': values })).then((res) => update_res(res.payload, action))
        }
    })

    const update_res = (res, action) => {
        if (res && res.status == 200) {
            toast.success(lang.company + ' ' + lang.success_update, { position: "bottom-right" })
            action.resetForm()
            setTimeout(() => {
                navigate('/company-list')
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
            dispatch(cityListTodo({ 'search': `search=${res && res.data && res.data.city && res.data.city.name}` })).then((city_res) => {

                if (city_res.payload && city_res.payload.status == 200) {
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
        dispatch(companyDetailsTodo({ 'id': state })).then((res) => company_res(res.payload))

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
                                            <Text
                                                label_name={lang.website}
                                                placeholder=''
                                                disabled={false}
                                                name='website'
                                                value={values.website || ''}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                error={errors.website && touched.website ? (<span className='text-danger form_label' >{errors.website}</span>) : null}
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
                                                label_name={lang.telephone}
                                                placeholder=''
                                                disabled={false}
                                                name='telephone'
                                                value={values.telephone || ''}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                error={errors.telephone && touched.telephone ? (<span className='text-danger form_label' >{errors.telephone}</span>) : null}
                                            />
                                        </div>

                                        <div className="col-md-3">
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

                                        <div className="col-md-3">
                                            <Text
                                                label_name={lang.fax}
                                                placeholder=''
                                                disabled={false}
                                                name='fax'
                                                value={values.fax || ''}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                error={errors.fax && touched.fax ? (<span className='text-danger form_label' >{errors.fax}</span>) : null}
                                            />
                                        </div>

                                        <div className="col-md-3">
                                            <File
                                                label_name={lang.logo}
                                                // placeholder='Select Image'
                                                disabled={false}
                                                name='logo'
                                                onChange={(e) => setFieldValue("logo", e.currentTarget.files[0])}
                                                onBlur={handleBlur}
                                                error={errors.logo && touched.logo ? (<span className='text-danger form_label' >{errors.logo}</span>) : null}
                                            />
                                        </div>

                                        <div className="col-md-3">
                                            <Text
                                                label_name={lang.type_of_company}
                                                placeholder=''
                                                disabled={false}
                                                name='typeOfCompany'
                                                value={values.typeOfCompany || ''}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                error={errors.typeOfCompany && touched.typeOfCompany ? (<span className='text-danger form_label' >{errors.typeOfCompany}</span>) : null}
                                            />
                                        </div>

                                        <div className="col-md-3">
                                            <Text
                                                label_name={lang.pan_no}
                                                placeholder=''
                                                disabled={false}
                                                name='panNo'
                                                value={values.panNo || ''}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                error={errors.panNo && touched.panNo ? (<span className='text-danger form_label' >{errors.panNo}</span>) : null}
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
                                                defaultValue={city_option && city_option.find((option) => option.value == values.city)}
                                                onChange={(e) =>
                                                    setFieldValue('city', e.value)
                                                }
                                                onBlur={handleBlur}
                                                onInputChange={(e) => load_city(e)}
                                                loading={cityLoading}
                                                error={errors.city && touched.city ? (<span className='text-danger form_label' >{errors.city}</span>) : null}
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
