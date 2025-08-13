import React, { useState } from 'react'
import { CompanyImport } from './Imports'
const { Text, Form, useFormik, SaveButton, Email, File, TextArea, SingleSelect, AddCompanySchema, useDispatch, useSelector, cityListTodo, useNavigate, toast, ToastContainer, addCompanyTodo, debounce, lang } = CompanyImport

export default function AddCompanyForm() {

    const [cityLoading, setCityLoading] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const city = useSelector(state => state.cityList && state.cityList.data)
    // console.log(city)

    const city_option = city && city.map(val => (
        { "value": val.id, "label": val.name }
    ))

    const initialValues = {

        name: "",
        address: "",
        postalCode: "",
        website: "",
        email: "",
        telephone: "",
        mobileNo: "",
        fax: "",
        logo: "",
        typeOfCompany: "",
        panNo: "",
        city: ""

    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: initialValues,
        validationSchema: AddCompanySchema,

        onSubmit: (values, action) => {
            // console.log("values",values)
            dispatch(addCompanyTodo({ 'values': values })).then((res) => add_res(res.payload, action))
        }
    })

    const add_res = (res, action) => {
        if (res && res.status == 201) {
            toast.success(lang.company + ' ' + lang.success_add, { position: "bottom-right" })
            action.resetForm()
            setTimeout(() => {
                navigate('/company-list')
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
                                    placeholder=''
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
