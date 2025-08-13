import React from 'react'
import { Form } from 'react-bootstrap'

export default function Checkbox(props) {

    const { label_name, label_value, disabled, check, name, id, onChange, onBlur, error } = props

    return (
        <>
            <Form.Check
                type='checkbox'
                label={label_value}
                disabled={disabled}
                checked={check}
                className='form_check'
                name={name}
                id={id}
                onChange={onChange}
                onBlur={onBlur}
            />
            {error}
        </>
    )
}
