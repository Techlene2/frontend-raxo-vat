import React, { useEffect, useState } from 'react'
import { GradeImport } from './Imports.js'
const { Text, Form, useFormik, SaveButton, ToastContainer, toast, Loader, TextArea, useDispatch, useLocation, useNavigate, useSelector, AddGradeSchema, updateGradeTodo, gradeDetailsTodo, lang } = GradeImport

export default function UpdateGradeForm() {

    const [loading, setLoading] = useState(true)
    const [breakLoading, setBreakLoading] = useState(true)
    const { state } = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const grade_details = useSelector(state => state.gradeDetails && state.gradeDetails.data)
    // console.log(grade_details)

    const initialValues = {
        id: grade_details && grade_details.id,
        name: grade_details && grade_details.name,
        description: grade_details && grade_details.description,
    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: AddGradeSchema,
        enableReinitialize: true,

        onSubmit: (values, action) => {
            // console.log(values)
            dispatch(updateGradeTodo({ 'values': values })).then((res) => update_res(res.payload, action))
        }
    })

    const update_res = (res, action) => {
        if (res && res.status == 200) {
            toast.success(lang.grade + ' ' + lang.success_update, { position: "bottom-right" })
            action.resetForm()
            setTimeout(() => {
                navigate('/grade-list')
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
            setLoading(false)
            setBreakLoading(false)
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
        dispatch(gradeDetailsTodo({ 'id': state })).then((res) => details_res(res.payload))
    }, [])

    return (
        <div>
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
        </div>
    )
}


