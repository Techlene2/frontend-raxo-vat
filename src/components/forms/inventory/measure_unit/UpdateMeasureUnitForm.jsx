import React, { useEffect, useState } from 'react'
import { MeasureUnitImport } from './Imports'
const { Text, Form, SingleSelect, useFormik, SaveButton, AddMeasureUnitSchema, TextArea, useLocation, useNavigate, useDispatch, useSelector, measureUnitTypeListTodo, Loader, updateMeasureUnitTodo, measureUnitDetailsTodo, ToastContainer, toast, lang } = MeasureUnitImport

export default function UpdateMeasureUnitForm() {

    const [loading, setLoading] = useState(true)
    const [breakLoading, setBreakLoading] = useState(true)
    const { state } = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const measure_unit = useSelector(state => state.measureUnitDetails && state.measureUnitDetails.data)
    const unit_type = useSelector(state => state.measureUnitTypeList && state.measureUnitTypeList.data)
    // console.log(measure_unit)

    const unit_type_option = unit_type && unit_type.map(val => (
        { "value": val.id, "label": val.name }
    ))

    const initialValues = {
        id: measure_unit && measure_unit.id,
        name: measure_unit && measure_unit.name,
        description: measure_unit && measure_unit.description,
        unitType: measure_unit && measure_unit.measurementUnitType && measure_unit.measurementUnitType.id
    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: initialValues,
        validationSchema: AddMeasureUnitSchema,
        enableReinitialize: true,

        onSubmit: (values, action) => {
            // console.log(values)
            dispatch(updateMeasureUnitTodo({ 'values': values })).then((res) => update_res(res.payload, action))
        },
    })

    const update_res = (res, action) => {
        if (res && res.status == 200) {
            toast.success(lang.measurement_unit + ' ' + lang.success_update, { position: "bottom-right" })
            action.resetForm()
            setTimeout(() => {
                navigate('/measure-unit-list')
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

    const measure_unit_res = (res) => {
        if (res && res.status == 200) {
            dispatch(measureUnitTypeListTodo({ 'search': '' })).then((unit_type) => {
                if (unit_type.payload && unit_type.payload.status == 200) {
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
        dispatch(measureUnitDetailsTodo({ 'id': state })).then((res) => measure_unit_res(res.payload))
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
                                                label_name={lang.unit_type}
                                                // placeholder='Select Unit Type'
                                                disabled={false}
                                                option={unit_type_option ? unit_type_option : []}
                                                name='unitType'
                                                defaultValue={unit_type_option && unit_type_option.find((option) => option.value == values.unitType)}
                                                onChange={(e) => setFieldValue('unitType', e.value)}
                                                onBlur={handleBlur}
                                                error={errors.unitType && touched.unitType ? (<span className='text-danger form_label' >{errors.unitType}</span>) : null}
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
