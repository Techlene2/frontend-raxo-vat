import React from 'react'
import { LoginFormImport } from './Imports'
const { Form, InputGroup, SaveButton, useFormik, ForgetPasswordSchema, LuUser2 } = LoginFormImport

export default function ForgetPasswordForm(props) {

    const { setTogggle } = props

    const initialValues = {
        user: '',
    };

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: ForgetPasswordSchema,

        onSubmit: (values, action) => {
            // console.log(values)
            action.resetForm()
        },
    })

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

                <div className='mb-3'>
                    <span style={{ fontSize: '13px', color: '#ffffff' }} >Already have an account ? <span style={{ color: '#21263c', cursor: 'pointer' }} onClick={() => setTogggle(false)}> Sign In </span> </span>
                </div>

                <div className="float-end">
                    <SaveButton
                        button_name='Reset'
                    />
                </div>

            </Form>
        </>
    )
}
