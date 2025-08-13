import React from 'react'
import { Form } from 'react-bootstrap'

export default function Radio(props) {

    const { label_value, disabled, check, name, value, id, onChange, onBlur, error } = props

    return (
        <>
            <Form.Check
                type='radio'
                id={id}
                label={label_value}
                disabled={disabled}
                checked={check}
                className='form_check'
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
            />
            {error}
        </>
    )
}
