import React from 'react'
import Flatpickr from 'react-flatpickr'
import "flatpickr/dist/themes/light.css"
import { Form } from 'react-bootstrap'

export default function TimePicker(props) {

    const { label_name, placeholder, name, onChange, option, onBlur, error, mandatory } = props

    return (
        <>
            <Form.Group className="mb-2" controlId="time">
                <Form.Label className={mandatory ? 'form_label_red' : 'form_label'}>{label_name}</Form.Label>
                <Flatpickr
                    className='form-control form_input'
                    placeholder={placeholder}
                    options={option}
                    name={name}
                    onChange={onChange}
                    onBlur={onBlur}
                />
                {error}
            </Form.Group>
        </>
    )
}
