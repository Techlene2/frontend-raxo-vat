import React, { useEffect, useState } from 'react'
import { GroupImport } from './Imports'
const { Text, TextArea, Form, SaveButton, useFormik, SelectStatus, SingleSelect, GroupSchema, useLocation, useNavigate, useDispatch, useSelector, groupTypeListTodo, Loader, groupListTodo, groupDetailsTodo, updateGroupTodo, ToastContainer, toast, lang } = GroupImport

export default function UpdateGroupForm() {

    const [loading, setLoading] = useState(true)
    const [breakLoading, setBreakLoading] = useState(true)
    const { state } = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const group_type = useSelector(state => state.groupTypeList && state.groupTypeList.data)
    const group = useSelector(state => state.groupList && state.groupList.data)
    const group_details = useSelector(state => state.groupDetails && state.groupDetails.data)
    // console.log(group_details)

    const type_option = group_type && group_type.filter(val => val.isActive == true).map(val => (
        { "value": val.id, "label": val.name }
    ))

    const parent_option = group && group.filter(val => val.isActive == true).map(val => (
        { "value": val.id, "label": val.name }
    ))

    const initialValues = {
        id: group_details && group_details.id,
        name: group_details && group_details.name,
        description: group_details && group_details.description,
        status: group_details && group_details.isActive,
        source: group_details && group_details.sourceApp,
        grouptype: group_details && group_details.groupType && group_details.groupType.id,
        parentgroup: group_details && group_details.parentGroup && group_details.parentGroup.id
    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: initialValues,
        validationSchema: GroupSchema,
        enableReinitialize: true,

        onSubmit: (values, action) => {
            // console.log(values)
            dispatch(updateGroupTodo({ 'values': values })).then((res) => update_res(res.payload, action))
        },
    })

    const update_res = (res, action) => {
        if (res && res.status == 200) {
            toast.success(lang.group + ' ' + lang.success_update, { position: "bottom-right" })
            action.resetForm()
            setTimeout(() => {
                navigate('/group-list')
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

    const group_details_res = (res) => {
        if (res && res.status == 200) {
            dispatch(groupTypeListTodo({ 'search': '' })).then((group_type_res) => {

                if (group_type_res.payload && group_type_res.payload.status == 200) {
                    dispatch(groupListTodo({ 'search': '' })).then((group_res) => {

                        if (group_res.payload && group_res.payload.status == 200) {

                            setLoading(false)
                            setBreakLoading(false)

                        } else {
                            setBreakLoading(false)
                        }
                    })

                } else {
                    setBreakLoading(false)
                }
            })

        } else if (res && res.status == 401) {
            localStorage.clear()
            navigate('/login')
        } else {
            setBreakLoading(false)
        }
    }

    useEffect(() => {
        setLoading(true)
        setBreakLoading(true)
        dispatch(groupDetailsTodo({ 'id': state })).then((res) => group_details_res(res.payload))
    }, [])

    return (
        <>
            {loading && breakLoading ?
                <div className="layout">
                    <Loader />
                </div>
                :

                loading && !breakLoading ?

                    <div className='layout'>
                        <div className='text-center'>
                            <h5>Something went wrong can't able to load update form</h5>
                        </div>
                    </div>

                    :

                    !loading && !breakLoading ?
                        <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                            <div className='layout'>
                                <div className='container-fluid'>
                                    <div className="row">

                                        <div className='col-md-3'>
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

                                        <div className='col-md-3'>
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

                                        <div className='col-md-3'>
                                            <SelectStatus
                                                closeMenu={true}
                                                label_name={lang.status}
                                                // placeholder='Select Status'
                                                disabled={false}
                                                name='status'
                                                defaultValue={values.status}
                                                onChange={(e) =>
                                                    setFieldValue('status', e.value)
                                                }
                                                onBlur={handleBlur}
                                                error={errors.status && touched.status ? (<span className='text-danger form_label' >{errors.status}</span>) : null}
                                            />
                                        </div>

                                        <div className='col-md-3'>
                                            <Text
                                                label_name={lang.sourceApp}
                                                placeholder=''
                                                disabled={false}
                                                name='source'
                                                value={values.source || ''}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                error={errors.source && touched.source ? (<span className='text-danger form_label' >{errors.source}</span>) : null}
                                            />
                                        </div>

                                        <div className='col-md-3'>
                                            <SingleSelect
                                                closeMenu={true}
                                                label_name={lang.groupType}
                                                // placeholder='Select Group Type'
                                                disabled={false}
                                                option={type_option ? type_option : []}
                                                name='grouptype'
                                                defaultValue={type_option && type_option.find((option) => option.value == values.grouptype)}
                                                onChange={(e) => setFieldValue("grouptype", e.value)}
                                                onBlur={handleBlur}
                                                error={errors.grouptype && touched.grouptype ? (<span className='text-danger form_label' >{errors.grouptype}</span>) : null}
                                            />
                                        </div>

                                        <div className='col-md-3'>
                                            <SingleSelect
                                                closeMenu={true}
                                                label_name={lang.parentGroup}
                                                // placeholder='Select Group Type'
                                                disabled={false}
                                                option={parent_option ? parent_option : []}
                                                name='parentgroup'
                                                defaultValue={parent_option && parent_option.find((option) => option.value == values.parentgroup)}
                                                onChange={(e) => setFieldValue('parentgroup', e.value)}
                                                onBlur={handleBlur}
                                                error={errors.parentgroup && touched.parentgroup ? (<span className='text-danger form_label' >{errors.parentgroup}</span>) : null}
                                            />
                                        </div>

                                        <div className="text-end">
                                            <SaveButton
                                                button_name={lang.update}
                                            />
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </Form>
                        : ''
            }
            <ToastContainer />
        </>
    )
}
