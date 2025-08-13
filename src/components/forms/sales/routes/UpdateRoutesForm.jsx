import React, { useState, useEffect, useRef } from 'react'
import { RoutesImport } from './Imports'
const { Form, Button, useFormik, Text, TextArea, SelectStatus, SaveButton, FormikProvider, FieldArray, FaPlus, FaTrash, AddRoutesSchema, ToastContainer, toast, Loader, useDispatch, useSelector, useNavigate, useLocation, updateRoutesTodo, routesDetailsTodo, StandaloneSearchBox, lang } = RoutesImport

export default function UpdateRoutesForm() {

    const searchBoxRefs = useRef([])
    const [loading, setLoading] = useState(true)
    const [breakLoading, setBreakLoading] = useState(true)
    const { state } = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const details = useSelector(state => state && state.routeDetails && state.routeDetails.data)
    // console.log(details)

    const initialValues = {
        id: details && details.id,
        name: details && details.name,
        description: details && details.description,
        status: details && details.isActive,
        location: details && details.routeLocations && details.routeLocations.map((val) => ({
            id: val.id,
            name: val.name,
            latitude: val.latitude,
            longitude: val.longitude,
            search: ""
        }))
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: AddRoutesSchema,
        enableReinitialize: true,

        onSubmit: (values, action) => {
            // console.log("value", values)
            dispatch(updateRoutesTodo({ 'values': values })).then((res) => update_res(res.payload, action))
        },
    })

    const update_res = (res, action) => {
        if (res && res.status == 200) {
            toast.success(lang.routes + ' ' + lang.success_update, { position: "bottom-right" })
            action.resetForm()
            setTimeout(() => {
                navigate('/routes-list')
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

    const onPlacesChanged = (index) => {
        if (searchBoxRefs.current[index].getPlaces()) {
            const [place] = searchBoxRefs.current[index].getPlaces();
            formik.setFieldValue(`location[${index}].name`, place && place.name)
            formik.setFieldValue(`location[${index}].latitude`, place && place.geometry && place.geometry.location && place.geometry.location.lat())
            formik.setFieldValue(`location[${index}].longitude`, place && place.geometry && place.geometry.location && place.geometry.location.lng())
            formik.setFieldValue(`location[${index}].search`, place && place.formatted_address)
        }
    }

    const handleSubmit = () => {
        formik.handleSubmit()
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
        dispatch(routesDetailsTodo({ 'id': state })).then((res) => details_res(res.payload))
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
                        <FormikProvider value={formik}>
                            <Form onSubmit={(e) => { e.preventDefault(); formik.handleSubmit(); }}>
                                <div className="layout">
                                    <div className="container-fluid">
                                        <div className="row">

                                            <div className="col-md-3">
                                                <Text
                                                    label_name={lang.name}
                                                    placeholder=''
                                                    disabled={false}
                                                    name='name'
                                                    value={formik.values.name || ''}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    error={formik.errors.name && formik.touched.name ? (<span className='text-danger form_label' >{formik.errors.name}</span>) : null}
                                                />
                                            </div>

                                            <div className="col-md-3">
                                                <TextArea
                                                    label_name={lang.description}
                                                    placeholder=''
                                                    disabled={false}
                                                    rows={1}
                                                    name='description'
                                                    value={formik.values.description || ''}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    error={formik.errors.description && formik.touched.description ? (<span className='text-danger form_label' >{formik.errors.description}</span>) : null}
                                                />
                                            </div>

                                            <div className="col-md-3">
                                                <SelectStatus
                                                    closeMenu={true}
                                                    label_name={lang.status}
                                                    // placeholder='Select Status'
                                                    disabled={false}
                                                    name='status'
                                                    defaultValue={formik.values.status}
                                                    onChange={(e) =>
                                                        formik.setFieldValue('status', e.value)
                                                    }
                                                    onBlur={formik.handleBlur}
                                                    error={formik.errors.status && formik.touched.status ? (<span className='text-danger form_label' >{formik.errors.status}</span>) : null}
                                                />
                                            </div>

                                            <div className='mt-3'>
                                                <FieldArray
                                                    name="location"
                                                    render={(arrayHelpers) => (
                                                        <>
                                                            {formik.values.location.map((filed, index) => (
                                                                <div className="row" key={index}>

                                                                    <div className="col-md-12">
                                                                        <div className='d-flex  justify-content-between align-items-center'>
                                                                            {index == 0 ? <h5>{lang.location}</h5> : <div></div>}
                                                                            {index == 0 ?

                                                                                <Button
                                                                                    variant="primary"
                                                                                    size='sm'
                                                                                    onClick={() => arrayHelpers.push({ name: "", latitude: "", longitude: "", search: "" })}
                                                                                >
                                                                                    <FaPlus size={16} style={{ marginBottom: '2px' }} />
                                                                                </Button>

                                                                                : ''}
                                                                        </div>
                                                                    </div>

                                                                    <div className="col">
                                                                        <Text
                                                                            label_name={index == 0 ? lang.name : ''}
                                                                            placeholder=''
                                                                            disabled={false}
                                                                            name={`location[${index}].name`}
                                                                            value={formik.values.location[index].name || ''}
                                                                            onChange={formik.handleChange}
                                                                            onBlur={formik.handleBlur}
                                                                            error={formik.touched.location && formik.touched.location[index] && formik.touched.location[index].name && formik.errors.location && formik.errors.location[index] && formik.errors.location[index].name ?
                                                                                (<span className='text-danger form_label'> {formik.errors.location[index].name}</span>) : null
                                                                            }
                                                                        />
                                                                    </div>

                                                                    <div className="col">
                                                                        <Text
                                                                            label_name={index == 0 ? lang.lat : ''}
                                                                            placeholder=''
                                                                            disabled={false}
                                                                            name={`location[${index}].latitude`}
                                                                            value={formik.values.location[index].latitude || ''}
                                                                            onChange={formik.handleChange}
                                                                            onBlur={formik.handleBlur}
                                                                            error={formik.touched.location && formik.touched.location[index] && formik.touched.location[index].latitude && formik.errors.location && formik.errors.location[index] && formik.errors.location[index].latitude ?
                                                                                (<span className='text-danger form_label'> {formik.errors.location[index].latitude}</span>) : null
                                                                            }
                                                                        />
                                                                    </div>

                                                                    <div className="col">
                                                                        <Text
                                                                            label_name={index == 0 ? lang.lng : ''}
                                                                            placeholder=''
                                                                            disabled={false}
                                                                            name={`location[${index}].longitude`}
                                                                            value={formik.values.location[index].longitude || ''}
                                                                            onChange={formik.handleChange}
                                                                            onBlur={formik.handleBlur}
                                                                            error={formik.touched.location && formik.touched.location[index] && formik.touched.location[index].longitude && formik.errors.location && formik.errors.location[index] && formik.errors.location[index].longitude ?
                                                                                (<span className='text-danger form_label'> {formik.errors.location[index].longitude}</span>) : null
                                                                            }
                                                                        />
                                                                    </div>

                                                                    <div className="col">
                                                                        <StandaloneSearchBox
                                                                            onLoad={ref => (searchBoxRefs.current[index] = ref)}
                                                                            onPlacesChanged={() => onPlacesChanged(index)}
                                                                        >
                                                                            <Text
                                                                                label_name={index == 0 ? 'Search Location' : ''}
                                                                                placeholder=''
                                                                                disabled={false}
                                                                                name={`location[${index}].search`}
                                                                                value={formik.values.location[index].search || ''}
                                                                                onChange={formik.handleChange}
                                                                                onBlur={formik.handleBlur}
                                                                            />
                                                                        </StandaloneSearchBox>
                                                                    </div>

                                                                    <div className="col">
                                                                        <div className={localStorage.getItem('lang_key') == 'ar' ? 'float-start' : 'float-end'} style={index == 0 ? { marginTop: "32px" } : {}}>
                                                                            {formik.values.location.length !== 1 ?
                                                                                <Button
                                                                                    variant="danger"
                                                                                    size='sm'
                                                                                    onClick={() => arrayHelpers.remove(index)}
                                                                                >
                                                                                    <FaTrash size={16} style={{ marginBottom: '2px' }} />
                                                                                </Button>
                                                                                : ''
                                                                            }
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            ))}
                                                        </>
                                                    )}
                                                />
                                            </div>

                                            <div className="text-end">
                                                <Button
                                                    type='button'
                                                    variant="primary"
                                                    size='sm'
                                                    onClick={handleSubmit}
                                                >
                                                    {lang.submit}
                                                </Button>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </Form>
                        </FormikProvider>
                        : ''
            }

            <ToastContainer />
        </>
    )
}
