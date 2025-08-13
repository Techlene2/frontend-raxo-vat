import React from 'react'
import { Form } from 'react-bootstrap'

export default function TextArea(props) {

    const { label_name, placeholder, disabled, rows, name, value, onChange, onBlur, error, form_group, mandatory } = props

    return (
        <>
            <Form.Group className={form_group ? form_group : "mb-2"} controlId="textarea">
                {label_name == '' ? '' : <Form.Label className={mandatory ? 'form_label_red' : 'form_label'}>{label_name}</Form.Label>}
                <Form.Control
                    as="textarea"
                    size="sm"
                    rows={rows}
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
