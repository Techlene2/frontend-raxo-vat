import React, { useState, useEffect } from 'react'
import { VehicleImport } from './Imports'
import VehicleFilter from './VehicleFilter'
const { Link, LoginBanner, AddButton, DataTable, Search, PDF, Excel, Pagination, useDispatch, useSelector, Loader, useNavigate, VehicleAction, vehicleListTodo, ToastContainer, parseLinkHeader, lang } = VehicleImport

export default function VehicleList() {

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
    const vehicle = useSelector(state => state && state.vehicleList && state.vehicleList.data)
    // console.log(vehicle)

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
            headerName: lang.table_regitration_number,
            field: 'registrationNumber',
            sortable: false,
        },
        {
            headerName: lang.table_make,
            field: 'make',
            sortable: false,
        },
        {
            headerName: lang.table_model,
            field: 'model',
            sortable: false,
        },
        {
            headerName: lang.table_capacity,
            field: 'capacity',
            sortable: false,
        },
        {
            headerName: lang.table_current_status,
            field: 'currentStatus',
            sortable: false,
        },
        {
            field: lang.table_action,
            cellRenderer: VehicleAction,
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
        dispatch(vehicleListTodo({ 'search': `pageSize=${val}&pageNo=${0}` })).then((res) => vehicle_res(res.payload))
    }

    const prev = (page, size) => {
        setTableLoading(true)
        setCurrentPage(currentPage - 1)
        dispatch(vehicleListTodo({ 'search': `pageSize=${size}&pageNo=${page}` })).then((res) => vehicle_res(res.payload))
    }

    const next = (page, size) => {
        setTableLoading(true)
        setCurrentPage(currentPage + 1)
        dispatch(vehicleListTodo({ 'search': `pageSize=${size}&pageNo=${page}` })).then((res) => vehicle_res(res.payload))
    }

    const vehicle_res = (res, action) => {
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
        dispatch(vehicleListTodo({ 'search': `pageSize=${pageSize}&pageNo=${currentPage}` })).then((res) => vehicle_res(res.payload))
    }, [bool])


    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">

                    <div className='layout d-flex justify-content-between align-items-end'>
                        <h6>{lang.vehicle}</h6>

                        <div className='d-flex align-items-center'>

                            {permission.some(val => val.actionName == 'Add Vehicle') ?
                                <Link to='/add-vehicle'>
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
                                rowData={vehicle}
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

            <VehicleFilter
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
