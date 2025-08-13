import React, { useEffect, useState } from 'react'
import { RolePermissionImport } from './Imports'
const { Form, SaveButton, useFormik, RolePermissionSchema, Card, SingleSelect, Checkbox, permissionMenuListTodo, useSelector, useDispatch, useNavigate, toast, ToastContainer, roleListTodo, rolePermissionByRoleTodo, addRolePermissionTodo, Loader, lang } = RolePermissionImport

export default function AssignRolePermissionForm() {

    const [loading, setLoading] = useState(true)
    const [breakLoading, setBreakLoading] = useState(true)
    const [checkLoading, setCheckLoading] = useState(false)
    const [checkBreakLoading, setCheckBreakLoading] = useState(false)
    const [role, setRole] = useState()
    const [permissionCheck, setPermissionCheck] = useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const permission = useSelector(state => state.permissionMenuList && state.permissionMenuList.data)
    const role_list = useSelector(state => state && state.roleList && state.roleList.data)
    // console.log(permissionCheck)

    const role_option = role_list && role_list.map(val => (
        { "value": val.id, "label": val.name }
    ))

    const initialValues = {
        role: role,
        permission: permissionCheck,
    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: initialValues,
        validationSchema: RolePermissionSchema,
        enableReinitialize: true,

        onSubmit: (values, action) => {
            const mergedDataMap = new Map();

            permissionCheck.forEach(currentItem => {
                const existingItem = mergedDataMap.get(currentItem.id);
                // console.log(existingItem, 'exit')
                if (existingItem) {
                    const actionAttributesArray = JSON.parse(existingItem.actionAttributes);
                    // console.log(actionAttributesArray, 'aray')
                    actionAttributesArray.push(currentItem.Attribute);
                    existingItem.actionAttributes = JSON.stringify(actionAttributesArray);
                } else {
                    mergedDataMap.set(currentItem.id, { permission: { 'id': currentItem.id }, "actionAttributes": JSON.stringify([currentItem.Attribute]) });
                }
            });

            const mergedData = Array.from(mergedDataMap.values());

            // console.log(mergedData)

            dispatch(addRolePermissionTodo({ 'values': values, 'permission': mergedData })).then((res) => add_res(res.payload, action))
        },
    })

    const add_res = (res, action) => {
        if (res && res.status == 201) {
            toast.success(lang.permission + ' ' + lang.success_add, { position: "bottom-right" })
        } else if (res && res.status == 401) {
            localStorage.clear()
            navigate('/login')
        } else if (res && res.status == 400) {
            toast.error("400 BAD REQUEST", { position: "bottom-right" })
        } else {
            toast.error(lang.wrong, { position: "bottom-right" })
        }
    }


    const action_checkbox = (parentName) => {
        setPermissionCheck(permissionCheck.concat(parentName))

        for (var i = 0, len = permissionCheck.length; i < len; i++) {

            if (permissionCheck[i].Attribute.actionName == parentName.Attribute.actionName) {
                setPermissionCheck((current) =>
                    current.filter((val) => val.Attribute.actionName !== parentName.Attribute.actionName)
                )
            }
        }
    }

    const parent_checkbox = (parentName, index) => {
        console.log(parentName)
        var test = document.getElementById(`check${index}`).checked

        if (test) {
            for (var i = 0, len = permissionCheck.length; i < len; i++) {

                if (permissionCheck[i].id == parentName.id) {
                    setPermissionCheck((current) =>
                        current.filter((val) => val.id !== parentName.id)
                    )
                }
            }

            parentName && parentName.actionAttributes && JSON.parse(parentName.actionAttributes).map((val) => {
                setPermissionCheck((prev) => [...prev, { 'id': parentName.id, 'Attribute': val }])
            })
        } else {
            for (var i = 0, len = permissionCheck.length; i < len; i++) {

                if (permissionCheck[i].id == parentName.id) {
                    setPermissionCheck((current) =>
                        current.filter((val) => val.id !== parentName.id)
                    )
                }
            }
        }
    }

    const load_permission = (val) => {

        setPermissionCheck([])
        setCheckLoading(true)
        setCheckBreakLoading(true)
        dispatch(rolePermissionByRoleTodo({ 'id': val })).then((res) => {

            if (res.payload && res.payload.status == 200) {

                res && res.payload && res.payload.data && res.payload.data.map(val => {
                    val && val.actionAttributes && JSON.parse(val.actionAttributes).map(action => {
                        setPermissionCheck((prev) => [...prev, { 'id': val.permission.id, 'Attribute': action }])
                    })
                })

                setCheckLoading(false)
                setCheckBreakLoading(false)
            } else {
                setCheckBreakLoading(false)
            }

        })
    }

    const role_res = (res) => {
        if (res && res.status == 200) {
            dispatch(permissionMenuListTodo({ 'search': '' })).then((permission_res) => {

                if (permission_res.payload && permission_res.payload.status == 200) {
                    setLoading(false)
                    setBreakLoading(false)
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
        dispatch(roleListTodo({ 'search': '' })).then((res) => role_res(res.payload))
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
                            <h5>Something went wrong can't able to load assign permission form</h5>
                        </div>
                    </div>

                    :

                    !loading && !breakLoading ?
                        <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} >
                            <div className='layout'>
                                <div className='container-fluid'>
                                    <div className="row row-flex">

                                        <div className='col-md-3'>
                                            <SingleSelect
                                                closeMenu={true}
                                                label_name={lang.role}
                                                // placeholder=''
                                                disabled={false}
                                                option={role_option ? role_option : []}
                                                name='role'
                                                defaultValue={role_option && role_option.find((option) => option.value == role)}
                                                onChange={(e) => {
                                                    setRole(e.value);
                                                    load_permission(e.value)
                                                }}
                                                onBlur={handleBlur}
                                                error={errors.role && touched.role ? (<span className='text-danger form_label' >{errors.role}</span>) : null}
                                            />
                                        </div>

                                        <div className="col-md-12">
                                            <div className="mt-2">
                                                <h6>{lang.permission} {errors.permission && touched.permission ? (<span className='text-danger form_label'>{(errors.permission)}</span>) : null}</h6>
                                            </div>
                                        </div>

                                        {checkLoading && checkBreakLoading ?
                                            <Loader />
                                            :

                                            checkLoading && !checkBreakLoading ?

                                                <div className='text-center'>
                                                    <h5>Something went wrong can't able to load permission</h5>
                                                </div>

                                                :

                                                !checkLoading && !checkBreakLoading ?
                                                    permission && permission.map((menuItem, index) => (
                                                        <div className='col-md-4 mb-2' key={index}>

                                                            <Card className='match_height'>
                                                                <Card.Header className='fw-bold'>
                                                                    <Checkbox
                                                                        id={`check${index}`}
                                                                        type="checkbox"
                                                                        label_value={menuItem.name}
                                                                        check={permissionCheck.some(val =>
                                                                            JSON.parse(menuItem.actionAttributes).map(value => value.actionName).includes(val.Attribute.actionName)
                                                                        )}
                                                                        onChange={() => parent_checkbox(menuItem, index)}
                                                                        name={'checkbox2'}
                                                                    />
                                                                </Card.Header>
                                                                <Card.Body>
                                                                    <div className="row">
                                                                        {menuItem && menuItem.actionAttributes && JSON.parse(menuItem.actionAttributes).map((submenuItem, index1) => (
                                                                            <div className="col-md-6" key={index1}>
                                                                                <Checkbox
                                                                                    type="checkbox"
                                                                                    label_value={submenuItem.actionName}
                                                                                    check={permissionCheck.some(val => val.Attribute.actionName == submenuItem.actionName)}
                                                                                    onChange={() => action_checkbox({ 'id': menuItem.id, 'Attribute': submenuItem })}
                                                                                    name={'checkbox2'}
                                                                                />
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </Card.Body>
                                                            </Card>
                                                        </div>
                                                    ))
                                                    : ''
                                        }

                                        <div className='text-end'>
                                            <SaveButton
                                                button_name={lang.submit}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Form >
                        : ''
            }
            <ToastContainer />
        </>
    )
}
