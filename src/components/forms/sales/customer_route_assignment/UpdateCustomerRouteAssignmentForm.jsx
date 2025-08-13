import React, { useEffect, useState } from 'react'
import { CustomerRouteAssignmentImport } from './Imports.js'
const { Form, useFormik, SaveButton, toast, ToastContainer, SingleSelect, useDispatch, useSelector, useNavigate, useLocation, AddCustomerRouteAssignmentSchema, updateCustomerRouteAssignmentTodo, customerRouteAssignmentDetailsTodo, customerListTodo, routesListTodo, Loader, lang } = CustomerRouteAssignmentImport

export default function UpdateCustomerRouteAssignmentForm() {

    const [loading, setLoading] = useState(true)
    const [breakLoading, setBreakLoading] = useState(true)

    const { state } = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const customer = useSelector(state => state.customerList && state.customerList.data)
    const routes = useSelector(state => state && state.routesList && state.routesList.data)
    const customerDetails = useSelector(state => state.customerRouteAssignmentDetails && state.customerRouteAssignmentDetails.data)
    // console.log(customerDetails, 'detal')

    const customer_option = customer && customer.map(val => (
        { "value": val.id, "label": val.name }
    ))
    const route_option = routes && routes.map(val => (
        { "value": val.id, "label": val.name }
    ))

    const initialValues = {
        id: customerDetails && customerDetails.id,
        customer: customerDetails && customerDetails.customer && customerDetails.customer.id,
        route: customerDetails && customerDetails.route && customerDetails.route.id,
    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: initialValues,
        validationSchema: AddCustomerRouteAssignmentSchema,
        enableReinitialize: true,

        onSubmit: (values, action) => {
            // console.log("values", values)
            dispatch(updateCustomerRouteAssignmentTodo({ 'values': values })).then((res) => update_res(res.payload, action))
        }
    })

    const update_res = (res, action) => {
        if (res && res.status == 200) {
            toast.success(lang.customer_route_assignment + ' ' + lang.success_update, { position: "bottom-right" })
            action.resetForm()
            setTimeout(() => {
                navigate('/customer-route-assignment-list')
            }, 1500);
        } else if (res && res.status == 401) {
            localStorage.clear()
            navigate('/login')
        } else if (res && res.status == 400) {
            toast.error("400", { position: "bottom-right" })
        } else {
            toast.error(lang.wrong, { position: "bottom-right" })
        }
    }

    const route_assignment_res = (res) => {
        if (res && res.status == 200) {
            dispatch(customerListTodo({ 'search': '' })).then((customer_res) => {

                if (customer_res.payload && customer_res.payload.status == 200) {
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
        dispatch(customerRouteAssignmentDetailsTodo({ 'id': state })).then((res) => route_assignment_res(res.payload))
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
                                            <SingleSelect
                                                closeMenu={true}
                                                label_name={lang.customer}
                                                // placeholder=''
                                                disabled={false}
                                                option={customer_option ? customer_option : []}
                                                name='customer'
                                                defaultValue={customer_option && customer_option.find((option) => option.value == values.customer)}
                                                onChange={(e) => {
                                                    setFieldValue('customer', e.value);
                                                }}
                                                onBlur={handleBlur}
                                                error={errors.customer && touched.customer ? (<span className='text-danger form_label' >{errors.customer}</span>) : null}
                                            />
                                        </div>

                                        <div className="col-md-3">
                                            <SingleSelect
                                                closeMenu={true}
                                                label_name={lang.route}
                                                // placeholder=''
                                                disabled={false}
                                                option={route_option ? route_option : []}
                                                name='route'
                                                defaultValue={route_option && route_option.find((option) => option.value == values.route)}
                                                onChange={(e) => {
                                                    setFieldValue('route', e.value);
                                                }}
                                                onBlur={handleBlur}
                                                error={errors.route && touched.route ? (<span className='text-danger form_label' >{errors.route}</span>) : null}
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