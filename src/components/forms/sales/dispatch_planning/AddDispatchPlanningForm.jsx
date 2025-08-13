import React, { useEffect, useState } from 'react'
import { DispatchPlanningImport } from './Imports'
const { Form, Table, useFormik, FormikProvider, FieldArray, DatePicker, moment, SingleSelect, SaveButton, LuX, AddDispatchPlanningSchema, ToastContainer, toast, useNavigate, useDispatch, useSelector, driverListTodo, vehicleListTodo, routesListTodo, salesOrderRoutesListTodo, addDispatchPlanningTodo, lang, Loader, SalesOrderItem, salesOrderDetailsTodo } = DispatchPlanningImport

export default function AddDispatchPlanningForm() {

    const [soLoader, setSOLoader] = useState(false)
    const [soModal, setSOModal] = useState(false)
    const [soModalLoading, setSOModalLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const driver = useSelector(state => state && state.driverList && state.driverList.data)
    const vehicle = useSelector(state => state && state.vehicleList && state.vehicleList.data)
    const routes = useSelector(state => state && state.routesList && state.routesList.data)
    const sales_order_routes = useSelector(state => state && state.salesOrderRouteList && state.salesOrderRouteList.data)
    // console.log(sales_order_routes)

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
        dispatch_date: "",
        driver: "",
        vehicle: "",
        route: "",
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: AddDispatchPlanningSchema,
        enableReinitialize: true,

        onSubmit: (values, action) => {
            // console.log(values)
            dispatch(addDispatchPlanningTodo({ 'values': values })).then((res) => add_res(res.payload, action))
        }
    })

    const add_res = (res, action) => {
        if (res && res.status == 201) {
            toast.success(lang.dispatch_planning + ' ' + lang.success_add, { position: "bottom-right" })
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

    useEffect(() => {
        formik.setValues({
            ...formik.values,
            sales_order: sales_order_routes && sales_order_routes.map(val => ({
                so_id: val.id,
                so_code: val.code,
                customer_id: val.customer && val.customer.id,
                customer_name: val.customer && val.customer.name,
                delivery_date: val.deliveryDate
            }))
        });
    }, [sales_order_routes])

    useEffect(() => {
        dispatch(driverListTodo({ 'search': '' }))
        dispatch(vehicleListTodo({ 'search': '' }))
        dispatch(routesListTodo({ 'search': '' }))

        return () => {
            dispatch(salesOrderRoutesListTodo({ 'date': '', 'route': '0' }))
        }
    }, [])

    return (
        <>
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
                                                placeholder={'Choose Date'}
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
                                                defaultValue={""}
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
                                                defaultValue={""}
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
                                                disabled={false}
                                                option={routes_option ? routes_option : []}
                                                name='route'
                                                defaultValue={""}
                                                onChange={(e) => {
                                                    formik.setFieldValue('route', e.value);
                                                    setSOLoader(true)
                                                    dispatch(salesOrderRoutesListTodo({ 'date': '', 'route': e.value })).then((res) => {
                                                        if (res.payload && res.payload.status == 200) {
                                                            setSOLoader(false)
                                                        } else {
                                                            setSOLoader(false)
                                                        }
                                                    })
                                                }}
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

                                    {soLoader ?
                                        <Loader />
                                        :
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
                                    }
                                </div>
                            </div>

                            <div className="col-md-12">
                                <div style={{ position: 'fixed', bottom: '10px', right: '15px' }}>
                                    <SaveButton
                                        button_name={lang.submit}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
            </FormikProvider>

            <SalesOrderItem
                soModal={soModal}
                setSOModal={setSOModal}
                soModalLoading={soModalLoading}
            />

            <ToastContainer />
        </>
    )
}
