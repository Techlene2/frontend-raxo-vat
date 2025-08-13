import React, { useState, useEffect } from 'react'
import { MeasureUnitImport } from './Imports'
const { Text, Form, SingleSelect, useFormik, SaveButton, AddMeasureUnitSchema, TextArea, useNavigate, useDispatch, useSelector, measureUnitTypeListTodo, Loader, addMeasureUnitTodo, ToastContainer, toast, lang } = MeasureUnitImport

export default function AddMeasureUnitForm() {

    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const unit_type = useSelector(state => state.measureUnitTypeList && state.measureUnitTypeList.data)

    const unit_type_option = unit_type && unit_type.map(val => (
        { "value": val.id, "label": val.name }
    ))

    const initialValues = {
        name: "",
        description: "",
        unitType: ""
    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: initialValues,
        validationSchema: AddMeasureUnitSchema,

        onSubmit: (values, action) => {
            // console.log(values)
            dispatch(addMeasureUnitTodo({ 'values': values })).then((res) => add_res(res.payload, action))
        },
    })

    const add_res = (res, action) => {
        if (res && res.status == 201) {
            toast.success(lang.measurement_unit + ' ' + lang.success_add, { position: "bottom-right" })
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

    const measure_unit_type_res = (res) => {
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
        dispatch(measureUnitTypeListTodo({ 'search': '' })).then((res) => measure_unit_type_res(res.payload))
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
                                        label_name={lang.unit_type}
                                        // placeholder='Select Unit Type'
                                        disabled={false}
                                        option={unit_type_option ? unit_type_option : []}
                                        name='unitType'
                                        defaultValue={''}
                                        onChange={(e) => setFieldValue('unitType', e.value)}
                                        onBlur={handleBlur}
                                        error={errors.unitType && touched.unitType ? (<span className='text-danger form_label' >{errors.unitType}</span>) : null}
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
