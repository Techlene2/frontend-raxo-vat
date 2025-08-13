import React from 'react'
import { ItemImport } from './Imports.js'
const { Text, Modal, Button, Form, useFormik, AddItemModal, lang, useDispatch, toast, useNavigate, addColorTodo, addSegmentTodo, addRackTodo } = ItemImport

export default function ItemModal(props) {

    const { show, setShow, call, setCall, modalBool, setModalBool } = props

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleClose = () => {
        setShow(false)
        setCall()
    }

    const initialValues = {
        name: '',
    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: initialValues,
        validationSchema: AddItemModal,

        onSubmit: (values, action) => {
            // console.log(values, call)
            if (call == 'color') {
                dispatch(addColorTodo({ 'values': values })).then((res) => add_res(res.payload, action))
            } else if (call == 'segment') {
                dispatch(addSegmentTodo({ 'values': values })).then((res) => add_res(res.payload, action))
            } else if (call == 'rack') {
                dispatch(addRackTodo({ 'values': values })).then((res) => add_res(res.payload, action))
            }
        }
    })

    const add_res = (res, action) => {
        if (res && res.status == 201) {
            toast.success("Added Succesfully", { position: "bottom-right" })
            action.resetForm()
            setModalBool(!modalBool)
            setShow(false)
            setCall()
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
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>{lang.add}</Modal.Title>
                </Modal.Header>
                <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                    <Modal.Body>
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
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" type='submit'>{lang.submit}</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}
