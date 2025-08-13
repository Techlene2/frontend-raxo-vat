import React, { useEffect } from 'react'
import { UserRoleImports } from './Imports'
const { Form, useFormik, SaveButton, SingleSelect, AddUserRoleSchema, ToastContainer, toast, useNavigate, useDispatch, useSelector, userListTodo, roleListTodo, addUserRoleTodo, lang } = UserRoleImports

export default function AddUserRoleForm() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(state => state.userList && state.userList.data)
    const role = useSelector(state => state.roleList && state.roleList.data)
    // console.log(role)

    const user_option = user && user.map(val => (
        { "value": val.id, "label": val.firstName + ' ' + val.lastName }
    ))

    const role_option = role && role.map(val => (
        { "value": val.id, "label": val.name }
    ))

    const initialValues = {
        user: '',
        role: '',
    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: initialValues,
        validationSchema: AddUserRoleSchema,

        onSubmit: (values, action) => {
            // console.log("values", values)
            dispatch(addUserRoleTodo({ 'values': values })).then((res) => add_res(res.payload, action))
        },
    })

    const add_res = (res, action) => {
        if (res && res.status == 201) {
            toast.success(lang.user_role + ' ' + lang.success_add, { position: "bottom-right" })
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

    useEffect(() => {
        dispatch(userListTodo({ 'search': '' }))
        dispatch(roleListTodo({ 'search': '' }))
    }, [])

    return (
        <>
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
                                    defaultValue={""}
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
                                    defaultValue={""}
                                    onChange={(e) =>
                                        setFieldValue('role', e.value)
                                    }
                                    onBlur={handleBlur}
                                    error={errors.role && touched.role ? (<span className='text-danger form_label' >{errors.role}</span>) : null}
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

            <ToastContainer />
        </>
    )
}
