import React, { useEffect, useState } from 'react'
import { DispatchPlanningImport } from './Import'
import DispatchPlanningFilter from './DispatchPlanningFilter'
const { Link, LoginBanner, AddButton, DataTable, Search, PDF, Excel, Pagination, useDispatch, useSelector, Loader, useNavigate, DispatchPlanningAction, dispatchPlanningListTodo, ToastContainer, parseLinkHeader, moment, lang } = DispatchPlanningImport

export default function DispatchPlanningList() {

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
    const planning = useSelector(state => state && state.dispatchPlanningList && state.dispatchPlanningList.data)
    // console.log(planning)

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
            headerName: lang.table_planning_id,
            field: 'code',
            cellRenderer: (params) => <span className='text-primary fw-semibold' style={{ cursor: 'pointer' }} >{params.value}</span>,
            sortable: false,
        },
        {
            headerName: lang.table_date,
            field: 'date',
            cellRenderer: (params) => moment(params.value).format('DD/MM/YYYY'),
            sortable: false,
        },
        {
            headerName: lang.table_driver,
            field: 'driver.name',
            sortable: false,
        },
        {
            headerName: lang.table_driver_contact,
            field: 'driver.contactInfo',
            sortable: false,
        },
        {
            headerName: lang.table_vehicle,
            field: 'vehicle.make',
            sortable: false,
        },
        {
            headerName: lang.table_regitration_number,
            field: 'vehicle.registrationNumber',
            sortable: false,
        },
        {
            headerName: lang.table_route,
            field: 'route.name',
            sortable: false,
        },
        {
            field: lang.action,
            cellRenderer: DispatchPlanningAction,
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
        dispatch(dispatchPlanningListTodo({ 'search': `pageSize=${val}&pageNo=${0}` })).then((res) => planning_res(res.payload))
    }

    const prev = (page, size) => {
        setTableLoading(true)
        setCurrentPage(currentPage - 1)
        dispatch(dispatchPlanningListTodo({ 'search': `pageSize=${size}&pageNo=${page}` })).then((res) => planning_res(res.payload))
    }

    const next = (page, size) => {
        setTableLoading(true)
        setCurrentPage(currentPage + 1)
        dispatch(dispatchPlanningListTodo({ 'search': `pageSize=${size}&pageNo=${page}` })).then((res) => planning_res(res.payload))
    }

    const planning_res = (res, action) => {
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
        dispatch(dispatchPlanningListTodo({ 'search': `pageSize=${pageSize}&pageNo=${currentPage}` })).then((res) => planning_res(res.payload))
    }, [bool])

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">

                    <div className='layout d-flex justify-content-between align-items-end'>
                        <h6>{lang.dispatch_planning}</h6>

                        <div className='d-flex align-items-center'>

                            {permission.some(val => val.actionName == 'Add Dispatch Planning') ?
                                <Link to='/add-dispatch-planning'>
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
                                rowData={planning}
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

            <DispatchPlanningFilter
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
