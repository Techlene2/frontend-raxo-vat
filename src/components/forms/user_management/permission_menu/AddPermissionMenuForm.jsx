import React, { useEffect, useRef, useState } from 'react'
import { PermissionMenuImport } from './Imports'
const { Form, useFormik, Text, TextArea, SingleSelect, SaveButton, FormikProvider, FieldArray, FaPlus, FaTrash, AddPermissionSchema, useDispatch, useSelector, menuListTodo, useNavigate, Loader, subMenuTodo, addPermissionMenuTodo, ToastContainer, toast, Button, lang } = PermissionMenuImport

export default function AddPermissionMenuForm() {

  const [loading, setLoading] = useState(true)
  const [subMenuLoading, setSubMenuLoading] = useState(false)

  const subMenuRef = useRef()

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const menu = useSelector(state => state.menuList && state.menuList.data)
  const subMenu = useSelector(state => state.subMenu && state.subMenu.data)
  // console.log(subMenu)

  const menu_option = menu && menu.map(val => (
    { "value": val.id, "label": val.name }
  ))

  const sub_menu_option = subMenu && subMenu.map(val => (
    { "value": val.id, "label": val.name }
  ))

  const showMenu_option = [
    { "value": true, "label": "True" },
    { "value": false, "label": "False" }
  ]

  const initialValues = {
    menu: '',
    subMenu: '',
    name: '',
    description: '',
    // route: '',
    permission: [
      {
        actionName: '',
        api: '',
        route: '',
        showInMenu: '',
      }
    ]

  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: AddPermissionSchema,

    onSubmit: (values, action) => {
      // console.log("value", values)
      dispatch(addPermissionMenuTodo({ 'values': values })).then((res) => add_res(res.payload, action))
    },
  })

  const add_res = (res, action) => {
    if (res && res.status == 201) {
      toast.success(lang.permisiion_menu + ' ' + lang.success_add, { position: "bottom-right" })
      action.resetForm()
      setTimeout(() => {
        navigate('/permission-list')
      }, 1500);
    } else if (res && res.status == 401) {
      localStorage.clear()
      navigate('/login')
    } else if (res && res.status == 400) {
      toast.error("400 Bad Request", { position: "bottom-right" })
    } else {
      toast.error(lang.wrong, { position: "bottom-right" })
    }
  }

  const load_sub_menu = (id) => {
    setSubMenuLoading(true)
    dispatch(subMenuTodo({ 'method': 'GET', 'values': '', 'id': '', 'mainMenuId': id, 'search': '' })).then((res) => sub_menu_res(res.payload))
    subMenuRef.current.setValue([])
  }

  const sub_menu_res = (res) => {
    if (res && res.status == 200) {
      setSubMenuLoading(false)
    } else {
      setSubMenuLoading(false)
    }
  }

  const menu_res = (res) => {
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
    dispatch(menuListTodo({ 'search': '' })).then((res) => menu_res(res.payload))
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

                  <div className="col-md-3">
                    <SingleSelect
                      closeMenu={true}
                      label_name={lang.menu}
                      // placeholder=''
                      disabled={false}
                      option={menu_option ? menu_option : []}
                      name='menu'
                      defaultValue={""}
                      onChange={(e) => {
                        load_sub_menu(e.value);
                        formik.setFieldValue('menu', e.value);
                        formik.setFieldValue('subMenu', '');
                      }}
                      onBlur={formik.handleBlur}
                      error={formik.errors.menu && formik.touched.menu ? (<span className='text-danger form_label' >{formik.errors.menu}</span>) : null}
                    />
                  </div>

                  <div className="col-md-3">
                    <SingleSelect
                      reference={subMenuRef}
                      closeMenu={true}
                      label_name={lang.sub_menu}
                      // placeholder=''
                      disabled={false}
                      option={sub_menu_option ? sub_menu_option : []}
                      name='subMenu'
                      defaultValue={""}
                      onChange={(e) =>
                        formik.setFieldValue('subMenu', e.value)
                      }
                      onBlur={formik.handleBlur}
                      loading={subMenuLoading}
                      error={formik.errors.subMenu && formik.touched.subMenu ? (<span className='text-danger form_label' >{formik.errors.subMenu}</span>) : null}
                    />
                  </div>

                  <div className="col-md-3">
                    <Text
                      label_name={lang.name}
                      placeholder=''
                      disabled={false}
                      name='name'
                      value={formik.values.name || ''}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.errors.name && formik.touched.name ? (<span className='text-danger form_label' >{formik.errors.name}</span>) : null}
                    />
                  </div>

                  {/* <div className="col-md-3">
                  <Text
                    label_name='Route'
                    placeholder=''
                    disabled={false}
                    name='route'
                    value={formik.values.route || ''}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.errors.route && formik.touched.route ? (<span className='text-danger form_label' >{formik.errors.route}</span>) : null}
                  />
                </div> */}

                  <div className="col-md-3">
                    <TextArea
                      label_name={lang.description}
                      placeholder=''
                      disabled={false}
                      rows={1}
                      name='description'
                      value={formik.values.description || ''}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.errors.description && formik.touched.description ? (<span className='text-danger form_label' >{formik.errors.description}</span>) : null}
                    />
                  </div>

                  <div className='mt-3'>
                    <FieldArray
                      name="permission"
                      render={(arrayHelpers) => (
                        <>
                          {formik.values.permission.map((filed, index) => (
                            <div className="row" key={index}>

                              <div className="col-md-12">
                                <div className='d-flex  justify-content-between align-items-center'>
                                  {index == 0 ? <h5>{lang.permission} </h5> : <div></div>}
                                  {index == 0 ?

                                    <Button
                                      variant="primary"
                                      size='sm'
                                      onClick={() => arrayHelpers.push({ actionName: "", api: "", route: "", showInMenu: "", })}
                                    >
                                      <FaPlus size={16} style={{ marginBottom: '2px' }} />
                                    </Button>

                                    : ''}
                                </div>
                              </div>

                              <div className="col">
                                <Text
                                  label_name={index == 0 ? lang.action_name : ''}
                                  placeholder=''
                                  disabled={false}
                                  name={`permission[${index}].actionName`}
                                  value={formik.values.permission[index].actionName || ''}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  error={formik.touched.permission && formik.touched.permission[index] && formik.touched.permission[index].actionName && formik.errors.permission && formik.errors.permission[index] && formik.errors.permission[index].actionName ?
                                    (<span className='text-danger form_label'> {formik.errors.permission[index].actionName}</span>) : null
                                  }
                                />
                              </div>

                              <div className="col">
                                <Text
                                  label_name={index == 0 ? lang.route : ''}
                                  placeholder=''
                                  disabled={false}
                                  name={`permission[${index}].route`}
                                  value={formik.values.permission[index].route || ''}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  error={formik.touched.permission && formik.touched.permission[index] && formik.touched.permission[index].route && formik.errors.permission && formik.errors.permission[index] && formik.errors.permission[index].route ?
                                    (<span className='text-danger form_label'> {formik.errors.permission[index].route}</span>) : null
                                  }
                                />
                              </div>

                              <div className="col">
                                <Text
                                  label_name={index == 0 ? lang.api : ''}
                                  placeholder=''
                                  disabled={false}
                                  name={`permission[${index}].api`}
                                  value={formik.values.permission[index].api || ''}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  error={formik.touched.permission && formik.touched.permission[index] && formik.touched.permission[index].api && formik.errors.permission && formik.errors.permission[index] && formik.errors.permission[index].api ?
                                    (<span className='text-danger form_label'> {formik.errors.permission[index].api}</span>) : null
                                  }
                                />
                              </div>

                              <div className="col">
                                <SingleSelect
                                  closeMenu={true}
                                  label_name={index == 0 ? lang.show_in_menu : ''}
                                  // placeholder='Select Show In Menu'
                                  disabled={false}
                                  option={showMenu_option}
                                  name={`permission[${index}].showInMenu`}
                                  defaultValue={""}
                                  onChange={(e) =>
                                    formik.setFieldValue(`permission[${index}].showInMenu`, e.value)
                                  }
                                  onBlur={formik.handleBlur}
                                  error={formik.touched.permission && formik.touched.permission[index] && formik.touched.permission[index].showInMenu && formik.errors.permission && formik.errors.permission[index] && formik.errors.permission[index].showInMenu ?
                                    (<span className='text-danger form_label'> {formik.errors.permission[index].showInMenu}</span>) : null
                                  }
                                />
                              </div>

                              <div className="col">
                                <div className={localStorage.getItem('lang_key') == 'ar' ? 'float-start' : 'float-end'} style={index == 0 ? { marginTop: "32px" } : {}}>
                                  {formik.values.permission.length !== 1 ?
                                    <Button
                                      variant="danger"
                                      size='sm'
                                      onClick={() => arrayHelpers.remove(index)}
                                    >
                                      <FaTrash size={16} style={{ marginBottom: '2px' }} />
                                    </Button>
                                    : ''
                                  }
                                </div>
                              </div>

                            </div>
                          ))}
                        </>
                      )}
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
        </FormikProvider>
      }
      <ToastContainer />
    </>
  )
}
