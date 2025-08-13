import React, { useState, useEffect } from 'react'
import { ProductPricingImport } from './Import'
import ProductPricingFilter from './ProductPricingFilter'
const { Link, AddButton, LoginBanner, useNavigate, useDispatch, useSelector, Loader, Search, PDF, Excel, Pagination, DataTable, ToastContainer, parseLinkHeader, productPricingListTodo, moment, lang } = ProductPricingImport

export default function ProductPricingList() {

    const [filter, setFilter] = useState(false)
    const [loading, setLoading] = useState(true)
    const [tableLoading, setTableLoading] = useState(false)
    const [bool, setBool] = useState(false)
    const [totalRecord, setTotalRecord] = useState()
    const [pageSize, setPageSize] = useState(20)
    const [currentPage, setCurrentPage] = useState(0)
    const [headerLink, setHeaderLink] = useState()
    const [search, setSearch] = useState({ 'search': '', 'withEffectiveDate': '' })
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const price_list = useSelector(state => state.productPricingList && state.productPricingList.data)
    // console.log(price_list)

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
            headerName: lang.table_effective_date,
            field: 'withEffectiveDate',
            cellRenderer: (params) => moment(params.value).format('DD-MM-YYYY'),
            sortable: false,
        },
        {
            headerName: lang.table_sub_cat,
            field: 'itemMaster.subCategory.name',
            sortable: false,
        },
        {
            headerName: lang.table_brand,
            field: 'itemMaster.brandMaster.name',
            sortable: false,
        },
        {
            headerName: lang.table_item,
            field: 'itemMaster.name',
            sortable: false,
        },
        {
            headerName: lang.table_price,
            field: 'price',
            sortable: false,
        },
    ]

    const handleShow = () => setFilter(true)

    const perPage = (val) => {
        setTableLoading(true)
        setPageSize(val)
        setCurrentPage(0)
        dispatch(productPricingListTodo({ 'pageSize': val, 'pageNo': 0, 'search': search })).then((res) => product_price_res(res.payload))
    }

    const prev = (page, size) => {
        setTableLoading(true)
        setCurrentPage(currentPage - 1)
        dispatch(productPricingListTodo({ 'pageSize': size, 'pageNo': page, 'search': search })).then((res) => product_price_res(res.payload))
    }

    const next = (page, size) => {
        setTableLoading(true)
        setCurrentPage(currentPage + 1)
        dispatch(productPricingListTodo({ 'pageSize': size, 'pageNo': page, 'search': search })).then((res) => product_price_res(res.payload))
    }

    const product_price_res = (res) => {
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
        dispatch(productPricingListTodo({ 'pageSize': pageSize, 'pageNo': currentPage, 'search': search })).then((res) => product_price_res(res.payload))
    }, [bool])

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">

                        <div className='layout d-flex justify-content-between align-items-end'>
                            <h6>{lang.product_pricing}</h6>

                            <div className='d-flex align-items-center'>

                                {permission.some(val => val.actionName == 'Update Product Pricing') ?
                                    <Link to='/update-product-pricing'>
                                        <AddButton button_name={lang.add + '/' + lang.update} />
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
                                    rowData={price_list}
                                    columnDefs={columnDefs}
                                    loading={tableLoading}
                                />
                            </div>

                            <div className="col-md-12">
                                <Pagination
                                    per_page_default_value={pageSize}
                                    per_page_onChange={(e) => perPage(e.target.value)}
                                    left_disabled={tableLoading || headerLink && !headerLink.hasOwnProperty('prev')}
                                    left_onClick={() => prev(headerLink && headerLink.prev && headerLink.prev.page, headerLink && headerLink.prev && headerLink.prev.size)}
                                    currentPage={currentPage}
                                    pageSize={pageSize}
                                    totalRecord={totalRecord}
                                    right_disabled={tableLoading || headerLink && !headerLink.hasOwnProperty('next')}
                                    right_onClick={() => next(headerLink && headerLink.next && headerLink.next.page, headerLink && headerLink.next && headerLink.next.size)}
                                />
                            </div>
                        </>
                    }
                </div>
            </div>

            <ProductPricingFilter
                filter={filter}
                setFilter={setFilter}
                setTableLoading={setTableLoading}
                setCurrentPage={setCurrentPage}
                pageSize={pageSize}
                setHeaderLink={setHeaderLink}
                setTotalRecord={setTotalRecord}
                bool={bool}
                setBool={setBool}
                search={search}
                setSearch={setSearch}
            />
            <ToastContainer />
        </>
    )
}
