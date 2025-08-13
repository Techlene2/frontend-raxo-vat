import React, { useEffect, useState } from 'react'
import { CustomerSalesOrderImport } from './Imports'
const { FieldArray, FormikProvider, useFormik, Button, Form, Table, SingleSelect, DatePicker, LuX, FaSquare, SaveButton, SalesOrderRoutePlanningSchema, Loader, ToastContainer, toast, useNavigate, useDispatch, useSelector, routesListTodo, salesOrderRoutesListTodo, moment, updateSalesOrderRouteTodo, lang, Swal, salesOrderDetailsTodo, SalesOrderItem } = CustomerSalesOrderImport

export default function SalesOrderRoutePlanningForm() {

    const [loading, setLoading] = useState(true)
    const [breakLoading, setBreakLoading] = useState(true)
    const [soLoader, setSOLoader] = useState(false)
    const [soModal, setSOModal] = useState(false)
    const [soModalLoading, setSOModalLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const routes = useSelector(state => state && state.routesList && state.routesList.data)
    const sales_order_routes = useSelector(state => state && state.salesOrderRouteList && state.salesOrderRouteList.data)
    // console.log(sales_order_routes)

    const routes_option = routes && routes.map(val => (
        { "value": val.id, "label": val.name }
    ))

    const initialValues = {
        delivery_date: '',
        route: '',
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: SalesOrderRoutePlanningSchema,
        enableReinitialize: true,

        onSubmit: (values, action) => {
            // console.log(values)
            dispatch(updateSalesOrderRouteTodo({ 'values': values })).then((res) => update_res(res.payload, action))
        }
    })

    const update_res = (res, action) => {
        if (res && res.status == 200) {
            dispatch(salesOrderRoutesListTodo({ 'date': '', 'route': '0' }))
            toast.success(lang.sales_order_routes + ' ' + lang.success_update, { position: "bottom-right" })
            // action.resetForm()
            // setTimeout(() => {
            //     navigate('/customer-sales-order-list')
            // }, 1500);
        } else if (res && res.status == 401) {
            localStorage.clear()
            navigate('/login')
        } else if (res && res.status == 400) {
            toast.error("400 BAD REQUEST", { position: "bottom-right" })
        } else {
            toast.error(lang.wrong, { position: "bottom-right" })
        }
    }

    const apply_filter = () => {
        if (formik.values.delivery_date) {
            setSOLoader(true)
            dispatch(salesOrderRoutesListTodo({ 'date': formik.values.delivery_date, 'route': formik.values.route })).then((res) => {
                if (res.payload && res.payload.status == 200) {
                    setSOLoader(false)
                } else {
                    setSOLoader(false)
                }
            })
        } else {
            Swal.fire({
                title: lang.filter,
                text: lang.filter_alert,
                icon: "error",
                confirmButtonText: lang.ok
            })
        }
    }

    const sales_order_modal = (id) => {
        setSOModalLoading(true)
        dispatch(salesOrderDetailsTodo({ 'id': id })).then((res) => {
            if (res.payload && res.payload.status == 200) {
                setSOModalLoading(false)
            } else {
                setSOModalLoading(false)
            }
        })
        setSOModal(true)
    }

    const routes_res = (res) => {
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
        dispatch(routesListTodo({ 'search': '' })).then((res) => routes_res(res.payload))

        return () => {
            dispatch(salesOrderRoutesListTodo({ 'date': '', 'route': '0' }))
        }
    }, [])

    useEffect(() => {
        formik.setValues({
            ...formik.values,
            sales: sales_order_routes && sales_order_routes.map((val) => ({
                so_id: val && val.id,
                code: val && val.code,
                delivery: val && val.deliveryDate,
                customer: val && val.customer && val.customer.name,
                defaultRoute: val && val.defaultRoute,
                route_id: val && val.routeId,
            }))
        });
    }, [sales_order_routes])

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
                                <div className='container-fluid'>
                                    <div className="row row-flex">

                                        <div className="col-md-3">
                                            <div className="layout match_height">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <DatePicker
                                                            label_name={lang.delivery_date}
                                                            placeholder='Choose Date'
                                                            option={{
                                                                altInput: true,
                                                                altFormat: "F j, Y",
                                                                dateFormat: 'Y-m-d', // Customize date format as needed
                                                                minDate: '', // Before dates disabled
                                                                maxDate: '', // After dates disabled
                                                                disable: [], // Disable particular date ranges
                                                                mode: "single", //multiple-single-range
                                                                defaultDate: [], //comma separated multiple dates
                                                                conjunction: "", // Multiple dates seperation
                                                            }}
                                                            name='delivery_date'
                                                            onChange={(e) => {
                                                                formik.setFieldValue('delivery_date', e[0]);
                                                            }}
                                                            onBlur={formik.handleBlur}
                                                            error={formik.errors.delivery_date && formik.touched.delivery_date ? (<span className='text-danger form_label' >{formik.errors.delivery_date}</span>) : null}
                                                        />
                                                    </div>
                                                    <div className="col-12">
                                                        <SingleSelect
                                                            form_group={'inherit'}
                                                            closeMenu={true}
                                                            label_name={lang.route}
                                                            // placeholder=''
                                                            disabled={false}
                                                            option={routes_option ? routes_option : []}
                                                            name={'route'}
                                                            defaultValue={''}
                                                            onChange={(e) => {
                                                                if (e) {
                                                                    formik.setFieldValue('route', e.value)
                                                                } else {
                                                                    formik.setFieldValue('route', '')
                                                                }
                                                            }}
                                                            onBlur={formik.handleBlur}
                                                            error={formik.errors.route && formik.touched.route ? (<span className='text-danger form_label' >{formik.errors.route}</span>) : null}
                                                            clear={true}
                                                        />
                                                    </div>
                                                    <div className="text-end mt-3">
                                                        <Button
                                                            type='button'
                                                            variant="primary"
                                                            size='sm'
                                                            onClick={() => apply_filter()}
                                                        >
                                                            {lang.search}
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-9">
                                            <div className="layout match_height">

                                                {soLoader ?
                                                    <Loader />
                                                    :
                                                    <FieldArray
                                                        name="sales"
                                                        render={(arrayHelpers) => (
                                                            <>
                                                                <div className="text-end fw-bold mb-1" style={{ fontSize: '9px' }}>
                                                                    <span><FaSquare className='me-1' style={{ color: '#d9ead3' }} />Route Assigned</span>
                                                                    <span className='ms-1'><FaSquare className='me-1' style={{ color: '#fff2cc' }} />Not-Assigned</span>
                                                                </div>
                                                                <div className='sales_order_routes'>
                                                                    <Table bordered responsive size="sm" style={{ fontSize: '13px' }}>
                                                                        <thead>
                                                                            <tr className='form_label'>
                                                                                <th style={{ background: 'rgba(0,0,0,0.05)' }}>{lang.sales_order}</th>
                                                                                <th style={{ background: 'rgba(0,0,0,0.05)' }}>{lang.delivery_date}</th>
                                                                                <th style={{ background: 'rgba(0,0,0,0.05)' }}>{lang.customer}</th>
                                                                                <th style={{ background: 'rgba(0,0,0,0.05)' }}>{lang.default_route}</th>
                                                                                <th style={{ background: 'rgba(0,0,0,0.05)' }}>{lang.route}</th>
                                                                                <th style={{ background: 'rgba(0,0,0,0.05)' }} className='text-center'>{lang.action}</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {formik.values.sales && formik.values.sales.length ? formik.values.sales && formik.values.sales.map((filed, index) => (
                                                                                <tr key={index} className={filed && filed.route_id ? 'sales_order_bg_green' : 'sales_order_bg_yellow'}>
                                                                                    <td><span className='text-primary fw-bold' style={{ cursor: 'pointer' }} onClick={() => sales_order_modal(filed.so_id)}>{filed && filed.code}</span></td>
                                                                                    <td>{filed && moment(filed.delivery).format('DD-MM-YYYY')}</td>
                                                                                    <td>{filed && filed.customer}</td>
                                                                                    <td>{filed && filed.defaultRoute ? filed.defaultRoute : '-'}</td>
                                                                                    <td style={{ width: '300px' }}>
                                                                                        <SingleSelect
                                                                                            form_group={'inherit'}
                                                                                            closeMenu={true}
                                                                                            label_name={''}
                                                                                            placeholder=''
                                                                                            disabled={false}
                                                                                            option={routes_option ? routes_option : []}
                                                                                            name={`sales[${index}].route_id`}
                                                                                            defaultValue={routes_option && routes_option.find((option) => option.value == formik.values.sales[index].route_id)}
                                                                                            onChange={(e) => {
                                                                                                formik.setFieldValue(`sales[${index}].route_id`, e.value)
                                                                                            }}
                                                                                            onBlur={formik.handleBlur}
                                                                                            error={formik.touched.sales && formik.touched.sales[index] && formik.touched.sales[index].route_id && formik.errors.sales && formik.errors.sales[index] && formik.errors.sales[index].route_id ?
                                                                                                (<span className='text-danger form_label'> {formik.errors.sales[index].route_id}</span>) : null
                                                                                            }
                                                                                        />
                                                                                    </td>
                                                                                    <td className='text-center fw-bold'>
                                                                                        <Button variant="light" size='sm' onClick={() => arrayHelpers.remove(index)}>
                                                                                            <LuX className='text-secondary' size={20} />
                                                                                        </Button>
                                                                                    </td>
                                                                                </tr>
                                                                            ))
                                                                                :
                                                                                <tr>
                                                                                    <td colSpan={5} className='text-center'>{formik.errors.sales && formik.touched.sales ? (<span className='text-danger form_label' >{formik.errors.sales}</span>) : null}</td>
                                                                                </tr>
                                                                            }
                                                                        </tbody>
                                                                    </Table>
                                                                </div>
                                                            </>
                                                        )}
                                                    />
                                                }
                                            </div>
                                        </div>

                                        <div className="col-md-12">
                                            <div style={{ position: 'fixed', bottom: '10px', right: '15px' }}>
                                                <SaveButton
                                                    button_name={lang.update}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Form>
                        </FormikProvider>
                        : ''
            }

            <SalesOrderItem
                soModal={soModal}
                setSOModal={setSOModal}
                soModalLoading={soModalLoading}
            />

            <ToastContainer />
        </>
    )
}
