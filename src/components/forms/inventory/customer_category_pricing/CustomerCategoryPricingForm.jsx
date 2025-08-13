import React, { useState, useEffect } from 'react'
import { CustomerCategoryPricingImport } from './Imports'
const { Form, Button, Table, useFormik, FormikProvider, FieldArray, CustomerCategoryPricingSchema, SingleSelect, DatePicker, moment, Number, TextArea, SaveButton, useNavigate, useDispatch, useSelector, subCategoryListTodo, brandListTodo, Loader, customerCategoryPricingFilterTodo, Swal, ToastContainer, toast, updateCustomerCategoryPricingTodo, customerCategoryListTodo, lang } = CustomerCategoryPricingImport

export default function CustomerCategoryPricingForm() {

    const [loading, setLoading] = useState(true)
    const [pricingLoader, setPricingLoader] = useState(false)
    const [filterData, setFilterData] = useState({ "customer_cat": '', "sub_cat": '', "brand": '', "effective_date": '' })
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const sub_cat = useSelector(state => state && state.subCategoryList && state.subCategoryList.data)
    const brand = useSelector(state => state && state.brandList && state.brandList.data)
    const customer_category = useSelector(state => state.customerCategoryList && state.customerCategoryList.data)
    const product_price = useSelector(state => state && state.customerCategoryPricingFilter && state.customerCategoryPricingFilter.data)
    // console.log(product_price)

    const sub_category_option = sub_cat && sub_cat.map(val => (
        { "value": val.id, "label": val.name }
    ))

    const brand_option = brand && brand.map(val => (
        { "value": val.id, "label": val.name }
    ))

    const customer_category_option = customer_category && customer_category.map(val => (
        { "value": val.id, "label": val.name }
    ))

    const initialValues = {
        customer_category: "",
        sub_cat: "",
        brand: "",
        effective_date: "",
        effective_from: "",
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: CustomerCategoryPricingSchema,
        enableReinitialize: true,

        onSubmit: (values, action) => {
            // console.log(values)
            dispatch(updateCustomerCategoryPricingTodo({ 'values': values, 'filter': filterData })).then((res) => add_res(res.payload, action))
        }
    })

    const add_res = (res, action) => {
        if (res && res.status == 201) {
            toast.success(lang.customer_cat_pricing + ' ' + lang.success_update, { position: "bottom-right" })
            setTimeout(() => {
                navigate('/customer-category-pricing-list')
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

    const apply_filter = () => {
        if (formik.values.customer_category && formik.values.effective_date && formik.values.sub_cat || formik.values.customer_category && formik.values.effective_date && formik.values.brand) {
            setPricingLoader(true)
            setFilterData({
                "customer_cat": formik.values.customer_category, "sub_cat": formik.values.sub_cat, "brand": formik.values.brand, "effective_date": formik.values.effective_date
            })
            dispatch(customerCategoryPricingFilterTodo({ "customer_cat": formik.values.customer_category, 'date': formik.values.effective_date, 'sub_cat_id': formik.values.sub_cat, 'brand_id': formik.values.brand })).then((res) => pricing_res(res.payload))
        } else {
            Swal.fire({
                title: lang.customer_category_pricing_filter,
                text: lang.customer_category_pricing_filter_error,
                icon: "error",
                confirmButtonText: lang.ok
            })
        }
    }

    const pricing_res = (res) => {
        if (res && res.status == 200) {
            setPricingLoader(false)
        } else if (res && res.status == 401) {
            localStorage.clear()
            navigate('/login')
        } else {
            setPricingLoader(false)
        }
    }

    useEffect(() => {
        formik.setValues({
            ...formik.values,
            product_price: product_price && product_price.map(val => ({
                item_id: val && val.id,
                item_name: `${val && val.name} (${val && val.code})`,
                sub_cat: val && val.subCategory && val.subCategory.name,
                brand: val && val.brandMaster && val.brandMaster.name,
                old_rate: val && val.price ? val && val.price : 0,
                new_rate: val && val.price ? val && val.price : 0,
                remark: val && val.remarks
            }))
        });
    }, [product_price])

    useEffect(() => {
        setLoading(true)
        dispatch(customerCategoryListTodo({ 'search': '' }))
        dispatch(subCategoryListTodo({ 'search': '' }))
        dispatch(brandListTodo({ 'search': '' }))
        setLoading(false)

        return () => {
            dispatch(customerCategoryPricingFilterTodo({ "customer_cat": '', 'date': '', 'sub_cat_id': '', 'brand_id': '' }))
        }
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
                        <div className="layout">
                            <div className="container-fluid">
                                <div className="row">

                                    <div className="col">
                                        <SingleSelect
                                            closeMenu={true}
                                            label_name={lang.customer_cat}
                                            // placeholder=''
                                            disabled={false}
                                            option={customer_category_option ? customer_category_option : []}
                                            name='customer_category'
                                            defaultValue={""}
                                            onChange={(e) => formik.setFieldValue('customer_category', e.value)}
                                            onBlur={formik.handleBlur}
                                            error={formik.errors.customer_category && formik.touched.customer_category ? (<span className='text-danger form_label' >{formik.errors.customer_category}</span>) : null}
                                        />
                                    </div>

                                    <div className="col">
                                        <SingleSelect
                                            closeMenu={true}
                                            label_name={lang.sub_cat}
                                            // placeholder=''
                                            disabled={false}
                                            option={sub_category_option ? sub_category_option : []}
                                            name='sub_cat'
                                            defaultValue={""}
                                            onChange={(e) => formik.setFieldValue('sub_cat', e.value)}
                                            onBlur={formik.handleBlur}
                                            error={formik.errors.sub_cat && formik.touched.sub_cat ? (<span className='text-danger form_label' >{formik.errors.sub_cat}</span>) : null}
                                        />
                                    </div>

                                    <div className="col">
                                        <SingleSelect
                                            closeMenu={true}
                                            label_name={lang.brand}
                                            // placeholder=''
                                            disabled={false}
                                            option={brand_option ? brand_option : []}
                                            name='brand'
                                            defaultValue={""}
                                            onChange={(e) => formik.setFieldValue('brand', e.value)}
                                            onBlur={formik.handleBlur}
                                            error={formik.errors.brand && formik.touched.brand ? (<span className='text-danger form_label' >{formik.errors.brand}</span>) : null}
                                        />
                                    </div>

                                    <div className="col">
                                        <DatePicker
                                            label_name={lang.effective_date}
                                            placeholder='Choose Date'
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
                                            name='effective_date'
                                            value={formik.values.effective_date}
                                            onChange={(e) => {
                                                formik.setFieldValue('effective_date', moment(e[0]).format("YYYY-MM-DDTHH:mm:ss[Z]"));
                                                formik.setFieldValue('effective_from', moment(e[0]).format("YYYY-MM-DDTHH:mm:ss[Z]"))
                                            }}
                                            onBlur={formik.handleBlur}
                                            error={formik.errors.effective_date && formik.touched.effective_date ? (<span className='text-danger form_label' >{formik.errors.effective_date}</span>) : null}
                                        />
                                    </div>

                                    <div className="col">
                                        <DatePicker
                                            label_name={lang.effective_from}
                                            placeholder='Choose Date'
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
                                            name='effective_from'
                                            value={formik.values.effective_from}
                                            onChange={(e) =>
                                                formik.setFieldValue('effective_from', moment(e[0]).format("YYYY-MM-DDTHH:mm:ss[Z]"))
                                            }
                                            onBlur={formik.handleBlur}
                                            error={formik.errors.effective_from && formik.touched.effective_from ? (<span className='text-danger form_label' >{formik.errors.effective_from}</span>) : null}
                                        />
                                    </div>

                                    <div className={localStorage.getItem('lang_key') == 'ar' ? "text-start" : "text-end"}>
                                        <span>
                                            <Button
                                                type='button'
                                                variant="secondary"
                                                size='sm'
                                                onClick={() => apply_filter()}
                                            >
                                                {lang.search}
                                            </Button>
                                        </span>

                                        <span className={localStorage.getItem('lang_key') == 'ar' ? 'me-1' : 'ms-1'}>
                                            <SaveButton
                                                button_name={lang.submit}
                                            />
                                        </span>
                                    </div>

                                </div>
                            </div>
                        </div>

                        {pricingLoader ?
                            <div className="layout">
                                <Loader />
                            </div>
                            :
                            <div className="layout">
                                <FieldArray
                                    name="product_price"
                                    render={(arrayHelpers) => (
                                        <>
                                            <div className='item_table'>
                                                <Table bordered responsive size="sm" style={{ fontSize: '13px' }}>
                                                    <thead>
                                                        <tr className='form_label'>
                                                            <th>{lang.item}</th>
                                                            <th>{lang.sub_cat}</th>
                                                            <th>{lang.brand}</th>
                                                            <th>{lang.old_rate}</th>
                                                            <th>{lang.new_rate}</th>
                                                            <th>{lang.remark}</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {formik.values.product_price && formik.values.product_price.length ? formik.values.product_price && formik.values.product_price.map((filed, index) => (
                                                            <tr key={index}>
                                                                <td style={{ fontWeight: '500' }}>{filed.item_name}</td>
                                                                <td>{filed.sub_cat}</td>
                                                                <td>{filed.brand}</td>
                                                                <td>{filed.old_rate}</td>
                                                                <td style={{ width: '300px' }}>
                                                                    <Number
                                                                        form_group={'inherit'}
                                                                        label_name={''}
                                                                        placeholder=''
                                                                        disabled={false}
                                                                        name={`product_price[${index}].new_rate`}
                                                                        value={formik.values.product_price[index].new_rate ?? ''}
                                                                        onChange={formik.handleChange}
                                                                        onBlur={formik.handleBlur}
                                                                        error={formik.touched.product_price && formik.touched.product_price[index] && formik.touched.product_price[index].new_rate && formik.errors.product_price && formik.errors.product_price[index] && formik.errors.product_price[index].new_rate ?
                                                                            (<span className='text-danger form_label'> {formik.errors.product_price[index].new_rate}</span>) : null
                                                                        }
                                                                    />
                                                                </td>
                                                                <td style={{ width: '300px' }}>
                                                                    <TextArea
                                                                        form_group={'inherit'}
                                                                        label_name={''}
                                                                        placeholder=''
                                                                        disabled={false}
                                                                        rows={1}
                                                                        name={`product_price[${index}].remark`}
                                                                        value={formik.values.product_price[index].remark || ''}
                                                                        onChange={formik.handleChange}
                                                                        onBlur={formik.handleBlur}
                                                                        error={formik.touched.product_price && formik.touched.product_price[index] && formik.touched.product_price[index].remark && formik.errors.product_price && formik.errors.product_price[index] && formik.errors.product_price[index].remark ?
                                                                            (<span className='text-danger form_label'> {formik.errors.product_price[index].remark}</span>) : null
                                                                        }
                                                                    />
                                                                </td>
                                                            </tr>
                                                        ))
                                                            :
                                                            <tr>
                                                                <td colSpan={6} className='text-center'>{formik.errors.product_price && formik.touched.product_price ? (<span className='text-danger form_label' >{formik.errors.product_price}</span>) : null}</td>
                                                            </tr>
                                                        }
                                                    </tbody>
                                                </Table>
                                            </div>
                                        </>
                                    )}
                                />
                            </div>
                        }
                    </Form>
                </FormikProvider>
            }

            <ToastContainer />
        </>
    )
}

