import React, { useEffect, useState } from 'react'
import { CustomerRouteAssignmentImport } from './Imports.js'
const { Form, useFormik, SaveButton, toast, ToastContainer, SingleSelect, Loader, useNavigate, useDispatch, useSelector, addCustomerRouteAssignmentTodo, AddCustomerRouteAssignmentSchema, customerListTodo, routesListTodo, lang } = CustomerRouteAssignmentImport

export default function AddCustomerRouteAssignmentForm() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const customer = useSelector(state => state.customerList && state.customerList.data)
    const routes = useSelector(state => state && state.routesList && state.routesList.data)
    // console.log(customer, 'customer')

    const customer_option = customer && customer.map(val => (
        { "value": val.id, "label": val.name }
    ))
    const route_option = routes && routes.map(val => (
        { "value": val.id, "label": val.name }
    ))

    const initialValues = {
        customer: "",
        route: "",
    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: initialValues,
        validationSchema: AddCustomerRouteAssignmentSchema,

        onSubmit: (values, action) => {
            // console.log(values, 'values')
            dispatch(addCustomerRouteAssignmentTodo({ 'values': values })).then((res) => add_res(res.payload, action))
        }
    })

    const add_res = (res, action) => {
        if (res && res.status == 201) {
            toast.success(lang.customer_route_assignment + ' ' + lang.success_add, { position: "bottom-right" })
            action.resetForm()
            setTimeout(() => {
                navigate('/customer-route-assignment-list')
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

    useEffect(() => {
        setLoading(true)
        dispatch(customerListTodo({ 'search': '' }))
        dispatch(routesListTodo({ 'search': '' }))
        setLoading(false)
    }, [])

    return (
        <>
            {loading ?
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="layout">
                                <Loader />
                            </div>
                        </div>
                    </div>
                </div>

                :
                
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
                                        defaultValue={""}
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
                                        defaultValue={""}
                                        onChange={(e) => {
                                            setFieldValue('route', e.value);
                                        }}
                                        onBlur={handleBlur}
                                        error={errors.route && touched.route ? (<span className='text-danger form_label' >{errors.route}</span>) : null}
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