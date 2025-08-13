import React, { useEffect, useRef, useState } from 'react'
import { ItemImport } from './Imports.js'
import ItemModal from './ItemModal.jsx'
const { Text, Form, useFormik, SaveButton, TextArea, File, SingleSelect, SelectStatus, Checkbox, toast, ToastContainer, Loader, ItemSchema, useNavigate, useDispatch, useSelector, measureUnitListTodo, taxListTodo, categoryListTodo, groupListTodo, addItemTodo, Button, LuPlus, brandListTodo, costCenterListTodo, lang, subCatbyCatTodo, colorListTodo, segmentListTodo, rackListTodo } = ItemImport

export default function AddItemForm() {

    const subCatRef = useRef()
    const [loading, setLoading] = useState(false)
    const [subCatLoading, setSubCatLoading] = useState(false)
    const [modalBool, setModalBool] = useState(false)
    const [show, setShow] = useState(false)
    const [call, setCall] = useState()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const unit = useSelector(state => state.measureUnitList && state.measureUnitList.data)
    const tax = useSelector(state => state.taxList && state.taxList.data)
    const group = useSelector(state => state.groupList && state.groupList.data)
    const category = useSelector(state => state.categoryList && state.categoryList.data)
    const sub_category = useSelector(state => state.subCatbyCat && state.subCatbyCat.data)
    const brand = useSelector(state => state && state.brandList && state.brandList.data)
    const cost_center = useSelector(state => state && state.costCenterList && state.costCenterList.data)
    const color = useSelector(state => state && state.colorList && state.colorList.data)
    const segment = useSelector(state => state && state.segmentList && state.segmentList.data)
    const rack = useSelector(state => state && state.rackList && state.rackList.data)
    // console.log(rack)

    const unit_option = unit && unit.map(val => (
        { "value": val.id, "label": val.name }
    ))

    const tax_option = tax && tax.map(val => (
        { "value": val.id, "label": val.name }
    ))

    const group_option = group && group.map(val => (
        { "value": val.id, "label": val.name }
    ))

    const category_option = category && category.map(val => (
        { "value": val.id, "label": val.name }
    ))

    const sub_category_option = sub_category && sub_category.map(val => (
        { "value": val.id, "label": val.name }
    ))

    const brand_option = brand && brand.map(val => (
        { "value": val.id, "label": val.name }
    ))

    const cost_center_option = cost_center && cost_center.map(val => (
        { "value": val.id, "label": val.name }
    ))

    const color_option = color && color.map(val => (
        { "value": val.id, "label": val.colorName }
    ))

    const segment_option = segment && segment.map(val => (
        { "value": val.id, "label": val.segmentName }
    ))

    const rack_option = rack && rack.map(val => (
        { "value": val.id, "label": val.rackNumber }
    ))

    const handleShow = (val) => {
        setCall(val)
        setShow(true)
    }

    const initialValues = {
        category: '',
        sub_category: '',
        brand: '',
        cost_center: '',
        sold: false,
        purchased: false,
        return: false,

        name: '',
        description: '',
        item_code: '',
        item_image: '',
        group: '',
        primary_unit: '',
        barcode: '',
        status: '',

        tax: '',
        secondary_unit: '',
        color: '',
        weight: '',
        conversion: '',
        segment: '',
        rack: '',
        sourceApp: '',
    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: initialValues,
        validationSchema: ItemSchema,

        onSubmit: (values, action) => {
            // console.log(values)
            dispatch(addItemTodo({ 'values': values })).then((res) => add_res(res.payload, action))
        }
    })

    const add_res = (res, action) => {
        if (res && res.status == 201) {
            toast.success(lang.item + ' ' + lang.success_add, { position: "bottom-right" })
            action.resetForm()
            setTimeout(() => {
                navigate('/item-list')
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

    const load_sub_cat = (id) => {
        if (id) {
            setSubCatLoading(true)
            dispatch(subCatbyCatTodo(id)).then((res) => sub_cat_res(res.payload))
            subCatRef.current.setValue([])
        }
    }

    const sub_cat_res = (res) => {
        if (res && res.status == 200) {
            setSubCatLoading(false)
        } else {
            setSubCatLoading(false)
        }
    }

    const unit_res = (res) => {
        if (res && res.status == 200) {
            dispatch(taxListTodo({ 'search': '' })).then((tax_res) => {

                if (tax_res.payload && tax_res.payload.status == 200) {
                    dispatch(groupListTodo({ 'search': '' })).then((group_res) => {

                        if (group_res.payload && group_res.payload.status == 200) {
                            dispatch(categoryListTodo({ 'search': '' })).then((catg_res) => {

                                if (catg_res.payload && catg_res.payload.status == 200) {
                                    dispatch(brandListTodo({ 'search': '' })).then((brand_res) => {

                                        if (brand_res.payload && brand_res.payload.status == 200) {
                                            dispatch(costCenterListTodo({ 'search': '' })).then((cost_center_res) => {

                                                if (cost_center_res.payload && cost_center_res.payload.status == 200) {
                                                    setLoading(false)
                                                }
                                                else {
                                                    setLoading(false)
                                                }
                                            })
                                        }
                                        else {
                                            setLoading(false)
                                        }
                                    })
                                }
                                else {
                                    setLoading(false)
                                }
                            })
                        }

                        else {
                            setLoading(false)
                        }
                    })

                } else {
                    setLoading(false)
                }
            })

        } else if (res && res.status == 401) {
            localStorage.clear()
            navigate('/login')
        } else {
            setLoading(false)
        }
    }

    useEffect(() => {
        setLoading(true)
        dispatch(measureUnitListTodo({ 'search': '' })).then((res) => unit_res(res.payload))
    }, [])

    useEffect(() => {
        dispatch(colorListTodo())
        dispatch(segmentListTodo())
        dispatch(rackListTodo())
    }, [modalBool])

    return (
        <>
            {loading ?
                <div className="layout">
                    <Loader />
                </div>
                :
                <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                    <div className="layout">
                        <div className='container-fluid'>
                            <div className="row">

                                <div className="col-md-12">
                                    <h6>{lang.basic_details}</h6>
                                </div>

                                <div className="col-md-3">
                                    <SingleSelect
                                        closeMenu={true}
                                        label_name={lang.category}
                                        // placeholder=''
                                        disabled={false}
                                        option={category_option ? category_option : []}
                                        name='category'
                                        defaultValue={""}
                                        onChange={(e) => {
                                            load_sub_cat(e.value);
                                            setFieldValue('category', e.value);
                                            setFieldValue('sub_category', '');
                                        }}
                                        onBlur={handleBlur}
                                        error={errors.category && touched.category ? (<span className='text-danger form_label' >{errors.category}</span>) : null}
                                    />
                                </div>

                                <div className="col-md-3">
                                    <SingleSelect
                                        reference={subCatRef}
                                        closeMenu={true}
                                        label_name={lang.sub_category}
                                        // placeholder=''
                                        disabled={false}
                                        option={sub_category_option ? sub_category_option : []}
                                        name='sub_category'
                                        defaultValue={""}
                                        onChange={(e) => {
                                            setFieldValue('sub_category', e.value);
                                        }}
                                        onBlur={handleBlur}
                                        loading={subCatLoading}
                                        error={errors.sub_category && touched.sub_category ? (<span className='text-danger form_label' >{errors.sub_category}</span>) : null}
                                    />
                                </div>

                                <div className="col-md-3">
                                    <SingleSelect
                                        closeMenu={true}
                                        label_name={lang.brand}
                                        // placeholder=''
                                        disabled={false}
                                        option={brand_option ? brand_option : []}
                                        name='brand'
                                        defaultValue={""}
                                        onChange={(e) => {
                                            setFieldValue('brand', e.value);
                                        }}
                                        onBlur={handleBlur}
                                        error={errors.brand && touched.brand ? (<span className='text-danger form_label' >{errors.brand}</span>) : null}
                                    />
                                </div>

                                <div className="col-md-3">
                                    <SingleSelect
                                        closeMenu={true}
                                        label_name={lang.cost_center}
                                        // placeholder=''
                                        disabled={false}
                                        option={cost_center_option ? cost_center_option : []}
                                        name='cost_center'
                                        defaultValue={""}
                                        onChange={(e) => {
                                            setFieldValue('cost_center', e.value);
                                        }}
                                        onBlur={handleBlur}
                                        error={errors.cost_center && touched.cost_center ? (<span className='text-danger form_label' >{errors.cost_center}</span>) : null}
                                    />
                                </div>

                                <div className="col-md-3">
                                    <Checkbox
                                        label_value={lang.sold}
                                        disabled={false}
                                        check={values.sold}
                                        name='sold'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={errors.sold && touched.sold ? (<span className='text-danger form_label' >{errors.sold}</span>) : null}
                                    />
                                </div>

                                <div className="col-md-3">
                                    <Checkbox
                                        label_value={lang.purchased}
                                        disabled={false}
                                        check={values.purchased}
                                        name='purchased'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={errors.purchased && touched.purchased ? (<span className='text-danger form_label' >{errors.purchased}</span>) : null}
                                    />
                                </div>

                                <div className="col-md-3">
                                    <Checkbox
                                        label_value={lang.returned}
                                        disabled={false}
                                        check={values.return}
                                        name='return'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={errors.return && touched.return ? (<span className='text-danger form_label' >{errors.return}</span>) : null}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="layout">
                        <div className='container-fluid'>
                            <div className="row">

                                <div className="col-md-12">
                                    <h6>{lang.main_details}</h6>
                                </div>

                                <div className="col-md-3">
                                    <Text
                                        label_name={lang.name}
                                        placeholder=''
                                        disabled={false}
                                        name='name'
                                        value={values.name || ''}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={errors.name && touched.name ? (<span className='text-danger form_label' >{errors.name}</span>) : null}
                                    />
                                </div>

                                <div className="col-md-3">
                                    <TextArea
                                        label_name={lang.description}
                                        placeholder=''
                                        disabled={false}
                                        rows={1}
                                        name='description'
                                        value={values.description || ''}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={errors.description && touched.description ? (<span className='text-danger form_label' >{errors.description}</span>) : null}
                                    />
                                </div>

                                <div className="col-md-3">
                                    <Text
                                        label_name={lang.item_code}
                                        placeholder=''
                                        disabled={false}
                                        name='item_code'
                                        value={values.item_code || ''}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={errors.item_code && touched.item_code ? (<span className='text-danger form_label' >{errors.item_code}</span>) : null}
                                    />
                                </div>

                                <div className="col-md-3">
                                    <File
                                        label_name={lang.item_image}
                                        disabled={false}
                                        name='item_image'
                                        onChange={(e) => setFieldValue("item_image", e.currentTarget.files[0])}
                                        onBlur={handleBlur}
                                        error={errors.item_image && touched.item_image ? (<span className='text-danger form_label' >{errors.item_image}</span>) : null}
                                        accept="image/jpg, image/jpeg, image/png"
                                    />
                                </div>

                                <div className="col-md-3">
                                    <SingleSelect
                                        closeMenu={true}
                                        label_name={lang.group}
                                        // placeholder=''
                                        disabled={false}
                                        option={group_option ? group_option : []}
                                        name='group'
                                        defaultValue={""}
                                        onChange={(e) => {
                                            setFieldValue('group', e.value);
                                        }}
                                        onBlur={handleBlur}
                                        error={errors.group && touched.group ? (<span className='text-danger form_label' >{errors.group}</span>) : null}
                                    />
                                </div>

                                <div className="col-md-3">
                                    <SingleSelect
                                        closeMenu={true}
                                        label_name={lang.primary_unit}
                                        // placeholder=''
                                        disabled={false}
                                        option={unit_option ? unit_option : []}
                                        name='primary_unit'
                                        defaultValue={""}
                                        onChange={(e) => {
                                            setFieldValue('primary_unit', e.value);
                                        }}
                                        onBlur={handleBlur}
                                        error={errors.primary_unit && touched.primary_unit ? (<span className='text-danger form_label' >{errors.primary_unit}</span>) : null}
                                    />
                                </div>

                                <div className="col-md-3">
                                    <Text
                                        label_name={lang.barcode}
                                        placeholder=''
                                        disabled={false}
                                        name='barcode'
                                        value={values.barcode || ''}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={errors.barcode && touched.barcode ? (<span className='text-danger form_label' >{errors.barcode}</span>) : null}
                                    />
                                </div>

                                <div className="col-md-3">
                                    <SelectStatus
                                        closeMenu={true}
                                        label_name={lang.status}
                                        // placeholder='Select Status'
                                        disabled={false}
                                        name='status'
                                        defaultValue={""}
                                        onChange={(e) =>
                                            setFieldValue('status', e.value)
                                        }
                                        onBlur={handleBlur}
                                        error={errors.status && touched.status ? (<span className='text-danger form_label' >{errors.status}</span>) : null}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="layout">
                        <div className='container-fluid'>
                            <div className="row">

                                <div className="col-md-12">
                                    <h6>{lang.other_details}</h6>
                                </div>

                                <div className="col-md-3">
                                    <SingleSelect
                                        closeMenu={true}
                                        label_name={lang.tax}
                                        // placeholder=''
                                        disabled={false}
                                        option={tax_option ? tax_option : []}
                                        name='tax'
                                        defaultValue={""}
                                        onChange={(e) => {
                                            setFieldValue('tax', e.value);
                                        }}
                                        onBlur={handleBlur}
                                        error={errors.tax && touched.tax ? (<span className='text-danger form_label' >{errors.tax}</span>) : null}
                                    />
                                </div>

                                <div className="col-md-3">
                                    <SingleSelect
                                        closeMenu={true}
                                        label_name={lang.secondary_unit}
                                        // placeholder=''
                                        disabled={false}
                                        option={unit_option ? unit_option : []}
                                        name='secondary_unit'
                                        defaultValue={""}
                                        onChange={(e) => {
                                            setFieldValue('secondary_unit', e.value);
                                        }}
                                        onBlur={handleBlur}
                                        error={errors.secondary_unit && touched.secondary_unit ? (<span className='text-danger form_label' >{errors.secondary_unit}</span>) : null}
                                    />
                                </div>

                                <div className="col-md-3">
                                    <Text
                                        label_name={lang.weight}
                                        placeholder=''
                                        disabled={false}
                                        name='weight'
                                        value={values.weight || ''}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={errors.weight && touched.weight ? (<span className='text-danger form_label' >{errors.weight}</span>) : null}
                                    />
                                </div>

                                <div className="col-md-3">
                                    <Text
                                        label_name={lang.conversion}
                                        placeholder=''
                                        disabled={false}
                                        name='conversion'
                                        value={values.conversion || ''}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={errors.conversion && touched.conversion ? (<span className='text-danger form_label' >{errors.conversion}</span>) : null}
                                    />
                                </div>

                                <div className="col-md-3">
                                    <div className="row">
                                        <div className="col-md-10">
                                            <SingleSelect
                                                closeMenu={true}
                                                label_name={lang.color}
                                                // placeholder=''
                                                disabled={false}
                                                option={color_option ? color_option : []}
                                                name='color'
                                                defaultValue={""}
                                                onChange={(e) => {
                                                    setFieldValue('color', e.value);
                                                }}
                                                onBlur={handleBlur}
                                                error={errors.color && touched.color ? (<span className='text-danger form_label' >{errors.color}</span>) : null}
                                            />
                                        </div>
                                        <div className="col-md-2">
                                            <Button
                                                variant="outline-primary"
                                                size='sm'
                                                onClick={() => handleShow('color')}
                                                className=''
                                                style={{ marginTop: '30px' }}
                                            >
                                                <LuPlus className='mb-1' size={14} />
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <div className="row">
                                        <div className="col-md-10">
                                            <SingleSelect
                                                closeMenu={true}
                                                label_name={lang.segment}
                                                // placeholder=''
                                                disabled={false}
                                                option={segment_option ? segment_option : []}
                                                name='segment'
                                                defaultValue={""}
                                                onChange={(e) => {
                                                    setFieldValue('segment', e.value);
                                                }}
                                                onBlur={handleBlur}
                                                error={errors.segment && touched.segment ? (<span className='text-danger form_label' >{errors.segment}</span>) : null}
                                            />
                                        </div>
                                        <div className="col-md-2">
                                            <Button
                                                variant="outline-primary"
                                                size='sm'
                                                onClick={() => handleShow('segment')}
                                                className=''
                                                style={{ marginTop: '30px' }}
                                            >
                                                <LuPlus className='mb-1' size={14} />
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <div className="row">
                                        <div className="col-md-10">
                                            <SingleSelect
                                                closeMenu={true}
                                                label_name={lang.rack}
                                                // placeholder=''
                                                disabled={false}
                                                option={rack_option ? rack_option : []}
                                                name='rack'
                                                defaultValue={""}
                                                onChange={(e) => {
                                                    setFieldValue('rack', e.value)
                                                }}
                                                onBlur={handleBlur}
                                                error={errors.rack && touched.rack ? (<span className='text-danger form_label' >{errors.rack}</span>) : null}
                                            />
                                        </div>
                                        <div className="col-md-2">
                                            <Button
                                                variant="outline-primary"
                                                size='sm'
                                                onClick={() => handleShow('rack')}
                                                className=''
                                                style={{ marginTop: '30px' }}
                                            >
                                                <LuPlus className='mb-1' size={14} />
                                            </Button>
                                        </div>
                                    </div>

                                </div>

                                <div className="col-md-3">
                                    <Text
                                        label_name={lang.source_app}
                                        placeholder=''
                                        disabled={false}
                                        name='sourceApp'
                                        value={values.sourceApp || ''}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={errors.sourceApp && touched.sourceApp ? (<span className='text-danger form_label' >{errors.sourceApp}</span>) : null}
                                    />
                                </div>

                                <div className="text-end">
                                    <SaveButton
                                        button_name={lang.submit}
                                    />
                                </div>

                            </div>
                        </div>
                    </div>
                </Form>
            }

            <ItemModal show={show} setShow={setShow} call={call} setCall={setCall} modalBool={modalBool} setModalBool={setModalBool} />
            <ToastContainer />
        </>
    )
}

