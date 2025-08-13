import React, { useEffect, useState } from 'react'
import { SubMenuImport } from './Imports'
const { Form, IconSelect, useFormik, Text, TextArea, SingleSelect, SaveButton, AddSubMenuSchema, useNavigate, useLocation, useDispatch, useSelector, menuListTodo, ToastContainer, toast, Loader, subMenuTodo, lang } = SubMenuImport

export default function UpdateSubMenuForm() {

    const [loading, setLoading] = useState(true)
    const [breakLoading, setBreakLoading] = useState(true)
    const [icon, setIcon] = useState("")

    const { state } = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const subMenu = useSelector(state => state.subMenu && state.subMenu.data)
    const menu = useSelector(state => state.menuList && state.menuList.data)
    // console.log(subMenu)

    const menu_option = menu && menu.map(val => (
        { "value": val.id, "label": val.name }
    ))

    // const showMenu_option = [
    //     { "value": true, "label": "True" },
    //     { "value": false, "label": "False" }
    // ]

    const initialValues = {
        id: subMenu && subMenu.id,
        subMenuName: subMenu && subMenu.name,
        subMenuDesc: subMenu && subMenu.description,
        // route: '',
        mainMenu: subMenu && subMenu.mainMenu && subMenu.mainMenu.id,
        subMenuIcon: subMenu && subMenu.icon,
        subMenuPriority: subMenu && subMenu.priority,
        // showInMenu: '',
    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: initialValues,
        validationSchema: AddSubMenuSchema,
        enableReinitialize: true,

        onSubmit: (values, action) => {
            // console.log("values", values)
            dispatch(subMenuTodo({ 'method': 'PUT', 'values': values, 'id': '', 'mainMenuId': '', 'search': '' })).then((res) => update_res(res.payload, action))
        },
    })

    const update_res = (res, action) => {
        if (res && res.status == 200) {
            toast.success(lang.sub_menu + ' ' + lang.success_update, { position: "bottom-right" })
            action.resetForm()
            setTimeout(() => {
                navigate('/sub-menu-list')
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

    const sub_menu_res = (res) => {
        if (res && res.status == 200) {
            setIcon(res && res.data && res.data.icon)
            dispatch(menuListTodo({ 'search': '' })).then((menu_res) => {
                if (menu_res.payload && menu_res.payload.status == 200) {
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
        dispatch(subMenuTodo({ 'method': 'GET', 'values': '', 'id': state, 'mainMenuId': '', 'search': '' })).then((res) => sub_menu_res(res.payload))

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
                                                label_name={lang.main_menu}
                                                // placeholder='Select Main Menu '
                                                disabled={false}
                                                option={menu_option ? menu_option : []}
                                                name='mainMenu'
                                                defaultValue={menu_option && menu_option.find((option) => option.value == values.mainMenu)}
                                                onChange={(e) =>
                                                    setFieldValue('mainMenu', e.value)
                                                }
                                                onBlur={handleBlur}
                                                error={errors.mainMenu && touched.mainMenu ? (<span className='text-danger form_label' >{errors.mainMenu}</span>) : null}
                                            />
                                        </div>

                                        <div className="col-md-3">
                                            <Text
                                                label_name={lang.name}
                                                placeholder=''
                                                disabled={false}
                                                name='subMenuName'
                                                value={values.subMenuName || ''}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                error={errors.subMenuName && touched.subMenuName ? (<span className='text-danger form_label' >{errors.subMenuName}</span>) : null}
                                            />
                                        </div>

                                        <div className="col-md-3">
                                            <TextArea
                                                label_name={lang.description}
                                                placeholder=''
                                                disabled={false}
                                                rows={1}
                                                name='subMenuDesc'
                                                value={values.subMenuDesc || ''}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                error={errors.subMenuDesc && touched.subMenuDesc ? (<span className='text-danger form_label' >{errors.subMenuDesc}</span>) : null}
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

                                        {/* <div className="col-md-3">
                                <SingleSelect
                                    closeMenu={true}
                                    label_name='Show In  Menu'
                                    // placeholder='Select Show In  Menu'
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
                                            <Text
                                                label_name={lang.priority}
                                                placeholder=''
                                                disabled={false}
                                                name='subMenuPriority'
                                                value={values.subMenuPriority || ''}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                error={errors.subMenuPriority && touched.subMenuPriority ? (<span className='text-danger form_label' >{errors.subMenuPriority}</span>) : null}
                                            />
                                        </div>

                                        <div className="col-md-3">
                                            <IconSelect
                                                label_name={lang.sub_menu_icon}
                                                name='subMenuIcon'
                                                value={values.subMenuIcon || icon}
                                                onChange={(e) => { setFieldValue('subMenuIcon', e); setIcon(e) }}
                                                onBlur={handleBlur}
                                                error={errors.subMenuIcon && touched.subMenuIcon ? (<span className='text-danger form_label' >{errors.subMenuIcon}</span>) : null}
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
