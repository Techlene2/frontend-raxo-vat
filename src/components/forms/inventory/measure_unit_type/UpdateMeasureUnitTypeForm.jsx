import React, { useEffect, useState } from 'react'
import { MeasureUnitTypeImport } from './Import'
const { Text, Form, SelectStatus, useFormik, SaveButton, AddMeasureUnitTypeSchema, TextArea, useLocation, useDispatch, useSelector, useNavigate, updateMeasureUnitTypeTodo, measureUnitTypeDetailsTodo, ToastContainer, toast, Loader, lang } = MeasureUnitTypeImport

export default function UpdateMeasureUnitTypeForm() {

    const [loading, setLoading] = useState(true)
    const [breakLoading, setBreakLoading] = useState(true)
    const { state } = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const unitType = useSelector(state => state && state.measureUnitTypeDetails && state.measureUnitTypeDetails.data)
    // console.log(unitType)

    const initialValues = {
        id: unitType && unitType.id,
        name: unitType && unitType.name,
        description: unitType && unitType.description,
        status: unitType && unitType.isActive
    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: initialValues,
        validationSchema: AddMeasureUnitTypeSchema,
        enableReinitialize: true,

        onSubmit: (values, action) => {
            // console.log(values)
            dispatch(updateMeasureUnitTypeTodo({ 'values': values })).then((res) => update_res(res.payload, action))
        },
    })

    const update_res = (res, action) => {
        if (res && res.status == 200) {
            toast.success(lang.unit_type + ' ' + lang.success_update, { position: "bottom-right" })
            setTimeout(() => {
                navigate('/measure-unit-type-list')
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

    const unit_type_res = (res, action) => {
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
        dispatch(measureUnitTypeDetailsTodo({ 'id': state })).then((res) => unit_type_res(res.payload))
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
