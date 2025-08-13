import React from 'react'
import { Form } from 'react-bootstrap'

export default function File(props) {

    const { label_name, disabled, name, onChange, onBlur, error, accept, mandatory } = props

    return (
        <>
            <Form.Group className="mb-2" controlId="file">
                <Form.Label className={mandatory ? 'form_label_red' : 'form_label'}>{label_name}</Form.Label>
                <Form.Control
                    type="file"
                    size="sm"
                    disabled={disabled}
                    className='form_input'
                    name={name}
                    onChange={onChange}
                    onBlur={onBlur}
                    accept={accept}
                />
                {error}
            </Form.Group>
        </>
    )
}
