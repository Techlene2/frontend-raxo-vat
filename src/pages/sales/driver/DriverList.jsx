import React, { useState, useEffect } from 'react'
import { DriverImport } from './Imports'
import DriverFilter from './DriverFilter'
const { Link, LoginBanner, AddButton, DataTable, Search, PDF, Excel, Pagination, useDispatch, useSelector, Loader, useNavigate, DriverAction, driverListTodo, ToastContainer, parseLinkHeader, lang } = DriverImport

export default function DriverList() {

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
    const driver = useSelector(state => state && state.driverList && state.driverList.data)
    // console.log(driver)

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
            headerName: lang.table_gender,
            field: 'gender',
            sortable: false,
        },
        {
            headerName: lang.table_contact,
            field: 'contactInfo',
            sortable: false,
        },
        {
            headerName: lang.table_license_number,
            field: 'licenseNumber',
            sortable: false,
        },
        {
            headerName: lang.table_license_expiry_date,
            field: 'licenseExpiryDate',
            sortable: false,
        },
        {
            field: lang.table_action,
            cellRenderer: DriverAction,
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
        dispatch(driverListTodo({ 'search': `pageSize=${val}&pageNo=${0}` })).then((res) => driver_res(res.payload))
    }

    const prev = (page, size) => {
        setTableLoading(true)
        setCurrentPage(currentPage - 1)
        dispatch(driverListTodo({ 'search': `pageSize=${size}&pageNo=${page}` })).then((res) => driver_res(res.payload))
    }

    const next = (page, size) => {
        setTableLoading(true)
        setCurrentPage(currentPage + 1)
        dispatch(driverListTodo({ 'search': `pageSize=${size}&pageNo=${page}` })).then((res) => driver_res(res.payload))
    }

    const driver_res = (res, action) => {
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
        dispatch(driverListTodo({ 'search': `pageSize=${pageSize}&pageNo=${currentPage}` })).then((res) => driver_res(res.payload))
    }, [bool])


    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">

                    <div className='layout d-flex justify-content-between align-items-end'>
                        <h6>{lang.driver}</h6>

                        <div className='d-flex align-items-center'>

                            {permission.some(val => val.actionName == 'Add Driver') ?
                                <Link to='/add-driver'>
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
                                rowData={driver}
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

            <DriverFilter
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
        </div>
    )
}
