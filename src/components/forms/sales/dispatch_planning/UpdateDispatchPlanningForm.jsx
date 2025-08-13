import React, { useEffect, useState } from 'react'
import { DispatchPlanningImport } from './Imports'
const { Form, Table, useFormik, FormikProvider, FieldArray, DatePicker, moment, SingleSelect, SaveButton, LuX, AddDispatchPlanningSchema, ToastContainer, toast, Loader, useNavigate, useLocation, useDispatch, useSelector, driverListTodo, vehicleListTodo, routesListTodo, updateDispatchPlanningTodo, dispatchPlanningDetailsTodo, lang, SalesOrderItem, salesOrderDetailsTodo } = DispatchPlanningImport

export default function UpdateDispatchPlanningForm() {

    const [loading, setLoading] = useState(true)
    const [breakLoading, setBreakLoading] = useState(true)
    const [soModal, setSOModal] = useState(false)
    const [soModalLoading, setSOModalLoading] = useState(false)

    const { state } = useLocation()

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const planning_details = useSelector(state => state && state.dispatchPlanningDetails && state.dispatchPlanningDetails.data)
    const driver = useSelector(state => state && state.driverList && state.driverList.data)
    const vehicle = useSelector(state => state && state.vehicleList && state.vehicleList.data)
    const routes = useSelector(state => state && state.routesList && state.routesList.data)
    // console.log(planning_details)

    const driver_option = driver && driver.map(val => (
        { "value": val.id, "label": val.name }
    ))

    const vehicle_option = vehicle && vehicle.map(val => (
        { "value": val.id, "label": val.make + ' ' + '(' + val.registrationNumber + ')' }
    ))

    const routes_option = routes && routes.map(val => (
        { "value": val.id, "label": val.name }
    ))

    const initialValues = {
        id: planning_details && planning_details.id,
        dispatch_date: planning_details && planning_details.date,
        driver: planning_details && planning_details.driver && planning_details.driver.id,
        vehicle: planning_details && planning_details.vehicle && planning_details.vehicle.id,
        route: planning_details && planning_details.route && planning_details.route.id,

        sales_order: planning_details && planning_details.despatchPlanningDetails && planning_details.despatchPlanningDetails.map(val => ({
            id: val.id,
            so_id: val.customerSalesOrder && val.customerSalesOrder.id,
            so_code: val.customerSalesOrder && val.customerSalesOrder.code,
            customer_id: val.customerSalesOrder && val.customerSalesOrder.customer && val.customerSalesOrder.customer.id,
            customer_name: val.customerSalesOrder && val.customerSalesOrder.customer && val.customerSalesOrder.customer.name,
            delivery_date: val.customerSalesOrder && val.customerSalesOrder.deliveryDate
        }))
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: AddDispatchPlanningSchema,
        enableReinitialize: true,

        onSubmit: (values, action) => {
            // console.log(values)
            dispatch(updateDispatchPlanningTodo({ 'values': values })).then((res) => update_res(res.payload, action))
        }
    })

    const update_res = (res, action) => {
        if (res && res.status == 200) {
            toast.success(lang.dispatch_planning + ' ' + lang.success_update, { position: "bottom-right" })
            action.resetForm()
            setTimeout(() => {
                navigate('/dispatch-planning-list')
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

    const details_res = (res) => {
        if (res && res.status == 200) {
            dispatch(driverListTodo({ 'search': '' })).then((driver_res) => {

                if (driver_res.payload && driver_res.payload.status == 200) {
                    dispatch(vehicleListTodo({ 'search': '' })).then((vehicle_res) => {

                        if (vehicle_res.payload && vehicle_res.payload.status == 200) {
                            dispatch(routesListTodo({ 'search': '' })).then((routes_res) => {

                                if (routes_res.payload && routes_res.payload.status == 200) {
                                    setLoading(false)
                                    setBreakLoading(false)
                                } else {
                                    setBreakLoading(false)
                                }
                            })
                        } else {
                            setBreakLoading(false)
                        }
                    })
                } else {
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
        dispatch(dispatchPlanningDetailsTodo({ 'id': state })).then((res) => details_res(res.payload))
    }, [])

    return (
        <>
            {loading && breakLoading ?
                <div className="container-fluid">
                    <div className="layout">
                        <Loader />
                    </div>
                </div>

                :

                loading && !breakLoading ?
                    <div className="container-fluid">
                        <div className='layout'>
                            <div className='text-center'>
                                <h5>Something went wrong can't able to load update form</h5>
                            </div>
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
                                                            label_name={lang.dispatch_date}
                                                            placeholder='Choose Date'
                                                            option={{
                                                                altInput: true,
                                                                altFormat: "F j, Y",
                                                                dateFormat: 'Y-m-d',
                                                                minDate: '',
                                                                maxDate: '',
                                                                disable: [],
                                                                mode: "single",
                                                                defaultDate: [],
                                                                conjunction: "",
                                                            }}
                                                            name='dispatch_date'
                                                            value={formik.values.dispatch_date || ''}
                                                            onChange={(e) =>
                                                                formik.setFieldValue('dispatch_date', moment(e[0]).format("YYYY-MM-DDTHH:mm:ss[Z]"))
                                                            }
                                                            onBlur={formik.handleBlur}
                                                            error={formik.errors.dispatch_date && formik.touched.dispatch_date ? (<span className='text-danger form_label' >{formik.errors.dispatch_date}</span>) : null}
                                                        />
                                                    </div>

                                                    <div className="col-12">
                                                        <SingleSelect
                                                            closeMenu={true}
                                                            label_name={lang.driver}
                                                            // placeholder=''
                                                            disabled={false}
                                                            option={driver_option ? driver_option : []}
                                                            name='driver'
                                                            defaultValue={driver_option && driver_option.find((option) => option.value == formik.values.driver)}
                                                            onChange={(e) => {
                                                                formik.setFieldValue('driver', e.value);
                                                            }}
                                                            onBlur={formik.handleBlur}
                                                            error={formik.errors.driver && formik.touched.driver ? (<span className='text-danger form_label' >{formik.errors.driver}</span>) : null}
                                                        />
                                                    </div>

                                                    <div className="col-12">
                                                        <SingleSelect
                                                            closeMenu={true}
                                                            label_name={lang.vehicle}
                                                            // placeholder=''
                                                            disabled={false}
                                                            option={vehicle_option ? vehicle_option : []}
                                                            name='vehicle'
                                                            defaultValue={vehicle_option && vehicle_option.find((option) => option.value == formik.values.vehicle)}
                                                            onChange={(e) => {
                                                                formik.setFieldValue('vehicle', e.value);
                                                            }}
                                                            onBlur={formik.handleBlur}
                                                            error={formik.errors.vehicle && formik.touched.vehicle ? (<span className='text-danger form_label' >{formik.errors.vehicle}</span>) : null}
                                                        />
                                                    </div>

                                                    <div className="col-12">
                                                        <SingleSelect
                                                            closeMenu={true}
                                                            label_name={lang.route}
                                                            // placeholder=''
                                                            disabled={true}
                                                            option={routes_option ? routes_option : []}
                                                            name='route'
                                                            defaultValue={routes_option && routes_option.find((option) => option.value == formik.values.route)}
                                                            onChange={(e) =>
                                                                formik.setFieldValue('route', e.value)
                                                            }
                                                            onBlur={formik.handleBlur}
                                                            error={formik.errors.route && formik.touched.route ? (<span className='text-danger form_label' >{formik.errors.route}</span>) : null}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-9">
                                            <div className="layout match_height">

                                                <div className='text-center form_label'>
                                                    {lang.sales_order}
                                                </div>
                                                <FieldArray
                                                    name="sales_order"
                                                    render={(arrayHelpers) => (
                                                        <>
                                                            <div className='planning_sales_order'>
                                                                <Table bordered responsive size="sm" style={{ fontSize: '13px' }}>
                                                                    <thead>
                                                                        <tr className='form_label'>
                                                                            <th style={{ background: 'rgba(0,0,0,0.05)' }}>{lang.delivery_date}</th>
                                                                            <th style={{ background: 'rgba(0,0,0,0.05)' }}>{lang.sales_order_id}</th>
                                                                            <th style={{ background: 'rgba(0,0,0,0.05)' }}>{lang.customer}</th>
                                                                            <th style={{ background: 'rgba(0,0,0,0.05)' }} className='text-end'>{lang.action}</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {formik.values.sales_order && formik.values.sales_order.length ? formik.values.sales_order.map((value, index) => (
                                                                            <tr key={index}>
                                                                                <td>{moment(value.delivery_date).format("DD-MM-YYYY")}</td>
                                                                                <td className='text-primary fw-bold' style={{ cursor: 'pointer' }} onClick={() => sales_order_modal(value.so_id)}>{value.so_code}</td>
                                                                                <td>{value.customer_name}</td>
                                                                                <td className='text-end'>
                                                                                    <LuX className='text-secondary' size={20} style={{ cursor: 'pointer' }} onClick={() => arrayHelpers.remove(index)} />
                                                                                </td>
                                                                            </tr>
                                                                        )) :
                                                                            <tr>
                                                                                <td colSpan={6} className='text-center'>{formik.errors.sales_order && formik.touched.sales_order ? (<span className='text-danger form_label' >{formik.errors.sales_order}</span>) : null}</td>
                                                                            </tr>
                                                                        }
                                                                    </tbody>
                                                                </Table>
                                                            </div>
                                                        </>
                                                    )}
                                                />
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
