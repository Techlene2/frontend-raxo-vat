import React, { useState } from 'react'
import { CustomerPricingImport } from './Import'
const { Offcanvas, Form, Button, useNavigate, useDispatch, customerPricingListTodo, parseLinkHeader, Flatpickr, lang } = CustomerPricingImport

export default function CustomerPricingFilter(props) {

    const { filter, setFilter, setTableLoading, setCurrentPage, pageSize, setHeaderLink, setTotalRecord, bool, setBool, search, setSearch } = props

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleClose = () => setFilter(false)

    const apply_filter = () => {
        setFilter(false)
        setTableLoading(true)
        setCurrentPage(0)
        dispatch(customerPricingListTodo({ 'pageSize': pageSize, 'pageNo': 0, 'search': search })).then((res) => product_price_res(res.payload))
    }

    const clear_filter = () => {
        setBool(!bool)
        setSearch({ 'search': '', 'withEffectiveDate': '' })
        setFilter(false)
    }

    const product_price_res = (res) => {
        if (res && res.status == 200) {
            const parsed = parseLinkHeader(res.headers.link)
            setHeaderLink(parsed)
            setTotalRecord(parseInt(res.headers.get('x-Total-Count')))
            setTableLoading(false)
            // setLoading(false)
        } else if (res && res.status == 401) {
            localStorage.clear()
            navigate('/login')
        } else {
            // setLoading(false)
        }
    }

    return (
        <>
            <Offcanvas show={filter} onHide={handleClose} placement={localStorage.getItem('lang_key') == 'ar' ? 'start' : 'end'} backdrop="static" >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title style={{ color: '#21263c' }}>{lang.customer_pricing_filter}</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>

                    <Form.Group className="mb-2" controlId="text">
                        <Form.Label className='form_label'>{lang.search}</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder=''
                            disabled={false}
                            className='form_input'
                            value={search.search}
                            onChange={(e) => setSearch({ ...search, search: e.target.value })}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label className='form_label'>{lang.effective_date}</Form.Label>
                        <Flatpickr
                            className='form_input'
                            placeholder={"Choose Date"}
                            options={{
                                altInput: true,
                                altFormat: "F j, Y",
                                dateFormat: 'Y-m-d', // Customize date format as needed
                                minDate: '', // Before dates disabled
                                maxDate: '', // After dates disabled
                                disable: [], // Disable particular date ranges
                                mode: "single", //multiple-single-range
                                defaultDate: [], //comma separated multiple dates
                                conjunction: "", // Multiple dates seperation
                            }}
                            value={search.withEffectiveDate}
                            onChange={(e) => {
                                if (e && e.length) {
                                    setSearch({ ...search, withEffectiveDate: e[0] })
                                } else {
                                    setSearch({ ...search, withEffectiveDate: '' })
                                }
                            }}
                        />
                    </Form.Group>

                    <div style={{ position: "absolute", bottom: 10, right: 10 }}>
                        <Button
                            type='button'
                            variant="primary"
                            size='sm'
                            onClick={() => apply_filter()}
                        >
                            {lang.apply}
                        </Button>

                        <Button
                            type='button'
                            variant="secondary"
                            size='sm'
                            onClick={() => clear_filter()}
                            className={localStorage.getItem('lang_key') == 'ar' ? 'me-1' : 'ms-1'}
                        >
                            {lang.clear}
                        </Button>
                    </div>

                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}
