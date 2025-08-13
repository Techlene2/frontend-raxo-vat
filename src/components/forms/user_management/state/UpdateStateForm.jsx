import React, { useState, useEffect } from 'react'
import { StateImport } from './Imports'
const { Text, Form, SelectStatus, useFormik, SaveButton, AddStateSchema, SingleSelect, updateStateTodo, stateDetailsTodo, countryListTodo, useDispatch, useSelector, useLocation, useNavigate, Loader, toast, ToastContainer, lang } = StateImport

export default function UpdateStateForm() {

    const [loading, setLoading] = useState(true)
    const [breakLoading, setBreakLoading] = useState(true)
    const { state } = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const country_list = useSelector(state => state.countryList && state.countryList.data)
    const stateData = useSelector(state => state && state.stateDetails && state.stateDetails.data)

    const country_option = country_list && country_list.map(val => (
        { "value": val.id, "label": val.name }
    ))

    const initialValues = {
        id: stateData && stateData.id,
        country: stateData && stateData.country && stateData.country.id,
        stateName: stateData && stateData.name,
        status: stateData && stateData.active,
    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: initialValues,
        validationSchema: AddStateSchema,
        enableReinitialize: true,

        onSubmit: (values, action) => {
            // console.log(values)
            dispatch(updateStateTodo({ 'values': values })).then((res) => update_res(res.payload, action))
        },
    })

    const update_res = (res, action) => {
        if (res && res.status == 200) {
            toast.success(lang.state + ' ' + lang.success_update, { position: "bottom-right" })
            action.resetForm()
            setTimeout(() => {
                navigate('/state-list')
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

    const state_res = (res) => {
        if (res && res.status == 200) {
            dispatch(countryListTodo({ 'search': '' })).then((country_res) => {
                if (country_res.payload && country_res.payload.status == 200) {
                    setLoading(false)
                    setBreakLoading(false)
                }
                else {
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
        dispatch(stateDetailsTodo({ 'id': state })).then((res) => state_res(res.payload))
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
                                                onChange={(e) =>
                                                    setFieldValue('country', e.value)
                                                }
                                                onBlur={handleBlur}
                                                error={errors.country && touched.country ? (<span className='text-danger form_label' >{errors.country}</span>) : null}
                                            />
                                        </div>

                                        <div className="col-md-3">
                                            <Text
                                                label_name={lang.name}
                                                placeholder=''
                                                disabled={false}
                                                name='stateName'
                                                value={values.stateName || ''}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                error={errors.stateName && touched.stateName ? (<span className='text-danger form_label' >{errors.stateName}</span>) : null}
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
