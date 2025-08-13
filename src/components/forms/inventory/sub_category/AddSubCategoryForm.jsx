import React, { useState, useEffect } from 'react'
import { SubCategoryImport } from './Imports.js'
const { Text, Form, useFormik, SaveButton, SingleSelect, TextArea, toast, ToastContainer, Loader, SelectStatus, SubCategorySchema, categoryListTodo, useDispatch, useSelector, useNavigate, addSubCategoryTodo, lang } = SubCategoryImport

export default function AddSubCategoryForm() {

    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const category = useSelector(state => state && state.categoryList && state.categoryList.data)

    const cat_option = category && category.map(val => (
        { "value": val.id, "label": val.name }
    ))

    const initialValues = {
        name: "",
        description: "",
        status: "",
        category: "",
    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: initialValues,
        validationSchema: SubCategorySchema,

        onSubmit: (values, action) => {
            // console.log(values)
            dispatch(addSubCategoryTodo({ 'values': values })).then((res) => add_res(res.payload, action))
        }
    })

    const add_res = (res, action) => {
        if (res && res.status == 201) {
            toast.success(lang.sub_category + ' ' + lang.success_add, { position: "bottom-right" })
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

    const category_res = (res) => {
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
        dispatch(categoryListTodo({ 'search': '' })).then((res) => category_res(res.payload))
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
                                        defaultValue={""}
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


