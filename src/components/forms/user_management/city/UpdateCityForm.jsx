import React, { useEffect, useRef, useState } from 'react'
import { CityImport } from './Imports'
const { Text, Form, SelectStatus, useFormik, SaveButton, SingleSelect, AddCitySchema, statebyCountryTodo, countryListTodo, useLocation, useDispatch, useSelector, useNavigate, Loader, toast, ToastContainer, updateCityTodo, cityDetailsTodo, lang } = CityImport

export default function UpdateCityForm() {

    const [loading, setLoading] = useState(true)
    const [breakLoading, setBreakLoading] = useState(true)
    const [stateLoading, setStateLoading] = useState(false)

    const stateRef = useRef()

    const { state } = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const city = useSelector(state => state && state.cityDetails && state.cityDetails.data)
    const country_list = useSelector(state => state.countryList && state.countryList.data)
    const state_list = useSelector(state => state.statebyCountry && state.statebyCountry.data)

    const country_option = country_list && country_list.map(val => (
        { "value": val.id, "label": val.name }
    ))

    const state_option = state_list && state_list.map(val => (
        { "value": val.id, "label": val.name }
    ))

    const initialValues = {
        id: city && city.id,
        country: city && city.state && city.state.country && city.state.country.id,
        state: city && city.state && city.state.id,
        cityName: city && city.name,
        status: city && city.isActive
    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: initialValues,
        validationSchema: AddCitySchema,
        enableReinitialize: true,

        onSubmit: (values, action) => {
            // console.log(values)
            dispatch(updateCityTodo({ 'values': values })).then((res) => update_res(res.payload, action))
        },
    })

    const update_res = (res, action) => {
        if (res && res.status == 200) {
            toast.success(lang.city + ' ' + lang.success_update, { position: "bottom-right" })
            action.resetForm()
            setTimeout(() => {
                navigate('/city-list')
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

    const load_state = (id) => {
        setStateLoading(true)
        dispatch(statebyCountryTodo(id)).then((res) => state_res(res.payload))
        stateRef.current.setValue([])
    }

    const state_res = (res) => {
        if (res && res.status == 200) {
            setStateLoading(false)
        } else {
            setStateLoading(false)
        }
    }

    const city_res = (res) => {
        if (res && res.status == 200) {
            dispatch(countryListTodo({ 'search': '' })).then((country_res) => {

                if (country_res.payload && country_res.payload.status == 200) {
                    dispatch(statebyCountryTodo(res.data && res.data && res.data.state && res.data.state.country && res.data.state.country.id)).then((state_res) => {

                        if (state_res.payload && state_res.payload.status == 200) {
                            setLoading(false)
                            setBreakLoading(false)
                        }
                        else {
                            setBreakLoading(false)
                        }
                    })

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
        dispatch(cityDetailsTodo({ 'id': state })).then((res) => city_res(res.payload))

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
                                                label_name={lang.country}
                                                // placeholder='Select Country'
                                                disabled={false}
                                                option={country_option ? country_option : []}
                                                name='country'
                                                defaultValue={country_option && country_option.find((option) => option.value == values.country)}
                                                onChange={(e) => {
                                                    load_state(e.value);
                                                    setFieldValue('country', e.value);
                                                    setFieldValue('state', '');
                                                }
                                                }
                                                onBlur={handleBlur}
                                                error={errors.country && touched.country ? (<span className='text-danger form_label' >{errors.country}</span>) : null}
                                            />
                                        </div>

                                        <div className="col-md-3">
                                            <SingleSelect
                                                reference={stateRef}
                                                closeMenu={true}
                                                label_name={lang.state}
                                                // placeholder='Select State'
                                                disabled={false}
                                                option={state_option ? state_option : []}
                                                name='state'
                                                defaultValue={state_option && state_option.find((option) => option.value == values.state)}
                                                onChange={(e) => {
                                                    setFieldValue('state', e.value);
                                                }}
                                                onBlur={handleBlur}
                                                loading={stateLoading}
                                                error={errors.state && touched.state ? (<span className='text-danger form_label' >{errors.state}</span>) : null}
                                            />
                                        </div>

                                        <div className="col-md-3">
                                            <Text
                                                label_name={lang.name}
                                                placeholder=''
                                                disabled={false}
                                                name='cityName'
                                                value={values.cityName || ''}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                error={errors.cityName && touched.cityName ? (<span className='text-danger form_label' >{errors.cityName}</span>) : null}
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
