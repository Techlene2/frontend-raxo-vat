import React from 'react';
import { Form } from 'react-bootstrap'
import Select from 'react-select'

const SelectStatus = (props) => {

    const { label_name, placeholder, disabled, closeMenu, name, defaultValue, onChange, onBlur, error, mandatory } = props

    const status_option = [
        { "value": true, "label": "Active" },
        { "value": false, "label": "Inactive" }
    ]

    return (
        <>
            <Form.Group className="mb-2" controlId="">
                <Form.Label className={mandatory ? 'form_label_red' : 'form_label'}>{label_name}</Form.Label>
                <Select
                    closeMenuOnSelect={closeMenu}
                    placeholder={placeholder}
                    isDisabled={disabled}
                    options={status_option}
                    // className='react_select'
                    classNamePrefix="select"
                    name={name}
                    defaultValue={status_option && status_option.find((option) => option.value === defaultValue)}
                    onChange={onChange}
                    onBlur={onBlur}

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
                    }}
                />
                {error}
            </Form.Group>
        </>
    );
}

export default SelectStatus;
