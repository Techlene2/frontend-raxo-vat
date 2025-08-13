import React, { useState, useEffect } from 'react'
import { CurrencyImport } from './Imports'
const { Text, Form, SelectStatus, SingleSelect, currencyFormatter, useFormik, SaveButton, AddCurrencySchema, countryListTodo, useDispatch, useSelector, useNavigate, toast, ToastContainer, Loader, addCurrencyTodo, lang } = CurrencyImport

export default function AddCurrencyForm() {

    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const country = useSelector(state => state && state.countryList && state.countryList.data)

    const country_option = country && country.map(val => (
        { "value": val.id, "label": val.name }
    ))

    const initialValues = {
        name: "",
        short_name: "",
        symbol: "",
        status: "",
        country: "",
    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: initialValues,
        validationSchema: AddCurrencySchema,
        enableReinitialize: true,

        onSubmit: (values, action) => {
            // console.log(values)
            dispatch(addCurrencyTodo({ 'values': values })).then((res) => add_res(res.payload, action))
        },
    })

    const add_res = (res, action) => {
        if (res && res.status == 201) {
            toast.success(lang.currency + ' ' + lang.success_add, { position: "bottom-right" })
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