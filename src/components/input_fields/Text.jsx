import React from 'react'
import { Form } from 'react-bootstrap'

export default function Text(props) {

    const { label_name, placeholder, disabled, name, value, onChange, onBlur, error, form_group, mandatory } = props

    return (
        <>
            <Form.Group className={form_group ? form_group : "mb-2"} controlId="text">
                {label_name == '' ? '' : <Form.Label className={mandatory ? 'form_label_red' : 'form_label'}>{label_name}</Form.Label>}
                <Form.Control
                    type="text"
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
