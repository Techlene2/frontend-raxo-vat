import React, { useEffect, useState } from 'react'
import { CustomerImport } from './Imports'
const { Text, Form, Button, useFormik, FormikProvider, FieldArray, SaveButton, AddCustomerSchema, TextArea, SelectStatus, SingleSelect, useDispatch, useSelector, useNavigate, useLocation, toast, ToastContainer, Loader, FaPlus, FaTrash, Card, updateCustomerTodo, customerDetailsTodo, gradeListTodo, customerTypeListTodo, departmentListTodo, taxTypeListTodo, currencyListTodo, customerGroupListTodo, regionListTodo, cityListTodo, customerCategoryListTodo, debounce, lang } = CustomerImport

export default function UpdateCustomerForm() {

    const [loading, setLoading] = useState(false)
    const [breakLoading, setBreakLoading] = useState(false)
    const [cityLoading, setCityLoading] = useState(false)

    const { state } = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const customer = useSelector(state => state.customerDetails && state.customerDetails.data)
    const grade = useSelector(state => state.gradeList && state.gradeList.data)
    const customer_type = useSelector(state => state.customerTypeList && state.customerTypeList.data)
    const department = useSelector(state => state.departmentList && state.departmentList.data)
    const tax_type = useSelector(state => state.taxTypeList && state.taxTypeList.data)
    const currency = useSelector(state => state.currencyList && state.currencyList.data)
    const customer_group = useSelector(state => state.customerGroupList && state.customerGroupList.data)
    const region = useSelector(state => state.regionList && state.regionList.data)
    const city = useSelector(state => state.cityList && state.cityList.data)
    const customer_category = useSelector(state => state.customerCategoryList && state.customerCategoryList.data)
    // console.log(city)

    const grade_option = grade && grade.map(val => (
        { "value": val.id, "label": val.name }
    ))

    const customer_type_option = customer_type && customer_type.map(val => (
        { "value": val.id, "label": val.name }
    ))

    const department_option = department && department.map(val => (
        { "value": val.id, "label": val.name }
    ))

    const tax_type_option = tax_type && tax_type.map(val => (
        { "value": val.id, "label": val.name }
    ))

    const currency_option = currency && currency.map(val => (
        { "value": val.id, "label": val.shortName + ' ' + `(${val.symbol})` }
    ))

    const customer_group_option = customer_group && customer_group.map(val => (
        { "value": val.id, "label": val.name }
    ))

    const blackListed_option = [
        { "value": true, "label": 'Yes' },
        { "value": false, "label": 'No' }
    ]

    const region_option = region && region.map(val => (
        { "value": val.id, "label": val.name }
    ))

    const city_option = city && city.map(val => (
        { "value": val.id, "label": val.name }
    ))

    const customer_category_option = customer_category && customer_category.map(val => (
        { "value": val.id, "label": val.name }
    ))

    const initialValues = {
        id: customer && customer.id,
        customer_name: customer && customer.name,
        short_name: '',
        customer_category: customer && customer.customerCategory && customer.customerCategory.id,
        grade: customer && customer.grade && customer.grade.id,

        customer_type: customer && customer.customerType && customer.customerType.id,
        postal_code: customer && customer.postalCode,
        city: customer && customer.city && customer.city.id,
        po_box: customer && customer.poBox,
        website: customer && customer.webSite,
        fax: customer && customer.fax,
        office_no: customer && customer.officeContactNo,
        address: customer && customer.address,
        status: customer && customer.isActive,

        person: customer && customer.personDetailsEntities && customer.personDetailsEntities.map((val) => ({
            id: val.id,
            personName: val.personName,
            designation: val.designation,
            department: val.department,
            mobile: val.mobile,
            email: val.email
        })),
        // [
        //     {
        //         id: '',
        //         personName: '',
        //         designation: '',
        //         department: '',
        //         mobile: '',
        //         email: ''
        //     }
        // ],

        tax_type: customer && customer.taxType && customer.taxType.id,
        currency: customer && customer.currency && customer.currency.id,
        customer_group: customer && customer.customerGroup && customer.customerGroup.id,
        black_listed: customer && customer.blackListed,
        region: customer && customer.region && customer.region.id,
        vat_no: customer && customer.vatNo,
        pan_no: customer && customer.panNo,
        registration_no: customer && customer.registrationNo,
        credit_days: customer && customer.creditDays,
        credit_limit: customer && customer.creditLimit,
        lat: customer && customer.lattitude,
        lng: customer && customer.longitude,

        dispatch: customer && customer.dispatchDetails && customer.dispatchDetails.map((val) => ({
            id: val.id,
            personName: val.personName,
            email: val.email,
            phone: val.phone,
            city: val.city,
            address: val.address,
            dispatchPin: val.dispatchPin,
            dispatchGSTNo: val.dispatchGSTNo,
            priority: val.priority
        })),
        // [
        //     {
        //         id: '',
        //         personName: '',
        //         email: '',
        //         phone: '',
        //         city: '',
        //         address: '',
        //         dispatchPin: '',
        //         dispatchGSTNo: '',
        //         priority: ''
        //     }
        // ],
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: AddCustomerSchema,
        enableReinitialize: true,

        onSubmit: (values, action) => {
            // console.log(values)
            dispatch(updateCustomerTodo({ 'values': values })).then((res) => update_res(res.payload, action))
        }
    })

    const update_res = (res, action) => {
        if (res && res.status == 200) {
            toast.success(lang.customer + ' ' + lang.success_update, { position: "bottom-right" })
            action.resetForm()
            setTimeout(() => {
                navigate('/customer-list')
            }, 1500);
        } else if (res && res.status == 401) {
            localStorage.clear()
            navigate('/login')
        } else if (res && res.status == 400) {
            toast.error("400", { position: "bottom-right" })
        } else {
            toast.error(lang.wrong, { position: "bottom-right" })
        }
    }

    const city_res = (res) => {
        if (res && res.status == 200) {
            setCityLoading(false)
        } else {
            setCityLoading(false)
        }
    }

    const load_city = debounce((e) => {
        if (e) {
            setCityLoading(true)
            dispatch(cityListTodo({ 'search': `search=${e}` })).then((res) => city_res(res.payload))
        }
    }, 500)

    const customer_res = async (res) => {
        try {
            if (res && res.status === 200) {
                await Promise.all([
                    dispatch(gradeListTodo({ 'search': '' })),
                    dispatch(customerTypeListTodo({ 'search': '' })),
                    dispatch(departmentListTodo({ 'search': '' })),
                    dispatch(taxTypeListTodo({ 'search': '' })),
                    dispatch(currencyListTodo({ 'search': '' })),
                    dispatch(customerGroupListTodo({ 'search': '' })),
                    dispatch(regionListTodo({ 'search': '' })),
                    dispatch(cityListTodo({ 'search': '' })),
                    dispatch(customerCategoryListTodo({ 'search': '' }))
                ]);
                setLoading(false)
                setBreakLoading(false)
            } else if (res && res.status === 401) {
                localStorage.clear()
                navigate('/login')
            } else {
                setBreakLoading(false)
            }
        } catch (error) {
            // console.error(error)
            setBreakLoading(false)
        }
    }

    useEffect(() => {
        setLoading(true)
        setBreakLoading(true)
        dispatch(customerDetailsTodo({ 'id': state })).then((res) => customer_res(res.payload))
    }, [])

    return (
        <>
            {loading && breakLoading ?
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="layout">
                                <Loader />
                            </div>
                        </div>
                    </div>
                </div>

                :

                loading && !breakLoading ?
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12">
                                <div className='layout'>
                                    <div className='text-center'>
                                        <h5>Something went wrong can't able to load update form</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    :

                    !loading && !breakLoading ?

                        <FormikProvider value={formik}>
                            <Form onSubmit={(e) => { e.preventDefault(); formik.handleSubmit(); }}>
                                <div className="container-fluid">
                                    <div className="row">

                                        <div className="col-md-12">
                                            <Card className='mb-3'>
                                                <Card.Header style={{ fontWeight: 500, fontSize: '1rem' }}>
                                                    {lang.person_information}
                                                </Card.Header>
                                                <Card.Body>
                                                    <div className="row">
                                                        <div className="col-md-3">
                                                            <Text
                                                                label_name={lang.customer_name}
                                                                placeholder=''
                                                                disabled={false}
                                                                name='customer_name'
                                                                value={formik.values.customer_name || ''}
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                                error={formik.errors.customer_name && formik.touched.customer_name ? (<span className='text-danger form_label' >{formik.errors.customer_name}</span>) : null}
                                                            />
                                                        </div>

                                                        <div className="col-md-3">
                                                            <Text
                                                                label_name={lang.short_name}
                                                                placeholder=''
                                                                disabled={false}
                                                                name='short_name'
                                                                value={formik.values.short_name || ''}
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                                error={formik.errors.short_name && formik.touched.short_name ? (<span className='text-danger form_label' >{formik.errors.short_name}</span>) : null}
                                                            />
                                                        </div>

                                                        <div className="col-md-3">
                                                            <SingleSelect
                                                                closeMenu={true}
                                                                label_name={lang.customer_category}
                                                                // placeholder=''
                                                                disabled={false}
                                                                option={customer_category_option ? customer_category_option : []}
                                                                name='customer_category'
                                                                defaultValue={customer_category_option && customer_category_option.find((option) => option.value == formik.values.customer_category)}
                                                                onChange={(e) => {
                                                                    formik.setFieldValue('customer_category', e.value);
                                                                }}
                                                                onBlur={formik.handleBlur}
                                                                error={formik.errors.customer_category && formik.touched.customer_category ? (<span className='text-danger form_label' >{formik.errors.customer_category}</span>) : null}
                                                            />
                                                        </div>

                                                        <div className="col-md-3">
                                                            <SingleSelect
                                                                closeMenu={true}
                                                                label_name={lang.grade}
                                                                // placeholder=''
                                                                disabled={false}
                                                                option={grade_option ? grade_option : []}
                                                                name='grade'
                                                                defaultValue={grade_option && grade_option.find((option) => option.value == formik.values.grade)}
                                                                onChange={(e) => {
                                                                    formik.setFieldValue('grade', e.value);
                                                                }}
                                                                onBlur={formik.handleBlur}
                                                                error={formik.errors.grade && formik.touched.grade ? (<span className='text-danger form_label' >{formik.errors.grade}</span>) : null}
                                                            />
                                                        </div>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </div>

                                        <div className="col-md-12">
                                            <Card className='mb-3'>
                                                <Card.Header style={{ fontWeight: 500, fontSize: '1rem' }}>
                                                    {lang.contact_information}
                                                </Card.Header>
                                                <Card.Body>
                                                    <div className="row">
                                                        <div className="col-md-2">
                                                            <SingleSelect
                                                                closeMenu={true}
                                                                label_name={lang.customer_type}
                                                                // placeholder=''
                                                                disabled={false}
                                                                option={customer_type_option ? customer_type_option : []}
                                                                name='customer_type'
                                                                defaultValue={customer_type_option && customer_type_option.find((option) => option.value == formik.values.customer_type)}
                                                                onChange={(e) => {
                                                                    formik.setFieldValue('customer_type', e.value);
                                                                }}
                                                                onBlur={formik.handleBlur}
                                                                error={formik.errors.customer_type && formik.touched.customer_type ? (<span className='text-danger form_label' >{formik.errors.customer_type}</span>) : null}
                                                            />
                                                        </div>

                                                        <div className="col-md-2">
                                                            <Text
                                                                label_name={lang.postal_code}
                                                                placeholder=''
                                                                disabled={false}
                                                                name='postal_code'
                                                                value={formik.values.postal_code || ''}
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                                error={formik.errors.postal_code && formik.touched.postal_code ? (<span className='text-danger form_label' >{formik.errors.postal_code}</span>) : null}
                                                            />
                                                        </div>

                                                        <div className="col-md-2">
                                                            <SingleSelect
                                                                closeMenu={true}
                                                                label_name={lang.city}
                                                                // placeholder=''
                                                                disabled={false}
                                                                option={city_option ? city_option : []}
                                                                name='city'
                                                                defaultValue={city_option && city_option.find((option) => option.value == formik.values.city)}
                                                                onChange={(e) =>
                                                                    formik.setFieldValue('city', e.value)
                                                                }
                                                                onInputChange={(e) => load_city(e)}
                                                                loading={cityLoading}
                                                                onBlur={formik.handleBlur}
                                                                error={formik.errors.city && formik.touched.city ? (<span className='text-danger form_label' >{formik.errors.city}</span>) : null}
                                                            />
                                                        </div>

                                                        <div className="col-md-2">
                                                            <Text
                                                                label_name={lang.po_box}
                                                                placeholder=''
                                                                disabled={false}
                                                                name='po_box'
                                                                value={formik.values.po_box || ''}
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                                error={formik.errors.po_box && formik.touched.po_box ? (<span className='text-danger form_label' >{formik.errors.po_box}</span>) : null}
                                                            />
                                                        </div>

                                                        <div className="col-md-2">
                                                            <Text
                                                                label_name={lang.website}
                                                                placeholder=''
                                                                disabled={false}
                                                                name='website'
                                                                value={formik.values.website || ''}
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                                error={formik.errors.website && formik.touched.website ? (<span className='text-danger form_label' >{formik.errors.website}</span>) : null}
                                                            />
                                                        </div>

                                                        <div className="col-md-2">
                                                            <Text
                                                                label_name={lang.fax}
                                                                placeholder=''
                                                                disabled={false}
                                                                name='fax'
                                                                value={formik.values.fax || ''}
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                                error={formik.errors.fax && formik.touched.fax ? (<span className='text-danger form_label' >{formik.errors.fax}</span>) : null}
                                                            />
                                                        </div>

                                                        <div className="col-md-2">
                                                            <Text
                                                                label_name={lang.office_no}
                                                                placeholder=''
                                                                disabled={false}
                                                                name='office_no'
                                                                value={formik.values.office_no || ''}
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                                error={formik.errors.office_no && formik.touched.office_no ? (<span className='text-danger form_label' >{formik.errors.office_no}</span>) : null}
                                                            />
                                                        </div>

                                                        <div className="col-md-4">
                                                            <TextArea
                                                                label_name={lang.address}
                                                                placeholder=''
                                                                disabled={false}
                                                                rows={1}
                                                                name='address'
                                                                value={formik.values.address || ''}
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                                error={formik.errors.address && formik.touched.address ? (<span className='text-danger form_label' >{formik.errors.address}</span>) : null}
                                                            />
                                                        </div>

                                                        <div className="col-md-2">
                                                            <SelectStatus
                                                                closeMenu={true}
                                                                label_name={lang.status}
                                                                // placeholder=''
                                                                disabled={false}
                                                                name='status'
                                                                defaultValue={formik.values.status}
                                                                onChange={(e) =>
                                                                    formik.setFieldValue('status', e.value)
                                                                }
                                                                onBlur={formik.handleBlur}
                                                                error={formik.errors.status && formik.touched.status ? (<span className='text-danger form_label' >{formik.errors.status}</span>) : null}
                                                            />
                                                        </div>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </div>

                                        <FieldArray
                                            name="person"
                                            render={(arrayHelpers) => (
                                                <>
                                                    <div className="col-md-12">
                                                        <Card className='mb-3'>
                                                            <Card.Header className='d-flex justify-content-between align-items-center' style={{ fontWeight: 500, fontSize: '1rem' }}>
                                                                {lang.person_information}
                                                                <Button
                                                                    variant="primary"
                                                                    size='sm'
                                                                    onClick={() => arrayHelpers.push({ personName: '', designation: '', department: '', mobile: '', email: '' })}
                                                                >
                                                                    <FaPlus size={13} style={{ marginBottom: '2px' }} />
                                                                </Button>
                                                            </Card.Header>
                                                            <Card.Body>
                                                                {formik.values.person && formik.values.person.map((filed, index) => (
                                                                    // <div className="col-md-4">
                                                                    //     <Card body className='mb-2'>
                                                                    <div className="row" key={index}>
                                                                        <div className="col-md-2">
                                                                            <Text
                                                                                label_name={index == 0 ? lang.person_name : ''}
                                                                                placeholder=''
                                                                                disabled={false}
                                                                                name={`person[${index}].personName`}
                                                                                value={formik.values.person[index].personName || ''}
                                                                                onChange={formik.handleChange}
                                                                                onBlur={formik.handleBlur}
                                                                                error={formik.touched.person && formik.touched.person[index] && formik.touched.person[index].personName && formik.errors.person && formik.errors.person[index] && formik.errors.person[index].personName ?
                                                                                    (<span className='text-danger form_label'> {formik.errors.person[index].personName}</span>) : null
                                                                                }
                                                                            />
                                                                        </div>

                                                                        <div className="col-md-2">
                                                                            <Text
                                                                                label_name={index == 0 ? lang.designation : ''}
                                                                                placeholder=''
                                                                                disabled={false}
                                                                                name={`person[${index}].designation`}
                                                                                value={formik.values.person[index].designation || ''}
                                                                                onChange={formik.handleChange}
                                                                                onBlur={formik.handleBlur}
                                                                                error={formik.touched.person && formik.touched.person[index] && formik.touched.person[index].designation && formik.errors.person && formik.errors.person[index] && formik.errors.person[index].designation ?
                                                                                    (<span className='text-danger form_label'> {formik.errors.person[index].designation}</span>) : null
                                                                                }
                                                                            />
                                                                        </div>

                                                                        <div className="col-md-3">
                                                                            <SingleSelect
                                                                                closeMenu={true}
                                                                                label_name={index == 0 ? lang.department : ''}
                                                                                // placeholder=''
                                                                                disabled={false}
                                                                                option={department_option ? department_option : []}
                                                                                name={`person[${index}].department`}
                                                                                defaultValue={department_option && department_option.find((option) => option.value == formik.values.person[index].department)}
                                                                                onChange={(e) =>
                                                                                    formik.setFieldValue(`person[${index}].department`, e.value)
                                                                                }
                                                                                onBlur={formik.handleBlur}
                                                                                error={formik.touched.person && formik.touched.person[index] && formik.touched.person[index].department && formik.errors.person && formik.errors.person[index] && formik.errors.person[index].department ?
                                                                                    (<span className='text-danger form_label'> {formik.errors.person[index].department}</span>) : null
                                                                                }
                                                                            />
                                                                        </div>

                                                                        <div className="col-md-2">
                                                                            <Text
                                                                                label_name={index == 0 ? lang.mobile : ''}
                                                                                placeholder=''
                                                                                disabled={false}
                                                                                name={`person[${index}].mobile`}
                                                                                value={formik.values.person[index].mobile || ''}
                                                                                onChange={formik.handleChange}
                                                                                onBlur={formik.handleBlur}
                                                                                error={formik.touched.person && formik.touched.person[index] && formik.touched.person[index].mobile && formik.errors.person && formik.errors.person[index] && formik.errors.person[index].mobile ?
                                                                                    (<span className='text-danger form_label'> {formik.errors.person[index].mobile}</span>) : null
                                                                                }
                                                                            />
                                                                        </div>

                                                                        <div className="col-md-2">
                                                                            <Text
                                                                                label_name={index == 0 ? lang.email : ''}
                                                                                placeholder=''
                                                                                disabled={false}
                                                                                name={`person[${index}].email`}
                                                                                value={formik.values.person[index].email || ''}
                                                                                onChange={formik.handleChange}
                                                                                onBlur={formik.handleBlur}
                                                                                error={formik.touched.person && formik.touched.person[index] && formik.touched.person[index].email && formik.errors.person && formik.errors.person[index] && formik.errors.person[index].email ?
                                                                                    (<span className='text-danger form_label'> {formik.errors.person[index].email}</span>) : null
                                                                                }
                                                                            />
                                                                        </div>

                                                                        <div className="col-md-1">
                                                                            <div className={localStorage.getItem('lang_key') == 'ar' ? 'float-start' : 'float-end'} style={index == 0 ? { marginTop: "32px" } : {}}>
                                                                                {formik.values.person.length !== 1 ?
                                                                                    <Button
                                                                                        variant="danger"
                                                                                        size='sm'
                                                                                        onClick={() => arrayHelpers.remove(index)}
                                                                                    >
                                                                                        <FaTrash size={13} style={{ marginBottom: '2px' }} />
                                                                                    </Button>
                                                                                    : ''
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    //     </Card>
                                                                    // </div>
                                                                ))}
                                                            </Card.Body>
                                                        </Card>
                                                    </div>
                                                </>
                                            )}
                                        />

                                        <div className="col-md-12">
                                            <Card className='mb-3'>
                                                <Card.Header style={{ fontWeight: 500, fontSize: '1rem' }}>
                                                    {lang.general_information}
                                                </Card.Header>
                                                <Card.Body>
                                                    <div className="row">
                                                        <div className="col-md-2">
                                                            <SingleSelect
                                                                closeMenu={true}
                                                                label_name={lang.tax_type}
                                                                // placeholder=''
                                                                disabled={false}
                                                                option={tax_type_option ? tax_type_option : []}
                                                                name='tax_type'
                                                                defaultValue={tax_type_option && tax_type_option.find((option) => option.value == formik.values.tax_type)}
                                                                onChange={(e) => {
                                                                    formik.setFieldValue('tax_type', e.value);
                                                                }}
                                                                onBlur={formik.handleBlur}
                                                                error={formik.errors.tax_type && formik.touched.tax_type ? (<span className='text-danger form_label' >{formik.errors.tax_type}</span>) : null}
                                                            />
                                                        </div>

                                                        <div className="col-md-2">
                                                            <SingleSelect
                                                                closeMenu={true}
                                                                label_name={lang.currency}
                                                                // placeholder=''
                                                                disabled={false}
                                                                option={currency_option ? currency_option : []}
                                                                name='currency'
                                                                defaultValue={currency_option && currency_option.find((option) => option.value == formik.values.currency)}
                                                                onChange={(e) => {
                                                                    formik.setFieldValue('currency', e.value);
                                                                }}
                                                                onBlur={formik.handleBlur}
                                                                error={formik.errors.currency && formik.touched.currency ? (<span className='text-danger form_label' >{formik.errors.currency}</span>) : null}
                                                            />
                                                        </div>

                                                        <div className="col-md-2">
                                                            <SingleSelect
                                                                closeMenu={true}
                                                                label_name={lang.customer_group}
                                                                // placeholder=''
                                                                disabled={false}
                                                                option={customer_group_option ? customer_group_option : []}
                                                                name='customer_group'
                                                                defaultValue={customer_group_option && customer_group_option.find((option) => option.value == formik.values.customer_group)}
                                                                onChange={(e) => {
                                                                    formik.setFieldValue('customer_group', e.value);
                                                                }}
                                                                onBlur={formik.handleBlur}
                                                                error={formik.errors.customer_group && formik.touched.customer_group ? (<span className='text-danger form_label' >{formik.errors.customer_group}</span>) : null}
                                                            />
                                                        </div>

                                                        <div className="col-md-2">
                                                            <SingleSelect
                                                                closeMenu={true}
                                                                label_name={lang.black_listed}
                                                                // placeholder=''
                                                                disabled={false}
                                                                option={blackListed_option ? blackListed_option : []}
                                                                name='black_listed'
                                                                defaultValue={blackListed_option && blackListed_option.find((option) => option.value == formik.values.black_listed)}
                                                                onChange={(e) => {
                                                                    formik.setFieldValue('black_listed', e.value);
                                                                }}
                                                                onBlur={formik.handleBlur}
                                                                error={formik.errors.black_listed && formik.touched.black_listed ? (<span className='text-danger form_label' >{formik.errors.black_listed}</span>) : null}
                                                            />
                                                        </div>

                                                        <div className="col-md-2">
                                                            <SingleSelect
                                                                closeMenu={true}
                                                                label_name={lang.region}
                                                                // placeholder=''
                                                                disabled={false}
                                                                option={region_option ? region_option : []}
                                                                name='region'
                                                                defaultValue={region_option && region_option.find((option) => option.value == formik.values.region)}
                                                                onChange={(e) => {
                                                                    formik.setFieldValue('region', e.value);
                                                                }}
                                                                onBlur={formik.handleBlur}
                                                                error={formik.errors.region && formik.touched.region ? (<span className='text-danger form_label' >{formik.errors.region}</span>) : null}
                                                            />
                                                        </div>

                                                        <div className="col-md-2">
                                                            <Text
                                                                label_name={lang.vat_no}
                                                                placeholder=''
                                                                disabled={false}
                                                                name='vat_no'
                                                                value={formik.values.vat_no || ''}
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                                error={formik.errors.vat_no && formik.touched.vat_no ? (<span className='text-danger form_label' >{formik.errors.vat_no}</span>) : null}
                                                            />
                                                        </div>

                                                        <div className="col-md-2">
                                                            <Text
                                                                label_name={lang.pan_no}
                                                                placeholder=''
                                                                disabled={false}
                                                                name='pan_no'
                                                                value={formik.values.pan_no || ''}
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                                error={formik.errors.pan_no && formik.touched.pan_no ? (<span className='text-danger form_label' >{formik.errors.pan_no}</span>) : null}
                                                            />
                                                        </div>

                                                        <div className="col-md-2">
                                                            <Text
                                                                label_name={lang.registration_no}
                                                                placeholder=''
                                                                disabled={false}
                                                                name='registration_no'
                                                                value={formik.values.registration_no || ''}
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                                error={formik.errors.registration_no && formik.touched.registration_no ? (<span className='text-danger form_label' >{formik.errors.registration_no}</span>) : null}
                                                            />
                                                        </div>

                                                        <div className="col-md-2">
                                                            <Text
                                                                label_name={lang.credit_days}
                                                                placeholder=''
                                                                disabled={false}
                                                                name='credit_days'
                                                                value={formik.values.credit_days || ''}
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                                error={formik.errors.credit_days && formik.touched.credit_days ? (<span className='text-danger form_label' >{formik.errors.credit_days}</span>) : null}
                                                            />
                                                        </div>

                                                        <div className="col-md-2">
                                                            <Text
                                                                label_name={lang.credit_limit}
                                                                placeholder=''
                                                                disabled={false}
                                                                name='credit_limit'
                                                                value={formik.values.credit_limit || ''}
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                                error={formik.errors.credit_limit && formik.touched.credit_limit ? (<span className='text-danger form_label' >{formik.errors.credit_limit}</span>) : null}
                                                            />
                                                        </div>

                                                        <div className="col-md-2">
                                                            <Text
                                                                label_name={lang.lat}
                                                                placeholder=''
                                                                disabled={false}
                                                                name='lat'
                                                                value={formik.values.lat || ''}
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                                error={formik.errors.lat && formik.touched.lat ? (<span className='text-danger form_label' >{formik.errors.lat}</span>) : null}
                                                            />
                                                        </div>

                                                        <div className="col-md-2">
                                                            <Text
                                                                label_name={lang.lng}
                                                                placeholder=''
                                                                disabled={false}
                                                                name='lng'
                                                                value={formik.values.lng || ""}
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                                error={formik.errors.lng && formik.touched.lng ? (<span className='text-danger form_label' >{formik.errors.lng}</span>) : null}
                                                            />
                                                        </div>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </div>

                                        <FieldArray
                                            name="dispatch"
                                            render={(arrayHelpers) => (
                                                <>
                                                    <div className="col-md-12">
                                                        <Card className='mb-3'>
                                                            <Card.Header className='d-flex justify-content-between align-items-center' style={{ fontWeight: 500, fontSize: '1rem' }}>
                                                                {lang.dispatch_information}
                                                                <Button
                                                                    variant="primary"
                                                                    size='sm'
                                                                    onClick={() => arrayHelpers.push({ personName: '', email: '', phone: '', city: '', address: '', dispatchPin: '', dispatchGSTNo: '', priority: '' })}
                                                                >
                                                                    <FaPlus size={13} style={{ marginBottom: '2px' }} />
                                                                </Button>
                                                            </Card.Header>
                                                            <Card.Body>
                                                                <div className="row">
                                                                    {formik.values.dispatch && formik.values.dispatch.map((filed, index) => (
                                                                        <div className="col-md-4" key={index}>
                                                                            <Card body className='mb-2'>
                                                                                <div className="row">
                                                                                    <div className="col-md-12">
                                                                                        <div className={localStorage.getItem('lang_key') == 'ar' ? 'float-start' : 'float-end'} >
                                                                                            {formik.values.dispatch.length !== 1 ?
                                                                                                <Button
                                                                                                    variant="danger"
                                                                                                    size='sm'
                                                                                                    onClick={() => arrayHelpers.remove(index)}
                                                                                                >
                                                                                                    <FaTrash size={13} style={{ marginBottom: '2px' }} />
                                                                                                </Button>
                                                                                                : ''
                                                                                            }
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-md-6">
                                                                                        <Text
                                                                                            label_name={lang.name}
                                                                                            placeholder=''
                                                                                            disabled={false}
                                                                                            name={`dispatch[${index}].personName`}
                                                                                            value={formik.values.dispatch[index].personName || ''}
                                                                                            onChange={formik.handleChange}
                                                                                            onBlur={formik.handleBlur}
                                                                                            error={formik.touched.dispatch && formik.touched.dispatch[index] && formik.touched.dispatch[index].personName && formik.errors.dispatch && formik.errors.dispatch[index] && formik.errors.dispatch[index].personName ?
                                                                                                (<span className='text-danger form_label'> {formik.errors.dispatch[index].personName}</span>) : null
                                                                                            }
                                                                                        />
                                                                                    </div>

                                                                                    <div className="col-md-6">
                                                                                        <Text
                                                                                            label_name={lang.email}
                                                                                            placeholder=''
                                                                                            disabled={false}
                                                                                            name={`dispatch[${index}].email`}
                                                                                            value={formik.values.dispatch[index].email || ''}
                                                                                            onChange={formik.handleChange}
                                                                                            onBlur={formik.handleBlur}
                                                                                            error={formik.touched.dispatch && formik.touched.dispatch[index] && formik.touched.dispatch[index].email && formik.errors.dispatch && formik.errors.dispatch[index] && formik.errors.dispatch[index].email ?
                                                                                                (<span className='text-danger form_label'> {formik.errors.dispatch[index].email}</span>) : null
                                                                                            }
                                                                                        />
                                                                                    </div>

                                                                                    <div className="col-md-6">
                                                                                        <Text
                                                                                            label_name={lang.mobile}
                                                                                            placeholder=''
                                                                                            disabled={false}
                                                                                            name={`dispatch[${index}].phone`}
                                                                                            value={formik.values.dispatch[index].phone || ''}
                                                                                            onChange={formik.handleChange}
                                                                                            onBlur={formik.handleBlur}
                                                                                            error={formik.touched.dispatch && formik.touched.dispatch[index] && formik.touched.dispatch[index].phone && formik.errors.dispatch && formik.errors.dispatch[index] && formik.errors.dispatch[index].phone ?
                                                                                                (<span className='text-danger form_label'> {formik.errors.dispatch[index].phone}</span>) : null
                                                                                            }
                                                                                        />
                                                                                    </div>

                                                                                    <div className="col-md-6">
                                                                                        <SingleSelect
                                                                                            closeMenu={true}
                                                                                            label_name={lang.city}
                                                                                            // placeholder=''
                                                                                            disabled={false}
                                                                                            option={city_option ? city_option : []}
                                                                                            name={`dispatch[${index}].city`}
                                                                                            defaultValue={city_option && city_option.find((option) => option.value == formik.values.dispatch[index].city)}
                                                                                            onChange={(e) =>
                                                                                                formik.setFieldValue(`dispatch[${index}].city`, e.value)
                                                                                            }
                                                                                            onInputChange={(e) => load_city(e)}
                                                                                            loading={cityLoading}
                                                                                            onBlur={formik.handleBlur}
                                                                                            error={formik.touched.dispatch && formik.touched.dispatch[index] && formik.touched.dispatch[index].city && formik.errors.dispatch && formik.errors.dispatch[index] && formik.errors.dispatch[index].city ?
                                                                                                (<span className='text-danger form_label'> {formik.errors.dispatch[index].city}</span>) : null
                                                                                            }
                                                                                        />
                                                                                    </div>

                                                                                    <div className="col-md-12">
                                                                                        <TextArea
                                                                                            label_name={lang.address}
                                                                                            placeholder=''
                                                                                            disabled={false}
                                                                                            rows={1}
                                                                                            name={`dispatch[${index}].address`}
                                                                                            value={formik.values.dispatch[index].address || ''}
                                                                                            onChange={formik.handleChange}
                                                                                            onBlur={formik.handleBlur}
                                                                                            error={formik.touched.dispatch && formik.touched.dispatch[index] && formik.touched.dispatch[index].address && formik.errors.dispatch && formik.errors.dispatch[index] && formik.errors.dispatch[index].address ?
                                                                                                (<span className='text-danger form_label'> {formik.errors.dispatch[index].address}</span>) : null
                                                                                            }
                                                                                        />
                                                                                    </div>

                                                                                    <div className="col-md-6">
                                                                                        <Text
                                                                                            label_name={lang.pin}
                                                                                            placeholder=''
                                                                                            disabled={false}
                                                                                            name={`dispatch[${index}].dispatchPin`}
                                                                                            value={formik.values.dispatch[index].dispatchPin || ''}
                                                                                            onChange={formik.handleChange}
                                                                                            onBlur={formik.handleBlur}
                                                                                            error={formik.touched.dispatch && formik.touched.dispatch[index] && formik.touched.dispatch[index].dispatchPin && formik.errors.dispatch && formik.errors.dispatch[index] && formik.errors.dispatch[index].dispatchPin ?
                                                                                                (<span className='text-danger form_label'> {formik.errors.dispatch[index].dispatchPin}</span>) : null
                                                                                            }
                                                                                        />
                                                                                    </div>

                                                                                    <div className="col-md-6">
                                                                                        <Text
                                                                                            label_name={lang.gst_no}
                                                                                            placeholder=''
                                                                                            disabled={false}
                                                                                            name={`dispatch[${index}].dispatchGSTNo`}
                                                                                            value={formik.values.dispatch[index].dispatchGSTNo || ''}
                                                                                            onChange={formik.handleChange}
                                                                                            onBlur={formik.handleBlur}
                                                                                            error={formik.touched.dispatch && formik.touched.dispatch[index] && formik.touched.dispatch[index].dispatchGSTNo && formik.errors.dispatch && formik.errors.dispatch[index] && formik.errors.dispatch[index].dispatchGSTNo ?
                                                                                                (<span className='text-danger form_label'> {formik.errors.dispatch[index].dispatchGSTNo}</span>) : null
                                                                                            }
                                                                                        />
                                                                                    </div>

                                                                                    <div className="col-md-6">
                                                                                        <Text
                                                                                            label_name={lang.priority}
                                                                                            placeholder=''
                                                                                            disabled={false}
                                                                                            name={`dispatch[${index}].priority`}
                                                                                            value={formik.values.dispatch[index].priority || ''}
                                                                                            onChange={formik.handleChange}
                                                                                            onBlur={formik.handleBlur}
                                                                                            error={formik.touched.dispatch && formik.touched.dispatch[index] && formik.touched.dispatch[index].priority && formik.errors.dispatch && formik.errors.dispatch[index] && formik.errors.dispatch[index].priority ?
                                                                                                (<span className='text-danger form_label'> {formik.errors.dispatch[index].priority}</span>) : null
                                                                                            }
                                                                                        />
                                                                                    </div>

                                                                                </div>
                                                                            </Card>
                                                                        </div>
                                                                    ))}
                                                                </div>

                                                                <div className="text-end mt-3">
                                                                    <SaveButton
                                                                        button_name={lang.update}
                                                                    />
                                                                </div>
                                                            </Card.Body>
                                                        </Card>
                                                    </div>
                                                </>
                                            )}
                                        />
                                    </div>
                                </div>
                            </Form >
                        </FormikProvider >
                        : ''
            }

            <ToastContainer />
        </>
    )
}
