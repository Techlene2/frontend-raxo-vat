import React, { useEffect, useRef, useState } from 'react'
import { CityImport } from './Imports'
const { Text, Form, SelectStatus, useFormik, SaveButton, SingleSelect, AddCitySchema, statebyCountryTodo, countryListTodo, useDispatch, useSelector, useNavigate, Loader, toast, ToastContainer, addCityTodo, lang } = CityImport

export default function AddCityForm() {

    const [loading, setLoading] = useState(false)
    const [stateLoading, setStateLoading] = useState(false)

    const stateRef = useRef()

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const country = useSelector(state => state.countryList && state.countryList.data)
    const state = useSelector(state => state.statebyCountry && state.statebyCountry.data)

    const country_option = country && country.map(val => (
        { "value": val.id, "label": val.name }
    ))

    const state_option = state && state.map(val => (
        { "value": val.id, "label": val.name }
    ))

    const initialValues = {
        country: "",
        state: "",
        cityName: "",
        status: ""
    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: initialValues,
        validationSchema: AddCitySchema,

        onSubmit: (values, action) => {
            // console.log(values)
            dispatch(addCityTodo({ 'values': values })).then((res) => add_res(res.payload, action))
        },
    })

    const add_res = (res, action) => {
        if (res && res.status == 201) {
            toast.success(lang.city + ' ' + lang.success_add, { position: "bottom-right" })
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

    const country_res = (res) => {
        if (res && res.status == 200) {
            setLoading(false)
        } else {
            setLoading(false)
        }
    }

    useEffect(() => {
        setLoading(true)
        dispatch(countryListTodo({ 'search': '' })).then((res) => country_res(res.payload))
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
                                        label_name={lang.country}
                                        // placeholder='Select Country'
                                        disabled={false}
                                        option={country_option ? country_option : []}
                                        name='country'
                                        defaultValue={""}
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
                                        defaultValue={""}
                                        onChange={(e) =>
                                            setFieldValue('state', e.value)
                                        }
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
                </Form>}
            <ToastContainer />
        </>
    )
}
