import React from 'react'
import { GroupTypeImport } from './Imports'
const { Text, Form, TextArea, SelectStatus, useFormik, SaveButton, GroupTypeSchema, useDispatch, useNavigate, addGroupTypeTodo, ToastContainer, toast, lang } = GroupTypeImport

export default function AddGroupTypeForm() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const initialValues = {
        name: '',
        description: '',
        status: ''
    };

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: initialValues,
        validationSchema: GroupTypeSchema,

        onSubmit: (values, action) => {
            // console.log(values)
            dispatch(addGroupTypeTodo({ 'values': values })).then((res) => add_res(res.payload, action))

        },
    })

    const add_res = (res, action) => {
        if (res && res.status == 201) {
            toast.success(lang.group_type + ' ' + lang.success_add, { position: "bottom-right" })
            action.resetForm()
            setTimeout(() => {
                navigate('/group-type-list')
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

    return (
        <>
            <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                <div className='layout'>
                    <div className='container-fluid'>
                        <div className='row'>

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
                                    defaultValue={""}
                                    onChange={(e) =>
                                        setFieldValue('status', e.value)
                                    }
                                    onBlur={handleBlur}
                                    error={errors.status && touched.status ? (<span className='text-danger form_label' >{errors.status}</span>) : null}
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
