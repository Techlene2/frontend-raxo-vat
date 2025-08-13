import React from 'react'
import { VehicleImport } from './Imports'
const { Text, Form, useFormik, SaveButton, useDispatch, useNavigate, toast, addVehicleTodo, AddVehicleSchema, ToastContainer, lang } = VehicleImport

export default function AddVehicleForm() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const initialValues = {
        registration_number: "",
        make: "",
        model: "",
        year: "",
        color: "",
        mileage: "",
        capacity: "",
        current_status: "",
    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: AddVehicleSchema,

        onSubmit: (values, action) => {
            // console.log(values)
            dispatch(addVehicleTodo({ 'values': values })).then((res) => add_res(res.payload, action))
        },
    })

    const add_res = (res, action) => {
        if (res && res.status == 201) {
            toast.success(lang.vehicle + ' ' + lang.success_add, { position: "bottom-right" })
            action.resetForm()
            setTimeout(() => {
                navigate('/vehicle-list')
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

    return (
        <>
            <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                <div className="layout">
                    <div className='container-fluid'>
                        <div className="row">

                            <div className="col-md-3">
                                <Text
                                    label_name={lang.registration_number}
                                    placeholder=''
                                    disabled={false}
                                    name='registration_number'
                                    value={values.registration_number || ''}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.registration_number && touched.registration_number ? (<span className='text-danger form_label' >{errors.registration_number}</span>) : null}
                                />
                            </div>

                            <div className="col-md-3">
                                <Text
                                    label_name={lang.make}
                                    placeholder=''
                                    disabled={false}
                                    name='make'
                                    value={values.make || ''}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.make && touched.make ? (<span className='text-danger form_label' >{errors.make}</span>) : null}
                                />
                            </div>

                            <div className="col-md-3">
                                <Text
                                    label_name={lang.model}
                                    placeholder=''
                                    disabled={false}
                                    name='model'
                                    value={values.model || ''}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.model && touched.model ? (<span className='text-danger form_label' >{errors.model}</span>) : null}
                                />
                            </div>

                            <div className="col-md-3">
                                <Text
                                    label_name={lang.year}
                                    placeholder=''
                                    disabled={false}
                                    name='year'
                                    value={values.year || ''}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.year && touched.year ? (<span className='text-danger form_label' >{errors.year}</span>) : null}
                                />
                            </div>

                            <div className="col-md-3">
                                <Text
                                    label_name={lang.color}
                                    placeholder=''
                                    disabled={false}
                                    name='color'
                                    value={values.color || ''}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.color && touched.color ? (<span className='text-danger form_label' >{errors.color}</span>) : null}
                                />
                            </div>

                            <div className="col-md-3">
                                <Text
                                    label_name={lang.mileage}
                                    placeholder=''
                                    disabled={false}
                                    name='mileage'
                                    value={values.mileage || ''}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.mileage && touched.mileage ? (<span className='text-danger form_label' >{errors.mileage}</span>) : null}
                                />
                            </div>

                            <div className="col-md-3">
                                <Text
                                    label_name={lang.capacity}
                                    placeholder=''
                                    disabled={false}
                                    name='capacity'
                                    value={values.capacity || ''}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.capacity && touched.capacity ? (<span className='text-danger form_label' >{errors.capacity}</span>) : null}
                                />
                            </div>

                            <div className="col-md-3">
                                <Text
                                    label_name={lang.current_status}
                                    placeholder=''
                                    disabled={false}
                                    name='current_status'
                                    value={values.current_status || ''}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.current_status && touched.current_status ? (<span className='text-danger form_label' >{errors.current_status}</span>) : null}
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
            <ToastContainer />
        </>
    )
}
