import React from 'react'
import { Button, Form, InputGroup, Stack } from 'react-bootstrap'

export default function Pagination(props) {

    const { per_page_default_value, per_page_onChange, left_disabled, left_onClick, currentPage, pageSize, totalRecord, right_disabled, right_onClick } = props

    return (
        <>
            <div className="data_table_footer">
                <Stack direction="horizontal" gap={0}>

                    <div className="col-md-8"></div>
                    <div className="col-md-2">
                        <InputGroup size="sm">
                            <InputGroup.Text id="inputGroup-sizing-sm">Page Size</InputGroup.Text>
                            <Form.Select className='form_select' defaultValue={per_page_default_value} onChange={per_page_onChange}>
                                <option value={20}>20</option>
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                                <option value={500}>500</option>
                            </Form.Select>
                        </InputGroup>
                    </div>

                    <div className="col-md-2">
                        <nav aria-label="Page navigation example">
                            <ul className="pagination pagination-sm justify-content-center mb-0">
                                <li className="page-item">
                                    <Button
                                        variant="light"
                                        size='sm'
                                        className='page-link'
                                        disabled={left_disabled}
                                        onClick={left_onClick}
                                        style={{ border: '1px solid #dee2e6', borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                                    >
                                       Previous
                                    </Button>
                                </li>
                                <li className="page-item page-link text-secondary">
                                    <span>{((currentPage * pageSize) + 1) > totalRecord ? totalRecord : (currentPage * pageSize) + 1}</span> - <span>{((currentPage + 1) * pageSize) > totalRecord ? totalRecord : ((currentPage + 1) * pageSize)}</span> of  <span> {totalRecord}</span>
                                </li>
                                <li className="page-item">
                                    <Button
                                        variant="light"
                                        size='sm'
                                        className='page-link'
                                        disabled={right_disabled}
                                        onClick={right_onClick}
                                        style={{ border: '1px solid #dee2e6', borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                                    >
                                        Next
                                    </Button>
                                </li>
                            </ul>
                        </nav>
                    </div>

                </Stack>
            </div>
        </>
    )
}
