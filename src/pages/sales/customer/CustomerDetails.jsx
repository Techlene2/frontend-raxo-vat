import React, { useEffect, useState } from 'react'
import { CustomerImport } from './Imports'
import CustomerOrderList from './CustomerOrderList'
import CustomerPaymentList from './CustomerPaymentList'
const { LuPcCase, Tab, Tabs, CustomerImg, PerfectScrollbar, Loader, useDispatch, customerTodo, useNavigate, useLocation, useSelector } = CustomerImport

export default function CustomerDetails() {

    const [loading, setLoading] = useState(true)
    const [breakLoading, setBreakLoading] = useState(true)
    const { state } = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const customer_details = useSelector(state => state.customer && state.customer.data)
    // console.log(customer_details)

    const customer_res = (res) => {
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
        dispatch(customerTodo({ 'method': 'GET', 'values': '', 'id': state, 'status': '', 'search': "" })).then((res) => customer_res(res.payload))

    }, [])


    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className='layout '>
                            <h5>Customer Details</h5>
                        </div>
                    </div>

                    {loading && breakLoading ?

                        <div className="col-md-12">
                            <div className="layout">
                                <Loader />
                            </div>
                        </div>

                        :

                        loading && !breakLoading ?

                            <div className="col-md-12">
                                <div className='layout'>
                                    <div className='text-center'>
                                        <h5>Something went wrong can't able to load customer details</h5>
                                    </div>
                                </div>
                            </div>

                            :

                            !loading && !breakLoading ?

                                <>
                                    <div className="col-md-3">
                                        <div className="profile_sec">
                                            <PerfectScrollbar>
                                                <div className='ps-3 pe-3'>
                                                    <div className="user_img_section mt-3">
                                                        <img src={CustomerImg} alt="userImg" className='img-fluid user_img' />
                                                    </div>
                                                    <div className='user_name_details'>
                                                        <h5>{customer_details && customer_details.name}</h5>
                                                    </div>
                                                    <hr />
                                                    <div className='d-flex justify-content-between align-items-center mt-1'>
                                                        <p>Pan No.  </p>
                                                        <span>{customer_details && customer_details.panNo}</span>
                                                    </div>
                                                    <hr />
                                                    <div className='d-flex justify-content-between align-items-center mt-1'>
                                                        <p>Tin No.</p>
                                                        <span>{customer_details && customer_details.tinNo}</span>
                                                    </div>
                                                    <hr />
                                                    <div className='d-flex justify-content-between align-items-center mt-1'>
                                                        <p>Longitude</p>
                                                        <span>{customer_details && customer_details.longitude}</span>
                                                    </div>
                                                    <hr />
                                                    <div className='d-flex justify-content-between align-items-center mt-1'>
                                                        <p>Lattitude</p>
                                                        <span>{customer_details && customer_details.lattitude}</span>
                                                    </div>
                                                    <hr />
                                                    <div className='d-flex justify-content-between align-items-center mt-1'>
                                                        <p>City</p>
                                                        <span>{customer_details && customer_details.city && customer_details.city.name}</span>
                                                    </div>
                                                    <hr />
                                                    <div className='d-flex justify-content-between align-items-center mt-1'>
                                                        <p>State</p>
                                                        <span>{customer_details && customer_details.city && customer_details.city.state && customer_details.city.state.name}</span>
                                                    </div>
                                                    <hr />
                                                    <div className='d-flex justify-content-between align-items-center mt-1'>
                                                        <p>Country</p>
                                                        <span>{customer_details && customer_details.city && customer_details.city.state && customer_details.city.state.country && customer_details.city.state.country.name}</span>
                                                    </div>
                                                    <hr />
                                                    <div className=' mt-1'>
                                                        <p>Source App</p>
                                                        <span>{customer_details && customer_details.sourceApp}</span>
                                                    </div>
                                                    <hr />
                                                    <div className='mt-1'>
                                                        <p>Postal Code</p>
                                                        <span>{customer_details && customer_details.postalCode}</span>
                                                    </div>
                                                    <hr />
                                                    <div className='mt-1'>
                                                        <p>Address</p>
                                                        <span>{customer_details && customer_details.address}</span>
                                                    </div>
                                                </div>
                                            </PerfectScrollbar>
                                        </div>
                                    </div>
                                    <div className="col-md-9">
                                        <div className="row">
                                            <div className="col-md-3">
                                                <div className="card dashboard_card text-center  h-100" >
                                                    <div className='d-flex justify-content-around align-items-center '>
                                                        <span className=''>
                                                            < LuPcCase size={30} style={{ color: "#4e58ad" }} />
                                                        </span>
                                                        <div className=''>
                                                            <p> Sales</p>
                                                            <span className='text-center'>2500000 </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-3">
                                                <div className="card dashboard_card text-center  h-100" >
                                                    <div className='d-flex justify-content-around align-items-center '>
                                                        <span className=''>
                                                            < LuPcCase size={30} style={{ color: "#4e58ad" }} />
                                                        </span>
                                                        <div className=''>
                                                            <p>Payment</p>
                                                            <span className='text-center'>1000000</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-3">
                                                <div className="card dashboard_card text-center  h-100" >
                                                    <div className='d-flex justify-content-around align-items-center '>
                                                        <span className=''>
                                                            < LuPcCase size={30} style={{ color: "#4e58ad" }} />
                                                        </span>
                                                        <div className=''>
                                                            <p>Total Orders</p>
                                                            <span className='text-center'>40</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-3">
                                                <div className="card dashboard_card text-center  h-100" >
                                                    <div className='d-flex justify-content-around align-items-center '>
                                                        <span className=''>
                                                            < LuPcCase size={30} style={{ color: "#4e58ad" }} />
                                                        </span>
                                                        <div className=''>
                                                            <p>Pending Orders</p>
                                                            <span className='text-center'>10</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-12">
                                                <div className='layout mt-2'>
                                                    <Tabs
                                                        defaultActiveKey="Orders"
                                                        id="fill-tab-example"
                                                        className="mb-2 piils_btn"
                                                    >
                                                        <Tab eventKey="Orders" title={<span>Orders </span>}>
                                                            <CustomerOrderList />
                                                        </Tab>
                                                        <Tab eventKey="Payment" title={<span>Payment</span>}>
                                                            <CustomerPaymentList />
                                                        </Tab>
                                                    </Tabs>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                                : ''
                    }
                </div>
            </div>
        </>
    )
}
