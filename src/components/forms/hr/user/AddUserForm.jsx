import React from 'react'
import { UserImports } from './Imports'
const { Form, useFormik, Text, File, Email, SelectStatus, SingleSelect, SaveButton, AddUserSchema } = UserImports

export default function AddUserForm() {

    const initialValues = {
        userName: '',
        firstName: '',
        lastName: '',
        email: '',
        imageUrl: '',
        status: '',
        langKey: 'en',
        authorities: '',
    };

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: initialValues,
        validationSchema: AddUserSchema,

        onSubmit: (values, action) => {
            console.log("value", values)
            action.resetForm()
        },
    })

    return (
        <>
            <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                <div className="layout">
                    <div className="container-fluid">
                        <div className="row">

                            <div className="col-md-4">
                                <Text
                                    label_name='User Name'
                                    placeholder=''
                                    disabled={false}
                                    name='userName'
                                    value={values.userName || ''}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.userName && touched.userName ? (<span className='text-danger form_label' >{errors.userName}</span>) : null}
                                />
                            </div>

                            <div className="col-md-4">
                                <Text
                                    label_name='First Name'
                                    placeholder=''
                                    disabled={false}
                                    name='firstName'
                                    value={values.firstName || ''}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.firstName && touched.firstName ? (<span className='text-danger form_label' >{errors.firstName}</span>) : null}
                                />
                            </div>

                            <div className="col-md-4">
                                <Text
                                    label_name='Last Name'
                                    placeholder=''
                                    disabled={false}
                                    name='lastName'
                                    value={values.lastName || ''}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.lastName && touched.lastName ? (<span className='text-danger form_label' >{errors.lastName}</span>) : null}
                                />
                            </div>

                            <div className="col-md-4">
                                <Email
                                    label_name='Email'
                                    placeholder=''
                                    disabled={false}
                                    name='email'
                                    value={values.email || ''}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.email && touched.email ? (<span className='text-danger form_label' >{errors.email}</span>) : null}
                                />
                            </div>

                            <div className="col-md-4">
                                <File
                                    label_name='Image'
                                    // placeholder='Select Image'
                                    disabled={false}
                                    name='imageUrl'
                                    onChange={(e) => setFieldValue("imageUrl", e.currentTarget.files[0])}
                                    onBlur={handleBlur}
                                    error={errors.imageUrl && touched.imageUrl ? (<span className='text-danger form_label' >{errors.imageUrl}</span>) : null}
                                />
                            </div>

                            <div className="col-md-4">
                                <SelectStatus
                                    closeMenu={true}
                                    label_name='Status'
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

                            <div className="col-md-4">
                                <SingleSelect
                                    closeMenu={true}
                                    label_name='Authorities'
                                    // placeholder='Select Authorities'
                                    disabled={false}
                                    option={[]}
                                    name='authorities'
                                    defaultValue={""}
                                    onChange={(e) =>
                                        setFieldValue('authorities', e.value)
                                    }
                                    onBlur={handleBlur}
                                    error={errors.authorities && touched.authorities ? (<span className='text-danger form_label' >{errors.authorities}</span>) : null}
                                />
                            </div>

                            <div className="text-end">
                                <SaveButton
                                    button_name='Submit'
                                />
                            </div>

                        </div>
                    </div>
                </div>
            </Form>
        </>
    )
}
