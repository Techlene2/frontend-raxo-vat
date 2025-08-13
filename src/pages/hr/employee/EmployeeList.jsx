import React, { useState, useEffect } from 'react'
import { EmployeeImport } from './Imports'
import EmployeeFilter from './EmployeeFilter'
import EmployeeDetails from './EmployeeDetails'
const { Link, LoginBanner, AddButton, Search, PDF, Excel, Pagination, DataTable, ToastContainer, Loader, useNavigate, useDispatch, useSelector, parseLinkHeader, employeeListTodo, EmployeeAction, lang } = EmployeeImport

export default function EmployeeList() {

    const [filter, setFilter] = useState(false)
    const [loading, setLoading] = useState(true)
    const [tableLoading, setTableLoading] = useState(false)
    const [bool, setBool] = useState(false)
    const [details, setDetails] = useState(false)
    const [detailsLoading, setDetailsLoading] = useState(false)
    const [totalRecord, setTotalRecord] = useState()
    const [pageSize, setPageSize] = useState(20)
    const [currentPage, setCurrentPage] = useState(0)
    const [headerLink, setHeaderLink] = useState()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const employee = useSelector(state => state && state.employeeList && state.employeeList.data)
    // console.log(employee)

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
            field: 'firstName',
            valueGetter: (params) => {
                return params.data.firstName + ' ' + params.data.lastName;
            },
            sortable: false,
        },
        {
            headerName: lang.table_gender,
            field: 'gender',
            sortable: false,
        },
        {
            headerName: lang.table_mobile_no,
            field: 'mobileNo',
            sortable: false,
        },
        {
            headerName: lang.table_city,
            field: 'city.name',
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
            cellRenderer: EmployeeAction,
            cellRendererParams: {
                bool: bool,
                setBool: setBool,
                setLoading: setLoading,
                details: details,
                setDetails: setDetails,
                setDetailsLoading: setDetailsLoading,
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
        dispatch(employeeListTodo({ 'search': `pageSize=${val}&pageNo=${0}` })).then((res) => employee_res(res.payload))
    }

    const prev = (page, size) => {
        setTableLoading(true)
        setCurrentPage(currentPage - 1)
        dispatch(employeeListTodo({ 'search': `pageSize=${size}&pageNo=${page}` })).then((res) => employee_res(res.payload))
    }

    const next = (page, size) => {
        setTableLoading(true)
        setCurrentPage(currentPage + 1)
        dispatch(employeeListTodo({ 'search': `pageSize=${size}&pageNo=${page}` })).then((res) => employee_res(res.payload))
    }

    const employee_res = (res) => {
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
        dispatch(employeeListTodo({ 'search': `pageSize=${pageSize}&pageNo=${currentPage}` })).then((res) => employee_res(res.payload))
    }, [bool])

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">

                    <div className='layout d-flex justify-content-between align-items-end'>
                        <h6>{lang.employee}</h6>
                        <div className='d-flex align-items-center'>

                            {permission.some(val => val.actionName == 'Add Employee') ?
                                <Link to='/add-employee'>
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
                                rowData={employee}
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

            <EmployeeFilter
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

            <EmployeeDetails
                details={details}
                setDetails={setDetails}
                detailsLoading={detailsLoading}
                setDetailsLoading={setDetailsLoading}
            />
            <ToastContainer />
        </div>
    )
}
