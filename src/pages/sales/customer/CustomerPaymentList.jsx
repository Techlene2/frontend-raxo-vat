import React from 'react'
import { CustomerImport } from './Imports'
const { DataTable, Form, Button, Tooltip, CustomerAction, LuChevronLeft, LuChevronRight, LuFileSpreadsheet, LuFileText, LuFilter } = CustomerImport

export default function CustomerPaymentList() {

    const rowData = [
        { order: "ABC001", amount: "1500", date: new Date().toLocaleDateString('en-GB'), status: 'delivered' },
        { order: "ABC001", amount: "1500", date: new Date().toLocaleDateString('en-GB'), status: 'pending' },
        { order: "ABC001", amount: "1500", date: new Date().toLocaleDateString('en-GB'), status: 'dispatched' },
        { order: "ABC001", amount: "1500", date: new Date().toLocaleDateString('en-GB'), status: 'delivered' },
        { order: "ABC001", amount: "1500", date: new Date().toLocaleDateString('en-GB'), status: 'cancelled' },
        { order: "ABC001", amount: "1500", date: new Date().toLocaleDateString('en-GB'), status: 'dispatched' },
        { order: "ABC001", amount: "1500", date: new Date().toLocaleDateString('en-GB'), status: 'delivered' },
        { order: "ABC001", amount: "1500", date: new Date().toLocaleDateString('en-GB'), status: 'pending' },
        { order: "ABC001", amount: "1500", date: new Date().toLocaleDateString('en-GB'), status: 'cancelled' },
        { order: "ABC001", amount: "1500", date: new Date().toLocaleDateString('en-GB'), status: 'delivered' },
        { order: "ABC001", amount: "1500", date: new Date().toLocaleDateString('en-GB'), status: 'cancelled' },
        { order: "ABC001", amount: "1500", date: new Date().toLocaleDateString('en-GB'), status: 'pending' },
        { order: "ABC001", amount: "1500", date: new Date().toLocaleDateString('en-GB'), status: 'dispatched' },
    ]

    const columnDefs = [
        {
            headerName: 'S.No.',
            valueGetter: 'node.rowIndex + 1',
            filter: 'false',
            suppressMenu: true,
            sortable: true,
            floatingFilter: false,
            // wrapText: true,
            // autoHeight: true,
            width: 100
        },
        {
            headerName: 'ORDER ID',
            field: 'order',
            filter: 'agTextColumnFilter',
            suppressMenu: true,
            filter: true,
            sortable: true,
            floatingFilter: false,
            // wrapText: true,
            // autoHeight: true,
        },
        {
            headerName: 'AMOUNT',
            field: 'amount',
            filter: 'agTextColumnFilter',
            suppressMenu: true,
            filter: true,
            sortable: true,
            floatingFilter: false,
            // wrapText: true,
            // autoHeight: true,
        },
        {
            headerName: 'DATE',
            field: 'date',
            filter: 'agTextColumnFilter',
            suppressMenu: true,
            filter: true,
            sortable: true,
            floatingFilter: false,
            // wrapText: true,
            // autoHeight: true,
        },
        {
            headerName: 'STATUS',
            field: 'status',
            filter: 'agTextColumnFilter',
            cellRenderer: params => params.value == 'delivered' ? <span className='badge text-bg-success'>Delivered</span> : params.value == 'cancelled' ? <span className='badge text-bg-danger'>Cancelled</span> : params.value == 'pending' ? <span className='badge text-bg-warning'>Pending</span> : params.value == 'dispatched' ? <span className='badge text-bg-primary'>Dispatched</span> : '',
            suppressMenu: true,
            filter: true,
            sortable: true,
            floatingFilter: false,
            // wrapText: true,
            // autoHeight: true,
        },
        {
            field: 'ACTIONS',
            cellRenderer: CustomerAction,
            cellRendererParams: {
                // detailModal: setDetailModal,
                // modalLoading: setModalLoading,
            },
            // wrapText: true,
            autoHeight: true,
            pinned: 'right',
        }
    ]

    return (
        <>
            <div className="d-flex justify-content-between align-items-center" style={{ marginBottom: '15px' }}>
                <Form.Group className="" controlId="text">
                    <Form.Control
                        type="text"
                        placeholder='Search'
                        disabled={false}
                        className='form_input'
                    // name={name}
                    // value={value}
                    // onChange={onChange}
                    // onBlur={onBlur}
                    />
                </Form.Group>

                <div>
                    <Button
                        variant="danger"
                        className='me-2'
                        data-tooltip-id='pdf'
                        data-tooltip-content="Download PDF!"
                        data-tooltip-place="bottom"
                    >
                        <LuFileText className='mb-1' size={18} />
                    </Button>

                    <Button
                        variant="success"
                        className='me-2'
                        data-tooltip-id='excel'
                        data-tooltip-content="Download Excel!"
                        data-tooltip-place="bottom"
                    >
                        <LuFileSpreadsheet className='mb-1' size={18} />
                    </Button>

                    <Button
                        variant="primary"
                        data-tooltip-id='filter'
                        data-tooltip-content="Filter!"
                        data-tooltip-place="bottom"
                    // onClick={handleShow}
                    >
                        <LuFilter className='mb-1' size={18} style={{ color: 'white' }} />
                    </Button>

                    <Tooltip id='pdf' className='bg-danger' style={{ zIndex: '9' }} />
                    <Tooltip id='excel' className='bg-success' style={{ zIndex: '9' }} />
                    <Tooltip id='filter' className='bg-primary' style={{ zIndex: '9' }} />

                </div>

            </div>

            <DataTable
                rowData={rowData}
                columnDefs={columnDefs}
                height={'40vh'}
            />

            <div className="data_table_footer">
                <div className='row'>
                    <div className="col-md-6"> </div>
                    <div className="col-md-6">
                        <div className='d-flex justify-content-end align-items-center'>
                            <div className="table_footer_pagesize d-flex align-items-end" style={{ marginRight: '15px' }}>
                                <Form.Label>Items Per Page :</Form.Label>&nbsp;
                                <Form.Select size="sm" className='form_input' style={{ width: '67px' }}>
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                </Form.Select>
                            </div>
                            <div className='d-flex align-items-baseline table_footer_pagination' style={{ marginRight: '15px' }}>
                                <span className='me-2' style={{ cursor: "pointer" }}>
                                    <LuChevronLeft style={{ marginBottom: '1px' }} size={20} />
                                </span>
                                <div className='d-flex align-items-center'>
                                    <p>
                                        <span>101</span> - <span>105</span> of  <span> 401</span>
                                    </p>
                                </div>
                                <span style={{ cursor: "pointer" }} className='ms-2'>
                                    <LuChevronRight style={{ marginBottom: '1px' }} size={20} />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
