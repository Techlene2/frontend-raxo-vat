import React, { useEffect, useState } from 'react'
import { CustomerImport } from './Imports'
import CustomerFilter from './CustomerFilter'
const { Link, LoginBanner, AddButton, DataTable, CustomerAction, useDispatch, useSelector, customerListTodo, Loader, ToastContainer, Search, PDF, Excel, Pagination, useNavigate, parseLinkHeader, lang } = CustomerImport

export default function CustomerList() {

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
    const customer = useSelector(state => state.customerList && state.customerList.data)
    // console.log(customer)

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
            headerName: lang.table_name,
            field: 'name',
            sortable: false,
        },
        {
            headerName: lang.table_grade,
            field: 'grade.name',
            sortable: false,
        },
        {
            headerName: lang.table_type,
            field: 'customerType.name',
            sortable: false,
        },
        {
            headerName: lang.table_city,
            field: 'city.name',
            sortable: false,
        },
        {
            headerName: lang.table_customer_group,
            field: 'customerGroup.name',
            sortable: false,
        },
        {
            headerName: lang.table_status,
            field: 'isActive',
            cellRenderer: params => params.value ? <span className='badge text-bg-success'>Active</span> : <span className='badge text-bg-danger'>Inactive</span>,
            sortable: false,
        },
        {
            field: lang.table_action,
            cellRenderer: CustomerAction,
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
        dispatch(customerListTodo({ 'search': `pageSize=${val}&pageNo=${0}` })).then((res) => customer_res(res.payload))
    }

    const prev = (page, size) => {
        setTableLoading(true)
        setCurrentPage(currentPage - 1)
        dispatch(customerListTodo({ 'search': `pageSize=${size}&pageNo=${page}` })).then((res) => customer_res(res.payload))
    }

    const next = (page, size) => {
        setTableLoading(true)
        setCurrentPage(currentPage + 1)
        dispatch(customerListTodo({ 'search': `pageSize=${size}&pageNo=${page}` })).then((res) => customer_res(res.payload))
    }

    const customer_res = (res, action) => {
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
        dispatch(customerListTodo({ 'search': `pageSize=${pageSize}&pageNo=${currentPage}` })).then((res) => customer_res(res.payload))
    }, [bool])

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">

                        <div className='layout d-flex justify-content-between align-items-end'>
                            <h6>{lang.customer}</h6>
                            <div className='d-flex align-items-center'>

                                {permission.some(val => val.actionName == 'Add Customer') ?
                                    <Link to='/add-customer'>
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
                                    rowData={customer}
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

            <CustomerFilter
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
