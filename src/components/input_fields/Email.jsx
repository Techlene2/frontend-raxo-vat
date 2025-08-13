import React from 'react'
import { Form } from 'react-bootstrap'

export default function Email(props) {

    const { label_name, placeholder, disabled, name, value, onChange, onBlur, error, mandatory } = props

    return (
        <>
            <Form.Group className="mb-2" controlId="email">
                <Form.Label className={mandatory ? 'form_label_red' : 'form_label'}>{label_name}</Form.Label>
                <Form.Control
                    type="email"
                    size="sm"
                    placeholder={placeholder}
                    disabled={disabled}
                    className='form_input'
                    name={name}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                />
                {error}
            </Form.Group>
        </>
    )
}
