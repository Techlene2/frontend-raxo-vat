import React, { useEffect, useState } from 'react'
import { CustomerRouteAssignmentImport } from './Import.js'
import CustomerRouteAssignmentFilter from './CustomerRouteAssignmentFilter.jsx'
const { Link, LoginBanner, AddButton, DataTable, Search, PDF, Excel, Pagination, ToastContainer, Loader, CustomerRouteAssignmentAction, customerRouteAssignmentListTodo, useNavigate, useDispatch, useSelector, parseLinkHeader, lang } = CustomerRouteAssignmentImport

export default function CustomerRouteAssignmentList() {

    const [filter, setFilter] = useState(false)
    const [loading, setLoading] = useState(true)
    const [tableLoading, setTableLoading] = useState(false)
    const [bool, setBool] = useState(false)
    const [totalRecord, setTotalRecord] = useState()
    const [pageSize, setPageSize] = useState(20)
    const [currentPage, setCurrentPage] = useState(0)
    const [headerLink, setHeaderLink] = useState()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const CustomerRouteAssignment = useSelector(state => state && state.customerRouteAssignmentList && state.customerRouteAssignmentList.data)
    // console.log(CustomerRouteAssignment)

    var permission = JSON.parse(localStorage.getItem('permission'))

    const columnDefs = [
        {
            headerName: lang.table_no,
            field: 'fieldName',
            valueGetter: `${currentPage * pageSize} + (node.rowIndex + 1)`,
            sortable: true,
            maxWidth: 70
        },
        {
            headerName: lang.table_customer,
            field: 'customer.name',
            sortable: false,
        },
        {
            headerName: lang.table_route,
            field: 'route.name',
            sortable: false,
        },
        {
            field: lang.table_action,
            cellRenderer: CustomerRouteAssignmentAction,
            cellRendererParams: {
                bool: bool,
                setBool: setBool,
                setLoading: setLoading,
            },
            sortable: false,
            autoHeight: true,
            pinned: localStorage.getItem('lang_key') == 'ar' ? 'left' : 'right',
        }
    ]

    const handleShow = () => setFilter(true)

    const perPage = (val) => {
        setTableLoading(true)
        setPageSize(val)
        setCurrentPage(0)
        dispatch(customerRouteAssignmentListTodo({ 'search': `pageSize=${val}&pageNo=${0}` })).then((res) => customer_route_assign_res(res.payload))
    }

    const prev = (page, size) => {
        setTableLoading(true)
        setCurrentPage(currentPage - 1)
        dispatch(customerRouteAssignmentListTodo({ 'search': `pageSize=${size}&pageNo=${page}` })).then((res) => customer_route_assign_res(res.payload))
    }

    const next = (page, size) => {
        setTableLoading(true)
        setCurrentPage(currentPage + 1)
        dispatch(customerRouteAssignmentListTodo({ 'search': `pageSize=${size}&pageNo=${page}` })).then((res) => customer_route_assign_res(res.payload))
    }

    const customer_route_assign_res = (res) => {
        if (res && res.status == 200) {
            const parsed = parseLinkHeader(res.headers.link)
            setHeaderLink(parsed)
            setTotalRecord(parseInt(res.headers.get('x-Total-Count')))
            setTableLoading(false)
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
        dispatch(customerRouteAssignmentListTodo({ 'search': `pageSize=${pageSize}&pageNo=${currentPage}` })).then((res) => customer_route_assign_res(res.payload))
    }, [bool])

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">

                        <div className='layout d-flex justify-content-between align-items-end'>
                            <h6>{lang.customer_route_assignment}</h6>
                            <div className='d-flex align-items-center'>

                                {permission.some(val => val.actionName == 'Add Customer Route Assignment') ?
                                    <Link to='/add-customer-route-assignment'>
                                        <AddButton button_name={lang.add} />
                                    </Link>
                                    : ''
                                }

                                <Search
                                    onClick={() => handleShow()}
                                    tooltip_content={lang.filter}
                                />

                                <PDF
                                    onClick={() => ''}
                                    tooltip_content={lang.download + ' ' + lang.pdf}
                                />

                                <Excel
                                    onClick={() => ''}
                                    tooltip_content={lang.download + ' ' + lang.excel}
                                />

                            </div>
                        </div>
                    </div>
                    {loading ?
                        <div className="col-md-12">
                            <div className="layout">
                                <Loader />
                            </div>
                        </div>
                        :
                        <>

                            <div className="col-md-12">
                                <DataTable
                                    rowData={CustomerRouteAssignment}
                                    columnDefs={columnDefs}
                                    loading={tableLoading}
                                />
                            </div>

                            <div className="col-md-12">
                                <Pagination
                                    per_page_default_value={pageSize}
                                    per_page_onChange={(e) => perPage(e.target.value)}
                                    left_disabled={headerLink && !headerLink.hasOwnProperty('prev')}
                                    left_onClick={() => prev(headerLink && headerLink.prev && headerLink.prev.page, headerLink && headerLink.prev && headerLink.prev.size)}
                                    currentPage={currentPage}
                                    pageSize={pageSize}
                                    totalRecord={totalRecord}
                                    right_disabled={headerLink && !headerLink.hasOwnProperty('next')}
                                    right_onClick={() => next(headerLink && headerLink.next && headerLink.next.page, headerLink && headerLink.next && headerLink.next.size)}
                                />
                            </div>
                        </>
                    }
                </div>

            </div>

            <CustomerRouteAssignmentFilter
                filter={filter}
                setFilter={setFilter}
                setTableLoading={setTableLoading}
                setCurrentPage={setCurrentPage}
                pageSize={pageSize}
                setHeaderLink={setHeaderLink}
                setTotalRecord={setTotalRecord}
                bool={bool}
                setBool={setBool}
            />
            <ToastContainer />
        </>
    )
}
