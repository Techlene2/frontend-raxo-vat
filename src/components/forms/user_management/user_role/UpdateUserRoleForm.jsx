import React, { useEffect, useState } from 'react'
import { UserRoleImports } from './Imports'
const { Form, useFormik, SaveButton, SingleSelect, AddUserRoleSchema, ToastContainer, toast, useNavigate, useLocation, useDispatch, useSelector, userListTodo, roleListTodo, updateUserRoleTodo, userRoleDetailsTodo, Loader, lang } = UserRoleImports

export default function UpdateUserRoleForm() {

    const [loading, setLoading] = useState(true)
    const [breakLoading, setBreakLoading] = useState(true)

    const { state } = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const details = useSelector(state => state.userRoleDetails && state.userRoleDetails.data)
    const user = useSelector(state => state.userList && state.userList.data)
    const role = useSelector(state => state.roleList && state.roleList.data)
    // console.log(details)

    const user_option = user && user.map(val => (
        { "value": val.id, "label": val.firstName + ' ' + val.lastName }
    ))

    const role_option = role && role.map(val => (
        { "value": val.id, "label": val.name }
    ))

    const initialValues = {
        id: details && details.id,
        user: details && details.user && details.user.id,
        role: details && details.role && details.role.id,
    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: initialValues,
        validationSchema: AddUserRoleSchema,
        enableReinitialize: true,

        onSubmit: (values, action) => {
            // console.log("values", values)
            dispatch(updateUserRoleTodo({ 'values': values })).then((res) => update_res(res.payload, action))
        },
    })

    const update_res = (res, action) => {
        if (res && res.status == 200) {
            toast.success(lang.user_role + ' ' + lang.success_update, { position: "bottom-right" })
            action.resetForm()
            setTimeout(() => {
                navigate('/user-role-list')
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

    const user_role_details_res = (res) => {
        if (res && res.status == 200) {
            dispatch(userListTodo({ 'search': '' })).then((user_res) => {

                if (user_res.payload && user_res.payload.status == 200) {
                    dispatch(roleListTodo({ 'search': '' })).then((role_res) => {
                        if (role_res.payload && role_res.payload.status == 200) {
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
        dispatch(userRoleDetailsTodo({ 'id': state })).then((res) => user_role_details_res(res.payload))
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
                            <div className="layout">
                                <div className="container-fluid">
                                    <div className="row">

                                        <div className="col-md-3">
                                            <SingleSelect
                                                closeMenu={true}
                                                label_name={lang.user}
                                                // placeholder=''
                                                disabled={false}
                                                option={user_option ? user_option : []}
                                                name='user'
                                                defaultValue={user_option && user_option.find((option) => option.value == values.user)}
                                                onChange={(e) =>
                                                    setFieldValue('user', e.value)
                                                }
                                                onBlur={handleBlur}
                                                error={errors.user && touched.user ? (<span className='text-danger form_label' >{errors.user}</span>) : null}
                                            />
                                        </div>

                                        <div className="col-md-3">
                                            <SingleSelect
                                                closeMenu={true}
                                                label_name={lang.role}
                                                // placeholder=''
                                                disabled={false}
                                                option={role_option ? role_option : []}
                                                name='role'
                                                defaultValue={role_option && role_option.find((option) => option.value == values.role)}
                                                onChange={(e) =>
                                                    setFieldValue('role', e.value)
                                                }
                                                onBlur={handleBlur}
                                                error={errors.role && touched.role ? (<span className='text-danger form_label' >{errors.role}</span>) : null}
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
