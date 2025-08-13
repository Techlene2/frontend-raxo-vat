import React, { useEffect, useState } from 'react'
import { CustomerSalesOrderImport } from './Imports'
const { FieldArray, FormikProvider, useFormik, Button, Card, Form, Tab, Table, Tabs, ListGroup, SingleSelect, Text, DatePicker, TextArea, Radio, Number, LuPlusCircle, LuX, LuXCircle, SaveButton, Loader, ToastContainer, toast, AddSalesOrderSchema, useNavigate, useDispatch, useSelector, productPricingWithFiltersTodo, customerListTodo, customerDispatchDetailsTodo, userListTodo, addSalesOrderTodo, moment, debounce, lang } = CustomerSalesOrderImport

export default function AddCustomerSalesOrderForm() {

    const [key, setKey] = useState('customer')
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const item = useSelector(state => state.productPricingWithFilter && state.productPricingWithFilter.data)
    const customer = useSelector(state => state.customerList && state.customerList.data)
    const user = useSelector(state => state.userList && state.userList.data)
    const customer_address = useSelector(state => state.customerDispatchDetails && state.customerDispatchDetails.data)
    // console.log(customer)

    const customer_option = customer && customer.map(val => (
        { "value": val.id, "label": val.name, "currency": val.currency }
    ))

    const user_option = user && user.map(val => (
        { "value": val.id, "label": val.firstName + ' ' + val.lastName }
    ))

    const item_option = item && item.map(val => (
        {
            "value": val.id,
            "label": val.name + ' ' + "(" + val.code + ")",
            "rate": val.price,
            "unit": val.measurementUnitName,
            "unit_id": val.measurementUnitId,
            "vat": val.taxMasterRate,
            "vat_id": val.taxMasterId
        }
    ))

    const sale_type = [
        { "value": 'regular', "label": 'Regular' },
        { "value": 'cash', "label": 'Cash' },
        { "value": 'project', "label": 'Project' },
        { "value": 'upCountry', "label": 'Up Country' },
    ]

    const delivery_type = [
        { "value": 'full', "label": 'Full' },
        { "value": 'partial', "label": 'Partial' },
    ]

    var user_session = JSON.parse(localStorage.getItem('user'))

    const initialValues = {
        customer: "",
        sale_type: "",
        dispatch_address: "",
        dispatch_address_id: "",
        currency_id: "",
        currency: "",
        order_booked_by: user_session && user_session.id,
        booking_date: "",
        delivery_date: "",
        delivery_type: "",
        delivery_terms: "",
        payment_terms: "",
        customer_po_number: "",
        customer_po_date: "",
        designation: "",
        quotation_code: "",
        credit_days: "",
        our_code_customer_end: "",
        remark: "",

        item: [
            {
                item_id: '',
                item_name: '',
                rate: '',
                quantity: '',
                unit: '',
                unit_id: '',
                sub_total: '',
                discount: '',
                vat: '',
                vat_id: '',
                remark: ''
            }
        ],
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: AddSalesOrderSchema,
        enableReinitialize: true,
        validateOnMount: true,

        onSubmit: (values, action) => {
            // console.log(values)
            dispatch(addSalesOrderTodo({ 'values': values })).then((res) => add_res(res.payload, action))
        }
    })

    const add_res = (res, action) => {
        if (res && res.status == 201) {
            toast.success(lang.sales_order + ' ' + lang.success_add, { position: "bottom-right" })
            action.resetForm()
            setTimeout(() => {
                navigate('/customer-sales-order-list')
            }, 1500);
        } else if (res && res.status == 401) {
            localStorage.clear()
            navigate('/login')
        } else if (res && res.status == 400) {
            toast.error("400 BAD REQUEST", { position: "bottom-right" })
        } else {
            toast.error(lang.wrong, { position: "bottom-right" })
        }
    }

    const load_customer = debounce((e) => {
        if (e) {
            dispatch(customerListTodo({ 'search': `search=${e}` }))
        }
    }, 500)

    const load_address = (e) => {
        if (e) {
            dispatch(customerDispatchDetailsTodo({ 'id': e }))
        }
    }

    const load_item = debounce((e) => {
        if (e) {
            dispatch(productPricingWithFiltersTodo({ 'item': e, 'customer': formik.values.customer }))
        }
    }, 500)

    const totalCharges = formik.values.item && formik.values.item.reduce((acc, val) => {
        const rate = parseFloat(val.rate) || 0;
        const quantity = parseFloat(val.quantity) || 0;
        const discount = parseFloat(val.discount) || 0;
        const vat = parseFloat(val.vat) || 0;
        // const weight = val.item && val.item.unitWeight || 0

        const grand_itemTotal = (rate * quantity) + ((vat * rate * quantity) / 100) - (discount * (rate * quantity) / 100);
        const grand_subTotal = rate * quantity;
        const grand_discount = (discount * (rate * quantity) / 100);
        const grand_vat = (vat * (rate * quantity) / 100);
        // const grand_weight = rate * quantity * weight;

        return {
            "grand_total": acc.grand_total + grand_itemTotal,
            "sub_total": acc.sub_total + grand_subTotal,
            "discount_total": acc.discount_total + grand_discount,
            "vat_total": acc.vat_total + grand_vat,
            // "weight_total": acc.weight_total + grand_weight,
        }
    }, {
        grand_total: 0,
        sub_total: 0,
        discount_total: 0,
        vat_total: 0,
        // weight_total: 0
    })

    const user_list_res = (res) => {
        if (res && res.status == 200) {
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
        dispatch(userListTodo({ 'search': '' })).then((res) => user_list_res(res.payload))
    }, [])


    return (
        <>
            {loading ?
                <div className="layout">
                    <Loader />
                </div>
                :
                <FormikProvider value={formik}>
                    <Form onSubmit={(e) => { e.preventDefault(); formik.handleSubmit(); }}>
                        <Tabs
                            id="controlled-tab-example"
                            activeKey={key}
                            onSelect={(k) => setKey(k)}
                            className="mb-3"
                            style={{ fontSize: '13px', fontWeight: '500' }}
                        >
                            <Tab eventKey="customer" title={lang.customer_information}>
                                <Card className='mb-2'>
                                    <Card.Body>
                                        <div className="row">

                                            <div className="col-md-4">
                                                <SingleSelect
                                                    closeMenu={true}
                                                    label_name={lang.customer}
                                                    // placeholder=''
                                                    disabled={false}
                                                    option={customer_option ? customer_option : []}
                                                    name='customer'
                                                    defaultValue={""}
                                                    onChange={(e) => {
                                                        load_address(e.value)
                                                        formik.setFieldValue('customer', e.value);
                                                        formik.setFieldValue('currency', e.currency.shortName + ' ' + "(" + e.currency.symbol + ")");
                                                        formik.setFieldValue('currency_id', e.currency.id)
                                                    }}
                                                    onInputChange={(e) => load_customer(e)}
                                                    onBlur={formik.handleBlur}
                                                    error={formik.errors.customer && formik.touched.customer ? (<span className='text-danger form_label' >{formik.errors.customer}</span>) : null}
                                                />
                                            </div>

                                            <div className="col-md-2">
                                                <SingleSelect
                                                    closeMenu={true}
                                                    label_name={lang.sale_type}
                                                    // placeholder=''
                                                    disabled={false}
                                                    option={sale_type ? sale_type : []}
                                                    name='sale_type'
                                                    defaultValue={""}
                                                    onChange={(e) => {
                                                        formik.setFieldValue('sale_type', e.value);
                                                    }}
                                                    onBlur={formik.handleBlur}
                                                    error={formik.errors.sale_type && formik.touched.sale_type ? (<span className='text-danger form_label' >{formik.errors.sale_type}</span>) : null}
                                                />
                                            </div>

                                            <div className="col-md-2">
                                                <Text
                                                    label_name={lang.currency}
                                                    placeholder=''
                                                    disabled={true}
                                                    name='currency'
                                                    value={formik.values.currency || ''}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    error={formik.errors.currency && formik.touched.currency ? (<span className='text-danger form_label' >{formik.errors.currency}</span>) : null}
                                                />
                                            </div>

                                            <div className="col-md-2">
                                                <SingleSelect
                                                    closeMenu={true}
                                                    label_name={lang.order_booked_by}
                                                    // placeholder=''
                                                    disabled={false}
                                                    option={user_option ? user_option : []}
                                                    name='order_booked_by'
                                                    defaultValue={user_option && user_option.find((option) => option.value == formik.values.order_booked_by)}
                                                    onChange={(e) => {
                                                        formik.setFieldValue('order_booked_by', e.value);
                                                    }}
                                                    onBlur={formik.handleBlur}
                                                    error={formik.errors.order_booked_by && formik.touched.order_booked_by ? (<span className='text-danger form_label' >{formik.errors.order_booked_by}</span>) : null}
                                                />
                                            </div>

                                            <div className="col-md-2">
                                                <DatePicker
                                                    label_name={lang.booking_date}
                                                    placeholder=''
                                                    option={{
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
                                                    name='booking_date'
                                                    value={formik.values.booking_date || ''}
                                                    onChange={(e) =>
                                                        formik.setFieldValue('booking_date', moment(e[0]).format("YYYY-MM-DDTHH:mm:ss[Z]"))
                                                    }
                                                    onBlur={formik.handleBlur}
                                                    error={formik.errors.booking_date && formik.touched.booking_date ? (<span className='text-danger form_label' >{formik.errors.booking_date}</span>) : null}
                                                />
                                            </div>

                                            <div className="col-md-2">
                                                <DatePicker
                                                    label_name={lang.delivery_date}
                                                    placeholder=''
                                                    option={{
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
                                                    name='delivery_date'
                                                    value={formik.values.delivery_date || ''}
                                                    onChange={(e) =>
                                                        formik.setFieldValue('delivery_date', moment(e[0]).format("YYYY-MM-DDTHH:mm:ss[Z]"))
                                                    }
                                                    onBlur={formik.handleBlur}
                                                    error={formik.errors.delivery_date && formik.touched.delivery_date ? (<span className='text-danger form_label' >{formik.errors.delivery_date}</span>) : null}
                                                />
                                            </div>

                                            <div className="col-md-2">
                                                <SingleSelect
                                                    closeMenu={true}
                                                    label_name={lang.delivery_type}
                                                    // placeholder=''
                                                    disabled={false}
                                                    option={delivery_type ? delivery_type : []}
                                                    name='delivery_type'
                                                    defaultValue={""}
                                                    onChange={(e) => {
                                                        formik.setFieldValue('delivery_type', e.value);
                                                    }}
                                                    onBlur={formik.handleBlur}
                                                    error={formik.errors.delivery_type && formik.touched.delivery_type ? (<span className='text-danger form_label' >{formik.errors.delivery_type}</span>) : null}
                                                />
                                            </div>

                                            <div className="col-md-2">
                                                <Text
                                                    label_name={lang.delivery_terms}
                                                    placeholder=''
                                                    disabled={false}
                                                    name='delivery_terms'
                                                    value={formik.values.delivery_terms || ''}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    error={formik.errors.delivery_terms && formik.touched.delivery_terms ? (<span className='text-danger form_label' >{formik.errors.delivery_terms}</span>) : null}
                                                />
                                            </div>

                                            <div className="col-md-2">
                                                <Text
                                                    label_name={lang.payment_terms}
                                                    placeholder=''
                                                    disabled={false}
                                                    name='payment_terms'
                                                    value={formik.values.payment_terms || ''}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    error={formik.errors.payment_terms && formik.touched.payment_terms ? (<span className='text-danger form_label' >{formik.errors.payment_terms}</span>) : null}
                                                />
                                            </div>

                                            <div className="col-md-2">
                                                <Text
                                                    label_name={lang.customer_po_number}
                                                    placeholder=''
                                                    disabled={false}
                                                    name='customer_po_number'
                                                    value={formik.values.customer_po_number || ''}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    error={formik.errors.customer_po_number && formik.touched.customer_po_number ? (<span className='text-danger form_label' >{formik.errors.customer_po_number}</span>) : null}
                                                />
                                            </div>

                                            <div className="col-md-2">
                                                <DatePicker
                                                    label_name={lang.customer_po_date}
                                                    placeholder=''
                                                    option={{
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
                                                    name='customer_po_date'
                                                    value={formik.values.customer_po_date || ''}
                                                    onChange={(e) =>
                                                        formik.setFieldValue('customer_po_date', moment(e[0]).format("YYYY-MM-DDTHH:mm:ss[Z]"))
                                                    }
                                                    onBlur={formik.handleBlur}
                                                    error={formik.errors.customer_po_date && formik.touched.customer_po_date ? (<span className='text-danger form_label' >{formik.errors.customer_po_date}</span>) : null}
                                                />
                                            </div>

                                            <div className="col-md-2">
                                                <Text
                                                    label_name={lang.designation}
                                                    placeholder=''
                                                    disabled={false}
                                                    name='designation'
                                                    value={formik.values.designation || ''}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    error={formik.errors.designation && formik.touched.designation ? (<span className='text-danger form_label' >{formik.errors.designation}</span>) : null}
                                                />
                                            </div>

                                            <div className="col-md-2">
                                                <Text
                                                    label_name={lang.quotation_code}
                                                    placeholder=''
                                                    disabled={false}
                                                    name='quotation_code'
                                                    value={formik.values.quotation_code || ''}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    error={formik.errors.quotation_code && formik.touched.quotation_code ? (<span className='text-danger form_label' >{formik.errors.quotation_code}</span>) : null}
                                                />
                                            </div>

                                            <div className="col-md-2">
                                                <Number
                                                    label_name={lang.credit_days}
                                                    placeholder=''
                                                    disabled={false}
                                                    name='credit_days'
                                                    value={formik.values.credit_days ?? ''}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    error={formik.errors.credit_days && formik.touched.credit_days ? (<span className='text-danger form_label' >{formik.errors.credit_days}</span>) : null}
                                                />
                                            </div>

                                            <div className="col-md-2">
                                                <Text
                                                    label_name={lang.our_code_customer_end}
                                                    placeholder=''
                                                    disabled={false}
                                                    name='our_code_customer_end'
                                                    value={formik.values.our_code_customer_end || ''}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    error={formik.errors.our_code_customer_end && formik.touched.our_code_customer_end ? (<span className='text-danger form_label' >{formik.errors.our_code_customer_end}</span>) : null}
                                                />
                                            </div>

                                            <div className="col-md-4">
                                                <TextArea
                                                    label_name={lang.remark}
                                                    placeholder=''
                                                    disabled={false}
                                                    rows={1}
                                                    name='remark'
                                                    value={formik.values.remark || ''}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    error={formik.errors.remark && formik.touched.remark ? (<span className='text-danger form_label' >{formik.errors.remark}</span>) : null}
                                                />
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>

                                {customer_address &&
                                    <Card style={{ fontSize: '13px', fontWeight: '500' }}>
                                        <Card.Header>
                                            {lang.dispatch_address}
                                            {formik.errors.dispatch_address_id && formik.touched.dispatch_address_id ? (<span className='text-danger form_label' > ({formik.errors.dispatch_address_id})</span>) : null}
                                        </Card.Header>
                                        <Card.Body>
                                            <ListGroup as="ol" style={localStorage.getItem('lang_key') == 'ar' ? { paddingRight: 0 } : {}}>
                                                {customer_address && customer_address.map((val, index) =>
                                                    <ListGroup.Item
                                                        as="li"
                                                        className="d-flex justify-content-between align-items-center"
                                                        key={index}
                                                    >
                                                        <Radio
                                                            id={`radio${index}`}
                                                            label_value={''}
                                                            disabled={false}
                                                            check={val.id == formik.values.dispatch_address_id}
                                                            name={'dispatch_address_id'}
                                                            value={val.id}
                                                            onChange={(e) => { formik.handleChange(e); formik.setFieldValue('dispatch_address', JSON.stringify(val)) }}
                                                            onBlur={formik.handleBlur}
                                                            error=''
                                                        />
                                                        <div className={localStorage.getItem('lang_key') == 'ar' ? "me-2 ms-auto" : "ms-2 me-auto"}>
                                                            <div className="fw-bold">{val && val.personName}</div>
                                                            {val && val.address} <br />
                                                            {val && val.city}
                                                        </div>
                                                        <div>
                                                            {val && val.phone}
                                                        </div>
                                                    </ListGroup.Item>
                                                )}
                                            </ListGroup>
                                        </Card.Body>
                                    </Card>
                                }
                            </Tab>

                            <Tab eventKey="item" title={lang.item_information}
                                disabled={formik.errors.customer || formik.errors.dispatch_address_id || formik.errors.currency_id || formik.errors.order_booked_by || formik.errors.booking_date || formik.errors.delivery_date || formik.errors.delivery_type || formik.errors.customer_po_number || formik.errors.customer_po_date ? true : false}
                            >
                                <FieldArray
                                    name="item"
                                    render={(arrayHelpers) => (
                                        <>
                                            <div className='item_table'>
                                                <Table bordered responsive size="sm">
                                                    <thead>
                                                        <tr className='form_label'>
                                                            <th>{lang.item}</th>
                                                            <th>{lang.rate}</th>
                                                            <th>{lang.quantity}</th>
                                                            <th>{lang.unit}</th>
                                                            <th>{lang.sub_total}</th>
                                                            <th>{lang.discount}</th>
                                                            <th>{lang.vat}</th>
                                                            <th>{lang.remark}</th>
                                                            <th className='d-flex justify-content-end align-items-center'>
                                                                {lang.total}
                                                                <LuPlusCircle className={localStorage.getItem('lang_key') == 'ar' ? 'text-secondary ms-2' : 'text-secondary me-2'}
                                                                    size={16}
                                                                    style={localStorage.getItem('lang_key') == 'ar' ? { cursor: 'pointer', marginRight: '1.4rem' } : { cursor: 'pointer', marginLeft: '1.4rem' }}
                                                                    onClick={() => arrayHelpers.push({ item_id: '', item_name: '', rate: '', quantity: '', unit: '', unit_id: '', sub_total: '', discount: '', vat: '', vat_id: '', remark: '' })} />
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {formik.values.item.map((filed, index) => (
                                                            <tr key={index}>
                                                                <td style={{ width: '200px', fontSize: '13px', fontWeight: '500' }}>
                                                                    {formik.values.item[index].item_id ?
                                                                        <span className='d-flex justify-content-between align-items-center'>
                                                                            {formik.values.item[index].item_name}
                                                                            <LuXCircle
                                                                                size={14}
                                                                                style={{ color: '#7a7a7a', cursor: 'pointer' }}
                                                                                onClick={() => {
                                                                                    formik.setFieldValue(`item[${index}].item_id`, '')
                                                                                    formik.setFieldValue(`item[${index}].item_name`, '')
                                                                                    formik.setFieldValue(`item[${index}].rate`, '')
                                                                                    formik.setFieldValue(`item[${index}].quantity`, '')
                                                                                    formik.setFieldValue(`item[${index}].unit`, '')
                                                                                    formik.setFieldValue(`item[${index}].unit_id`, '')
                                                                                    formik.setFieldValue(`item[${index}].sub_total`, '')
                                                                                    formik.setFieldValue(`item[${index}].discount`, '')
                                                                                    formik.setFieldValue(`item[${index}].vat`, '')
                                                                                    formik.setFieldValue(`item[${index}].vat_id`, '')
                                                                                    formik.setFieldValue(`item[${index}].remark`, '')
                                                                                }}
                                                                            />
                                                                        </span>
                                                                        :
                                                                        <SingleSelect
                                                                            form_group={'inherit'}
                                                                            closeMenu={true}
                                                                            label_name={''}
                                                                            placeholder='Browse Item'
                                                                            disabled={false}
                                                                            option={item_option ? item_option : []}
                                                                            name={`item[${index}].item_id`}
                                                                            defaultValue={""}
                                                                            onChange={(e) => {
                                                                                formik.setFieldValue(`item[${index}].item_id`, e.value)
                                                                                formik.setFieldValue(`item[${index}].rate`, e.rate)
                                                                                formik.setFieldValue(`item[${index}].unit`, e.unit)
                                                                                formik.setFieldValue(`item[${index}].unit_id`, e.unit_id)
                                                                                formik.setFieldValue(`item[${index}].vat`, e.vat)
                                                                                formik.setFieldValue(`item[${index}].vat_id`, e.vat_id)
                                                                                formik.setFieldValue(`item[${index}].item_name`, e.label)
                                                                                arrayHelpers.push({ item_id: '', item_name: '', rate: '', quantity: '', unit: '', unit_id: '', sub_total: '', discount: '', vat: '', vat_id: '', remark: '' })
                                                                            }}
                                                                            onInputChange={(e) => load_item(e)}
                                                                            onBlur={formik.handleBlur}
                                                                            error={formik.touched.item && formik.touched.item[index] && formik.touched.item[index].item_id && formik.errors.item && formik.errors.item[index] && formik.errors.item[index].item_id ?
                                                                                (<span className='text-danger form_label'> {formik.errors.item[index].item_id}</span>) : null
                                                                            }

                                                                        />
                                                                    }
                                                                </td>
                                                                <td style={{ width: '80px' }}>
                                                                    <Number
                                                                        form_group={'inherit'}
                                                                        label_name={''}
                                                                        placeholder=''
                                                                        disabled={formik.values.item[index].item_id ? false : true}
                                                                        name={`item[${index}].rate`}
                                                                        value={formik.values.item[index].rate ?? ''}
                                                                        onChange={formik.handleChange}
                                                                        onBlur={formik.handleBlur}
                                                                        error={formik.touched.item && formik.touched.item[index] && formik.touched.item[index].rate && formik.errors.item && formik.errors.item[index] && formik.errors.item[index].rate ?
                                                                            (<span className='text-danger form_label'> {formik.errors.item[index].rate}</span>) : null
                                                                        }
                                                                    />
                                                                </td>
                                                                <td style={{ width: '80px' }}>
                                                                    <Number
                                                                        form_group={'inherit'}
                                                                        label_name={''}
                                                                        placeholder=''
                                                                        disabled={formik.values.item[index].item_id ? false : true}
                                                                        name={`item[${index}].quantity`}
                                                                        value={formik.values.item[index].quantity ?? ''}
                                                                        onChange={formik.handleChange}
                                                                        onBlur={formik.handleBlur}
                                                                        error={formik.touched.item && formik.touched.item[index] && formik.touched.item[index].quantity && formik.errors.item && formik.errors.item[index] && formik.errors.item[index].quantity ?
                                                                            (<span className='text-danger form_label'> {formik.errors.item[index].quantity}</span>) : null
                                                                        }
                                                                    />
                                                                </td>
                                                                <td style={{ width: '80px' }}>
                                                                    <Text
                                                                        form_group={'inherit'}
                                                                        label_name={''}
                                                                        placeholder=''
                                                                        disabled={true}
                                                                        name={`item[${index}].unit`}
                                                                        value={formik.values.item[index].unit || ''}
                                                                        onChange={formik.handleChange}
                                                                        onBlur={formik.handleBlur}
                                                                        error={formik.touched.item && formik.touched.item[index] && formik.touched.item[index].unit && formik.errors.item && formik.errors.item[index] && formik.errors.item[index].unit ?
                                                                            (<span className='text-danger form_label'> {formik.errors.item[index].unit}</span>) : null
                                                                        }
                                                                    />
                                                                </td>
                                                                <td style={{ width: '80px' }}>
                                                                    <Text
                                                                        form_group={'inherit'}
                                                                        label_name={''}
                                                                        placeholder=''
                                                                        disabled={true}
                                                                        name={`item[${index}].sub_total`}
                                                                        value={formik.values.item[index].sub_total = formik.values.item[index].rate * formik.values.item[index].quantity || ''}
                                                                        onChange={formik.handleChange}
                                                                        onBlur={formik.handleBlur}
                                                                        error={formik.touched.item && formik.touched.item[index] && formik.touched.item[index].sub_total && formik.errors.item && formik.errors.item[index] && formik.errors.item[index].sub_total ?
                                                                            (<span className='text-danger form_label'> {formik.errors.item[index].sub_total}</span>) : null
                                                                        }
                                                                    />
                                                                </td>
                                                                <td style={{ width: '80px' }}>
                                                                    <Number
                                                                        form_group={'inherit'}
                                                                        label_name={''}
                                                                        placeholder=''
                                                                        disabled={formik.values.item[index].item_id ? false : true}
                                                                        name={`item[${index}].discount`}
                                                                        value={formik.values.item[index].discount ?? ''}
                                                                        onChange={formik.handleChange}
                                                                        onBlur={formik.handleBlur}
                                                                        error={formik.touched.item && formik.touched.item[index] && formik.touched.item[index].discount && formik.errors.item && formik.errors.item[index] && formik.errors.item[index].discount ?
                                                                            (<span className='text-danger form_label'> {formik.errors.item[index].discount}</span>) : null
                                                                        }
                                                                    />
                                                                </td>
                                                                <td style={{ width: '80px' }}>
                                                                    <Number
                                                                        form_group={'inherit'}
                                                                        label_name={''}
                                                                        placeholder=''
                                                                        disabled={true}
                                                                        name={`item[${index}].vat`}
                                                                        value={formik.values.item[index].vat ?? ''}
                                                                        onChange={formik.handleChange}
                                                                        onBlur={formik.handleBlur}
                                                                        error={formik.touched.item && formik.touched.item[index] && formik.touched.item[index].vat && formik.errors.item && formik.errors.item[index] && formik.errors.item[index].vat ?
                                                                            (<span className='text-danger form_label'> {formik.errors.item[index].vat}</span>) : null
                                                                        }
                                                                    />
                                                                </td>
                                                                <td style={{ width: '100px' }}>
                                                                    <TextArea
                                                                        form_group={'inherit'}
                                                                        label_name={''}
                                                                        placeholder=''
                                                                        disabled={formik.values.item[index].item_id ? false : true}
                                                                        rows={1}
                                                                        name={`item[${index}].remark`}
                                                                        value={formik.values.item[index].remark || ''}
                                                                        onChange={formik.handleChange}
                                                                        onBlur={formik.handleBlur}
                                                                        error={formik.touched.item && formik.touched.item[index] && formik.touched.item[index].remark && formik.errors.item && formik.errors.item[index] && formik.errors.item[index].remark ?
                                                                            (<span className='text-danger form_label'> {formik.errors.item[index].remark}</span>) : null
                                                                        }
                                                                    />
                                                                </td>
                                                                <td className={localStorage.getItem('lang_key') == 'ar' ? 'text-start fw-bold' : 'text-end fw-bold'} style={{ width: '120px' }}>
                                                                    {
                                                                        ((parseFloat(formik.values.item[index].rate ? formik.values.item[index].rate : 0) * parseFloat(formik.values.item[index].quantity ? formik.values.item[index].quantity : 0))
                                                                            +
                                                                            (((parseFloat(formik.values.item[index].vat ? formik.values.item[index].vat : 0)) * (parseFloat(formik.values.item[index].rate ? formik.values.item[index].rate : 0) * parseFloat(formik.values.item[index].quantity ? formik.values.item[index].quantity : 0))) / 100))
                                                                        -
                                                                        (((parseFloat(formik.values.item[index].discount ? formik.values.item[index].discount : 0)) * (parseFloat(formik.values.item[index].rate ? formik.values.item[index].rate : 0) * parseFloat(formik.values.item[index].quantity ? formik.values.item[index].quantity : 0))) / 100)
                                                                    }

                                                                    <Button variant="light" size='sm' className={localStorage.getItem('lang_key') == 'ar' ? 'me-2' : 'ms-2'} onClick={() => arrayHelpers.remove(index)}
                                                                        disabled={formik.values.item && formik.values.item.length == 1 ? true : false}
                                                                    >
                                                                        <LuX className='text-secondary' size={20} />
                                                                    </Button>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                    <tfoot>
                                                        <tr className='fw-bold'>
                                                            <td colSpan={4} style={{ padding: '6px 10px' }}>
                                                                {/* <span style={{ color: '#7A7A7A' }}>{lang.total_weight}:</span> {totalCharges && totalCharges.weight_total} */}
                                                            </td>
                                                            <td style={{ padding: '6px 10px' }}>
                                                                {totalCharges && totalCharges.sub_total}
                                                            </td>
                                                            <td style={{ padding: '6px 10px' }}>
                                                                {totalCharges && totalCharges.discount_total}
                                                            </td>
                                                            <td style={{ padding: '6px 10px' }}>
                                                                {totalCharges && totalCharges.vat_total}
                                                            </td>
                                                            <td colSpan={2} className={localStorage.getItem('lang_key') == 'ar' ? 'text-start' : 'text-end'}>
                                                                <span style={localStorage.getItem('lang_key') == 'ar' ? { marginLeft: '2.7rem' } : { marginRight: '2.7rem' }}>
                                                                    {totalCharges && totalCharges.grand_total}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    </tfoot>
                                                </Table>
                                            </div>
                                        </>
                                    )}
                                />

                                <div className="float-end">
                                    <SaveButton
                                        button_name={lang.submit}
                                    />
                                </div>
                            </Tab>
                        </Tabs>
                    </Form>
                </FormikProvider>
            }

            <ToastContainer />
        </>
    )
}
