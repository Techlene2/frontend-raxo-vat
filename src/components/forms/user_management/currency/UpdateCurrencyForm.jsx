import React, { useState, useEffect } from 'react'
import { CurrencyImport } from './Imports'
const { Text, Form, SelectStatus, SingleSelect, currencyFormatter, useFormik, SaveButton, AddCurrencySchema, countryListTodo, useDispatch, useSelector, useNavigate, useLocation, toast, ToastContainer, Loader, updateCurrencyTodo, currencyDetailsTodo, lang } = CurrencyImport

export default function UpdateCurrencyForm() {

    const [loading, setLoading] = useState(true)
    const [breakLoading, setBreakLoading] = useState(true)
    const { state } = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const country_list = useSelector(state => state.countryList && state.countryList.data)
    const currency = useSelector(state => state && state.currencyDetails && state.currencyDetails.data)
    // console.log(currency)

    const country_option = country_list && country_list.map(val => (
        { "value": val.id, "label": val.name }
    ))

    const initialValues = {
        id: currency && currency.id,
        name: currency && currency.name,
        short_name: currency && currency.shortName,
        symbol: currency && currency.symbol,
        status: currency && currency.isActive,
        country: currency && currency.country && currency.country.id,
    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: initialValues,
        validationSchema: AddCurrencySchema,
        enableReinitialize: true,

        onSubmit: (values, action) => {
            // console.log(values)
            dispatch(updateCurrencyTodo({ 'values': values })).then((res) => update_res(res.payload, action))
        },
    })

    const update_res = (res, action) => {
        if (res && res.status == 200) {
            toast.success(lang.currency + ' ' + lang.success_update, { position: "bottom-right" })
            action.resetForm()
            setTimeout(() => {
                navigate('/currency-list')
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

    const currency_symbol = (input) => {
        var doc = currencyFormatter.findCurrency(input.toUpperCase())
        if (doc) {
            setFieldValue('short_name', doc.code)
            setFieldValue('symbol', doc.symbol)
        } else {
            setFieldValue('symbol', '')
        }
    }

    const currency_res = (res) => {
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
        dispatch(currencyDetailsTodo({ 'id': state })).then((res) => currency_res(res.payload))
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
                                                name='short_name'
                                                value={values.short_name || ''}
                                                onChange={(e) => { handleChange(e); currency_symbol(e.target.value) }}
                                                onBlur={handleBlur}
                                                error={errors.short_name && touched.short_name ? (<span className='text-danger form_label' >{errors.short_name}</span>) : null}
                                            />
                                        </div>

                                        <div className="col-md-3">
                                            <Text
                                                label_name={lang.symbol}
                                                placeholder=''
                                                disabled={true}
                                                name='symbol'
                                                value={values.symbol || ''}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                error={errors.symbol && touched.symbol ? (<span className='text-danger form_label' >{errors.symbol}</span>) : null}
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
