import React, { useState } from 'react'
import { MainMenuImport } from './Imports'
const { Form, IconSelect, useFormik, Text, TextArea, SelectStatus, SingleSelect, SaveButton, AddMainMenuSchema, useNavigate, useDispatch, addMenuTodo, ToastContainer, toast, lang } = MainMenuImport

export default function AddMainMenuForm() {

    const [icon, setIcon] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // const showMenu_option = [
    //     { "value": true, "label": "True" },
    //     { "value": false, "label": "False" }
    // ]

    const initialValues = {
        menuName: '',
        menuDesc: '',
        // route: '',
        menuIcon: '',
        status: '',
        menuPriority: '',
        // showInMenu: '',
    };

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: initialValues,
        validationSchema: AddMainMenuSchema,

        onSubmit: (values, action) => {
            // console.log("value", values)
            dispatch(addMenuTodo({ 'values': values })).then((res) => add_res(res.payload, action))
        },
    })

    const add_res = (res, action) => {
        if (res && res.status == 201) {
            toast.success(lang.main_menu + ' ' + lang.success_add, { position: "bottom-right" })
            action.resetForm()
            setIcon('')
            setTimeout(() => {
                navigate('/main-menu-list')
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

    return (
        <>
            <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                <div className="layout">
                    <div className="container-fluid">
                        <div className="row">

                            <div className="col-md-3">
                                <Text
                                    label_name={lang.name}
                                    placeholder=''
                                    disabled={false}
                                    name='menuName'
                                    value={values.menuName || ''}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.menuName && touched.menuName ? (<span className='text-danger form_label' >{errors.menuName}</span>) : null}
                                />
                            </div>

                            <div className="col-md-3">
                                <TextArea
                                    label_name={lang.description}
                                    placeholder=''
                                    disabled={false}
                                    rows={1}
                                    name='menuDesc'
                                    value={values.menuDesc || ''}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.menuDesc && touched.menuDesc ? (<span className='text-danger form_label' >{errors.menuDesc}</span>) : null}
                                />
                            </div>

                            {/* <div className="col-md-3">
                                <Text
                                    label_name='Route'
                                    placeholder=''
                                    disabled={false}
                                    name='route'
                                    value={values.route || ''}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.route && touched.route ? (<span className='text-danger form_label' >{errors.route}</span>) : null}
                                />
                            </div> */}

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

                            <div className="col-md-3">
                                <Text
                                    label_name={lang.priority}
                                    placeholder=''
                                    disabled={false}
                                    name='menuPriority'
                                    value={values.menuPriority || ''}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.menuPriority && touched.menuPriority ? (<span className='text-danger form_label' >{errors.menuPriority}</span>) : null}
                                />
                            </div>

                            {/* <div className="col-md-3">
                                <SingleSelect
                                    closeMenu={true}
                                    label_name='Show In Menu'
                                    // placeholder='Select Show In Menu'
                                    disabled={false}
                                    option={showMenu_option}
                                    name='showInMenu'
                                    defaultValue={""}
                                    onChange={(e) =>
                                        setFieldValue('showInMenu', e.value)
                                    }
                                    onBlur={handleBlur}
                                    error={errors.showInMenu && touched.showInMenu ? (<span className='text-danger form_label' >{errors.showInMenu}</span>) : null}
                                />
                            </div> */}

                            <div className="col-md-3">
                                <IconSelect
                                    label_name={lang.menu_icon}
                                    name='menuIcon'
                                    value={values.menuIcon || icon}
                                    onChange={(e) => { setFieldValue('menuIcon', e); setIcon(e) }}
                                    onBlur={handleBlur}
                                    error={errors.menuIcon && touched.menuIcon ? (<span className='text-danger form_label' >{errors.menuIcon}</span>) : null}
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
