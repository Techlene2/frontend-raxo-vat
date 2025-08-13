import React, { useEffect, useState } from 'react'
import { VendorImport } from './Imports'
const { Text, Form, SelectStatus, useFormik, SaveButton, AddVendorSchema, TextArea, vendorDetailsTodo, useDispatch, useSelector, useLocation, useNavigate, Loader, cityListTodo, SingleSelect, updateVendorTodo, ToastContainer, toast, debounce, lang } = VendorImport

export default function UpdateVendorForm() {

    const [loading, setLoading] = useState(true)
    const [breakLoading, setBreakLoading] = useState(true)
    const [cityLoading, setCityLoading] = useState(false)

    const { state } = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const details = useSelector(state => state && state.vendorDetails && state.vendorDetails.data)
    const city_list = useSelector(state => state.cityList && state.cityList.data)
    // console.log(details)

    const city_option = city_list && city_list.map(val => (
        { "value": val.id, "label": val.name }
    ))

    const initialValues = {
        id: details && details.id,
        name: details && details.name,
        address: details && details.address,
        postalCode: details && details.postalCode,
        panNo: details && details.panNo,
        tinNo: details && details.tinNo,
        longitude: details && details.longitude,
        latitude: details && details.lattitude,
        sourceApp: details && details.sourceApp,
        city: details && details.city && details.city.id,
        status: details && details.isActive
    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: initialValues,
        validationSchema: AddVendorSchema,
        enableReinitialize: true,

        onSubmit: (values, action) => {
            // console.log(values)
            dispatch(updateVendorTodo({ 'values': values })).then((res) => update_res(res.payload, action))
        },
    })

    const update_res = (res, action) => {
        if (res && res.status == 200) {
            toast.success(lang.vendor + ' ' + lang.success_update, { position: "bottom-right" })
            action.resetForm()
            setTimeout(() => {
                navigate('/vendor-list')
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

    const details_res = (res) => {
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
        dispatch(vendorDetailsTodo({ 'id': state })).then((res) => details_res(res.payload))
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
                                                name='address'
                                                rows={1}
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
                                            <Text
                                                label_name={lang.tin_no}
                                                placeholder=''
                                                disabled={false}
                                                name='tinNo'
                                                value={values.tinNo || ''}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                error={errors.tinNo && touched.tinNo ? (<span className='text-danger form_label' >{errors.tinNo}</span>) : null}
                                            />
                                        </div>

                                        <div className="col-md-3">
                                            <Text
                                                label_name={lang.longitude}
                                                placeholder=''
                                                disabled={false}
                                                name='longitude'
                                                value={values.longitude || ""}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                error={errors.longitude && touched.longitude ? (<span className='text-danger form_label' >{errors.longitude}</span>) : null}
                                            />
                                        </div>

                                        <div className="col-md-3">
                                            <Text
                                                label_name={lang.latitude}
                                                placeholder=''
                                                disabled={false}
                                                name='latitude'
                                                value={values.latitude || ''}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                error={errors.latitude && touched.latitude ? (<span className='text-danger form_label' >{errors.latitude}</span>) : null}
                                            />
                                        </div>

                                        <div className="col-md-3">
                                            <Text
                                                label_name={lang.source}
                                                placeholder=''
                                                disabled={false}
                                                name='sourceApp'
                                                value={values.sourceApp || ''}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                error={errors.sourceApp && touched.sourceApp ? (<span className='text-danger form_label' >{errors.sourceApp}</span>) : null}
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
