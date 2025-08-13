import React from 'react'
import { Form } from 'react-bootstrap'
import Select from 'react-select'

export default function SingleSelect(props) {

    const { label_name, placeholder, disabled, closeMenu, option, name, defaultValue, onChange, onBlur, error, loading, reference, onInputChange, form_group, clear, mandatory } = props

    return (
        <>
            <Form.Group className={form_group ? form_group : "mb-2"} controlId="">
                {label_name == '' ? '' : <Form.Label className={mandatory ? 'form_label_red' : 'form_label'}>{label_name}</Form.Label>}
                <Select
                    ref={reference}
                    closeMenuOnSelect={closeMenu}
                    placeholder={placeholder}
                    isDisabled={disabled}
                    options={option}
                    // className='react_select'
                    classNamePrefix="select"
                    name={name}
                    defaultValue={defaultValue}
                    onChange={onChange}
                    onInputChange={onInputChange}
                    onBlur={onBlur}
                    isLoading={loading}
                    isClearable={clear}

                    styles={{
                        control: (provided, state) =>
                        ({
                            ...provided,
                            minHeight: 'inherit',
                            height: '31px',
                            borderTop: 'none',
                            borderLeft: 'none',
                            borderRight: 'none',
                            borderRadius: 'none',
                            // borderWidth: '1.5px',
                            fontSize: '14px',
                            padding: '0px',
                            "&:focus-within": {
                                borderColor: "#032d42",
                                boxShadow: "none",
                            },
                        }),
                        option: (provided, state) => ({
                            ...provided,
                            fontSize: '14px',
                            fontFamily: 'Inter'
                        }),
                        menu: (provided) => ({
                            ...provided,
                            zIndex: 9999 // Adjust the value as needed
                        })
                    }}
                />
                {error}
            </Form.Group>
        </>
    )
}
