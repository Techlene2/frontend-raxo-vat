import React, { useEffect } from 'react'
import { Form } from 'react-bootstrap'

export default function Number(props) {

    const { label_name, placeholder, disabled, name, value, onChange, onBlur, error, form_group, mandatory } = props

    useEffect(() => {
        const handleScroll = (event) => {
            event.preventDefault(); // Prevent default scroll behavior
        };

        const inputElements = document.querySelectorAll('input[type="number"]');

        inputElements.forEach((inputElement) => {
            inputElement.addEventListener('wheel', handleScroll, { passive: false });
        });

        return () => {
            inputElements.forEach((inputElement) => {
                inputElement.removeEventListener('wheel', handleScroll);
            });
        };
    }, [])

    return (
        <>
            <Form.Group className={form_group ? form_group : "mb-2"} controlId="number">
                {label_name == '' ? '' : <Form.Label className={mandatory ? 'form_label_red' : 'form_label'}>{label_name}</Form.Label>}
                <Form.Control
                    type="number"
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
