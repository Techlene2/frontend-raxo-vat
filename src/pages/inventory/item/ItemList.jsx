import React, { useState, useEffect } from 'react'
import { ItemImport } from './Imports'
import ItemFilter from './ItemFilter'
import ItemDetails from './ItemDetails'
const { AddButton, Link, Search, PDF, Excel, Pagination, Loader, ToastContainer, useNavigate, useDispatch, useSelector, itemListTodo, parseLinkHeader, DataTable, ItemAction, NotFoundImage, lang } = ItemImport

export default function ItemList() {

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
    const item = useSelector(state => state.itemList && state.itemList.data)
    // console.log(item)

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
            headerName: lang.table_image,
            field: 'imageUrl',
            cellRenderer: (params) => <img src={params.value ? params.value : ''} alt="img" className='img-fluid' style={{ 'height': '25px' }} onError={(e) => { e.target.src = NotFoundImage; e.target.style.height = '25px' }} />,
            sortable: false,
            maxWidth: 100
        },
        {
            headerName: lang.table_sub_category,
            field: 'subCategory.name',
            sortable: false,
        },
        {
            headerName: lang.table_item_code,
            field: 'code',
            sortable: false,
        },
        {
            headerName: lang.table_name,
            field: 'name',
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
            cellRenderer: ItemAction,
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
        dispatch(itemListTodo({ 'search': `pageSize=${val}&pageNo=${0}` })).then((res) => item_res(res.payload))
    }

    const prev = (page, size) => {
        setTableLoading(true)
        setCurrentPage(currentPage - 1)
        dispatch(itemListTodo({ 'search': `pageSize=${size}&pageNo=${page}` })).then((res) => item_res(res.payload))
    }

    const next = (page, size) => {
        setTableLoading(true)
        setCurrentPage(currentPage + 1)
        dispatch(itemListTodo({ 'search': `pageSize=${size}&pageNo=${page}` })).then((res) => item_res(res.payload))
    }

    const item_res = (res) => {
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
        dispatch(itemListTodo({ 'search': `pageSize=${pageSize}&pageNo=${currentPage}` })).then((res) => item_res(res.payload))
    }, [bool])

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">

                        <div className='layout d-flex justify-content-between align-items-end'>
                            <h6>{lang.item}</h6>

                            <div className='d-flex align-items-center'>

                                {permission.some(val => val.actionName == 'Add Item') ?
                                    <Link to='/add-item'>
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
                                    rowData={item}
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

                <ItemFilter
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

                <ItemDetails
                    details={details}
                    setDetails={setDetails}
                    detailsLoading={detailsLoading}
                    setDetailsLoading={setDetailsLoading}
                />
                <ToastContainer />
            </div>
        </>
    )
}
