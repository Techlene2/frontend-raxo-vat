import React, { useEffect, useState } from 'react'
import { CustomerSalesOrderImport } from './Import'
import SalesOrderFilter from './SalesOrderFilter'
const { Link, LoginBanner, AddButton, DataTable, Search, PDF, Excel, Pagination, ToastContainer, Loader, useNavigate, useDispatch, useSelector, parseLinkHeader, salesOrderListTodo, CustomerSalesOrderAction, moment, lang, salesOrderDetailsTodo, SalesOrderItem } = CustomerSalesOrderImport

export default function CustomerSalesOrderList() {

    const [filter, setFilter] = useState(false)
    const [loading, setLoading] = useState(true)
    const [tableLoading, setTableLoading] = useState(false)
    const [bool, setBool] = useState(false)
    const [totalRecord, setTotalRecord] = useState()
    const [pageSize, setPageSize] = useState(20)
    const [currentPage, setCurrentPage] = useState(0)
    const [headerLink, setHeaderLink] = useState()
    const [soModal, setSOModal] = useState(false)
    const [soModalLoading, setSOModalLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const sales_order = useSelector(state => state && state.salesOrderList && state.salesOrderList.data)
    // console.log(sales_order)

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
            headerName: lang.table_sales_order_code,
            field: 'code',
            cellRenderer: (params) => <span className='text-primary fw-semibold' style={{ cursor: 'pointer' }} onClick={() => sales_order_modal(params.data)}>{params.value}</span>,
            sortable: false,
        },
        {
            headerName: lang.table_booking_date,
            field: 'bookingDate',
            valueGetter: (params) => {
                return moment(params.data.bookingDate).format('DD-MM-YYYY');
            },
            sortable: false,
        },
        {
            headerName: lang.table_delivery_date,
            field: 'deliveryDate',
            valueGetter: (params) => {
                return moment(params.data.deliveryDate).format('DD-MM-YYYY');
            },
            sortable: false,
        },
        {
            headerName: lang.table_customer,
            field: 'customer.name',
            sortable: false,
        },
        {
            headerName: lang.table_city,
            field: 'customer.city.name',
            sortable: false,
        },
        {
            headerName: lang.table_username,
            field: 'user',
            valueGetter: (params) => {
                return params.data.user.firstName + ' ' + params.data.user.lastName;
            },
            sortable: false,
        },
        {
            field: lang.table_action,
            cellRenderer: CustomerSalesOrderAction,
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
    const sales_order_modal = (data) => {
        setSOModalLoading(true)
        dispatch(salesOrderDetailsTodo({ 'id': data.id })).then((res) => {
            if (res.payload && res.payload.status == 200) {
                setSOModalLoading(false)
            } else {
                setSOModalLoading(false)
            }
        })
        setSOModal(true)
    }

    const perPage = (val) => {
        setTableLoading(true)
        setPageSize(val)
        setCurrentPage(0)
        dispatch(salesOrderListTodo({ 'search': `pageSize=${val}&pageNo=${0}` })).then((res) => sales_order_res(res.payload))
    }

    const prev = (page, size) => {
        setTableLoading(true)
        setCurrentPage(currentPage - 1)
        dispatch(salesOrderListTodo({ 'search': `pageSize=${size}&pageNo=${page}` })).then((res) => sales_order_res(res.payload))
    }

    const next = (page, size) => {
        setTableLoading(true)
        setCurrentPage(currentPage + 1)
        dispatch(salesOrderListTodo({ 'search': `pageSize=${size}&pageNo=${page}` })).then((res) => sales_order_res(res.payload))
    }

    const sales_order_res = (res) => {
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
        dispatch(salesOrderListTodo({ 'search': `pageSize=${pageSize}&pageNo=${currentPage}` })).then((res) => sales_order_res(res.payload))
    }, [bool])

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">

                        <div className='layout d-flex justify-content-between align-items-end'>
                            <h6>{lang.sales_order}</h6>
                            <div className='d-flex align-items-center'>

                                {permission.some(val => val.actionName == 'Add Customer Sales Order') ?
                                    <Link to='/add-customer-sales-order'>
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
                                    rowData={sales_order}
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

            <SalesOrderFilter
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

            <SalesOrderItem
                soModal={soModal}
                setSOModal={setSOModal}
                soModalLoading={soModalLoading}
            />
        </>
    )
}
