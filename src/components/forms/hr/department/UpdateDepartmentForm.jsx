import React, { useEffect, useState } from 'react'
import { DepartmentImport } from './Imports'
const { Form, useFormik, Text, TextArea, SaveButton, SelectStatus, DepartmentSchema, updateDepartmentTodo, departmentDetailsTodo, useDispatch, useSelector, useNavigate, useLocation, ToastContainer, toast, Loader, lang } = DepartmentImport

export default function UpdateDepartmentForm() {

    const [loading, setLoading] = useState(true)
    const [breakLoading, setBreakLoading] = useState(true)
    const { state } = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const department = useSelector(state => state && state.departmentDetails && state.departmentDetails.data)
    // console.log(department)

    const initialValues = {
        id: department && department.id,
        name: department && department.name,
        description: department && department.description,
        status: department && department.isDisable,
    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: initialValues,
        validationSchema: DepartmentSchema,
        enableReinitialize: true,

        onSubmit: (values, action) => {
            // console.log(values)
            dispatch(updateDepartmentTodo({ 'values': values })).then((res) => update_res(res.payload, action))
        },
    })

    const update_res = (res, action) => {
        if (res && res.status == 200) {
            toast.success(lang.department + ' ' + lang.success_update, { position: "bottom-right" })
            setTimeout(() => {
                navigate('/department-list')
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

    const department_res = (res, action) => {
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
        dispatch(departmentDetailsTodo({ 'id': state })).then((res) => department_res(res.payload))
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
                            <div className='layout'>
                                <div className='container-fluid'>
                                    <div className="row">

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

                                        <div className='text-end'>
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
