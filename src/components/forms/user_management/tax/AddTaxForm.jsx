import React, { useEffect, useState } from 'react'
import { TaxImport } from './Imports'
const { Form, Text, TextArea, SaveButton, useFormik, TaxSchema, SingleSelect, useNavigate, useDispatch, useSelector, taxTypeListTodo, Loader, addTaxTodo, ToastContainer, toast, lang } = TaxImport

export default function AddTaxForm() {

    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const tax_type = useSelector(state => state.taxTypeList && state.taxTypeList.data)
    // console.log(tax_type)

    const type_option = tax_type && tax_type.map(val => (
        { "value": val.id, "label": val.name }
    ))

    const initialValues = {
        name: '',
        description: '',
        rate: '',
        source: '',
        taxtype: '',
    };

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: initialValues,
        validationSchema: TaxSchema,
        onSubmit: (values, action) => {
            // console.log(values)
            dispatch(addTaxTodo({ 'values': values })).then((res) => add_res(res.payload, action))
        },
    })

    const add_res = (res, action) => {
        if (res && res.status == 201) {
            toast.success(lang.tax + ' ' + lang.success_add, { position: "bottom-right" })
            action.resetForm()
            setTimeout(() => {
                navigate('/tax-list')
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

    const tax_type_res = (res) => {
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
        dispatch(taxTypeListTodo({ 'search': '' })).then((res) => tax_type_res(res.payload))
    }, [])

    return (
        <>
            {loading ?
                <div className="layout">
                    <Loader />
                </div>

                :

                <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                    <div className='layout'>
                        <div className='container-fluid'>
                            <div className='row'>

                                <div className='col-md-3'>
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

                                <div className='col-md-3'>
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

                                <div className='col-md-3'>
                                    <Text
                                        label_name={lang.rate}
                                        placeholder=''
                                        disabled={false}
                                        name='rate'
                                        value={values.rate || ''}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={errors.rate && touched.rate ? (<span className='text-danger form_label' >{errors.rate}</span>) : null}
                                    />

                                </div>

                                <div className='col-md-3'>
                                    <Text
                                        label_name={lang.source}
                                        placeholder=''
                                        disabled={false}
                                        name='source'
                                        value={values.source || ''}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={errors.source && touched.source ? (<span className='text-danger form_label' >{errors.source}</span>) : null}
                                    />
                                </div>

                                <div className='col-md-3'>
                                    <SingleSelect
                                        closeMenu={true}
                                        label_name={lang.tax_type}
                                        // placeholder='Select Tax Type'
                                        disabled={false}
                                        option={type_option ? type_option : []}
                                        name='taxtype'
                                        defaultValue={''}
                                        onChange={(e) => setFieldValue("taxtype", e.value)}
                                        onBlur={handleBlur}
                                        error={errors.taxtype && touched.taxtype ? (<span className='text-danger form_label' >{errors.taxtype}</span>) : null}
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
