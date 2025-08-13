import React, { useEffect, useState } from 'react'
import { SubCategoryImport } from './Imports.js'
const { Text, Form, useFormik, SaveButton, SingleSelect, TextArea, toast, ToastContainer, Loader, SelectStatus, SubCategorySchema, categoryListTodo, useLocation, useDispatch, useSelector, useNavigate, subCategoryDetailsTodo, updateSubCategoryTodo, lang } = SubCategoryImport

export default function UpdateSubCategoryForm() {

    const [loading, setLoading] = useState(true)
    const [breakLoading, setBreakLoading] = useState(true)
    const { state } = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const details = useSelector(state => state && state.subCategoryDetails && state.subCategoryDetails.data)
    const category = useSelector(state => state && state.categoryList && state.categoryList.data)
    // console.log(details)

    const cat_option = category && category.map(val => (
        { "value": val.id, "label": val.name }
    ))

    const initialValues = {
        id: details && details.id,
        name: details && details.name,
        description: details && details.description,
        status: details && details.isActive,
        category: details && details.category && details.category.id,
    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: initialValues,
        validationSchema: SubCategorySchema,
        enableReinitialize: true,

        onSubmit: (values, action) => {
            // console.log(values)
            dispatch(updateSubCategoryTodo({ 'values': values })).then((res) => update_res(res.payload, action))
        }
    })

    const update_res = (res, action) => {
        if (res && res.status == 200) {
            toast.success(lang.sub_category + ' ' + lang.success_update, { position: "bottom-right" })
            action.resetForm()
            setTimeout(() => {
                navigate('/sub-category-list')
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

    const details_res = (res) => {
        if (res && res.status == 200) {
            dispatch(categoryListTodo({ 'search': '' })).then((cat_res) => {

                if (cat_res.payload && cat_res.payload.status == 200) {
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
        dispatch(subCategoryDetailsTodo({ 'id': state })).then((res) => details_res(res.payload))
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
                                            <SingleSelect
                                                closeMenu={true}
                                                label_name={lang.category}
                                                // placeholder=' '
                                                disabled={false}
                                                option={cat_option ? cat_option : []}
                                                name='category'
                                                defaultValue={cat_option && cat_option.find((option) => option.value == values.category)}
                                                onChange={(e) => {
                                                    setFieldValue('category', e.value);
                                                }}
                                                onBlur={handleBlur}
                                                error={errors.category && touched.category ? (<span className='text-danger form_label' >{errors.category}</span>) : null}
                                            />
                                        </div>

                                        <div className="col-md-3">
                                            <SelectStatus
                                                closeMenu={true}
                                                label_name={lang.status}
                                                placeholder=' '
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


