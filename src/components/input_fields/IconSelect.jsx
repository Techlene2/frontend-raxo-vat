import React from 'react'
import IconPicker from "react-icons-picker"
import { Form } from 'react-bootstrap'

export default function IconSelect(props) {

    const { label_name, name, value, onChange, onBlur, error, mandatory } = props

    return (
        <>
            <Form.Group className="mb-2" controlId="text">
                <Form.Label className={mandatory ? 'form_label_red' : 'form_label'}>{label_name}</Form.Label>
                <div className='d-flex align-items-center'>
                    <IconPicker
                        name={name}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                    />
                    <span className="icon ms-1">{value}</span>
                </div>
                {error}

            </Form.Group>
        </>
    )
}
