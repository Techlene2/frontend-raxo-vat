import React from 'react'
import { LoginFormImport } from './Imports'
const { Form, InputGroup, SaveButton, useFormik, LoginSchema, useNavigate, useDispatch, SignInTodo, toast, sidebarTodo, LuKeyRound, LuUser2 } = LoginFormImport

export default function UserLoginForm(props) {

  const { setTogggle } = props

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const initialValues = {
    user: '',
    password: '',
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: LoginSchema,

    onSubmit: (values, action) => {
      // console.log(values)
      dispatch(SignInTodo(values)).then((res) => signIn_user(res.payload, action))
    },
  })

  const signIn_user = (res, action) => {

    if (res && res.status == 200) {
      // console.log(res.id_token)
      localStorage.setItem('user_token', res.data.id_token)
      // localStorage.setItem("lang_key", 'en')
      action.resetForm()
      toast.success("SignIn Successfully!!..", { position: "bottom-right" })
      dispatch(sidebarTodo()).then((res) => sidebar_res(res.payload))
    } else if (res && res.status == 400) {
      toast.error("Something went wrong!!..", { position: "bottom-right" })
    } else if (res && res.status == 401) {
      toast.error("Wrong Credentials!!..", { position: "bottom-right" })
    } else if (res && res.status == 500) {
      toast.error("Server error!!..", { position: "bottom-right" })
    } else {
      toast.error("Something went wrong!!..", { position: "bottom-right" })
    }

  }

  const sidebar_res = (res) => {
    if (res && res.status == 200) {
      const permission = res && res.data && res.data.actionAttribtes && res.data.actionAttribtes.map(val => JSON.parse(val)).flat()
      localStorage.setItem('permission', JSON.stringify(permission))
      localStorage.setItem('user', res && res.data && JSON.stringify(res.data.userDTO))
      navigate('/dashboard')
    } else if (res && res.status == 401) {
      localStorage.clear()
      navigate('/login')
    } else {
      // setBreakLoading(false)
    }
  }

  return (
    <>
      <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>

        <div className='mb-2'>
          <Form.Label className='fw-medium mb-1' style={{ color: '#001529' }}>{'Username'}</Form.Label>
          <InputGroup className="" size="sm">
            <InputGroup.Text id="basic-addon1"><LuUser2 /></InputGroup.Text>
            <Form.Control
              className='login-input'
              placeholder="Enter Your Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
              name='user'
              value={values.user || ''}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </InputGroup>
          {errors.user && touched.user ? (<span className='text-danger form_label' >{errors.user}</span>) : null}
        </div>

        <div className='mb-2'>
          <Form.Label className='fw-medium mb-1' style={{ color: '#001529' }}>{'Password'}</Form.Label>
          <InputGroup className="" size="sm">
            <InputGroup.Text id="basic-addon1"><LuKeyRound /></InputGroup.Text>
            <Form.Control
              type='password'
              className='login-input'
              placeholder="Enter Your Password"
              aria-label="Password"
              aria-describedby="basic-addon1"
              name='password'
              value={values.password || ''}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </InputGroup>
          {errors.password && touched.password ? (<span className='text-danger form_label' >{errors.password}</span>) : null}
        </div>

        <div className='mb-3'>
          <span style={{ fontSize: '13px', color: '#ffffff', cursor: 'pointer' }} onClick={() => setTogggle(true)}>Forget Password ?</span>
        </div>

        <div className="float-end">
          <SaveButton
            button_name='Login'
          />
        </div>

      </Form>
    </>
  )
}
