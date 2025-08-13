import React, { useEffect, useState } from 'react'
import { VehicleImport } from './Imports'
const { Text, Form, useFormik, SaveButton, AddVehicleSchema, updateVehicleTodo, vehicleDetailsTodo, Loader, useLocation, useSelector, useDispatch, useNavigate, toast, ToastContainer, lang } = VehicleImport

export default function UpdateVehicleForm() {
    const [loading, setLoading] = useState(true)
    const [breakLoading, setBreakLoading] = useState(true)

    const { state } = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const vehicle = useSelector(state => state && state.vehicleDetails && state.vehicleDetails.data)
    // console.log(vehicle)

    const initialValues = {
        id: vehicle && vehicle.id,
        registration_number: vehicle && vehicle.registrationNumber,
        make: vehicle && vehicle.make,
        model: vehicle && vehicle.model,
        year: vehicle && vehicle.year,
        color: vehicle && vehicle.color,
        mileage: vehicle && vehicle.mileage,
        capacity: vehicle && vehicle.capacity,
        current_status: vehicle && vehicle.currentStatus,
    }


    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: initialValues,
        validationSchema: AddVehicleSchema,
        enableReinitialize: true,

        onSubmit: (values, action) => {
            // console.log(values)
            dispatch(updateVehicleTodo({ 'values': values })).then((res) => update_res(res.payload, action))
        },
    })

    const update_res = (res, action) => {
        if (res && res.status == 200) {
            toast.success(lang.vehicle + ' ' + lang.success_update, { position: "bottom-right" })
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

    const vehicle_res = (res, action) => {
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
        dispatch(vehicleDetailsTodo({ 'id': state })).then((res) => vehicle_res(res.payload))
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
