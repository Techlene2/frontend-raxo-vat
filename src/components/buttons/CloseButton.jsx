import React from 'react'
import { Button } from 'react-bootstrap'

export default function CloseButton(props) {

    const { button_name } = props

    return (
        <>
            <Button type='button' variant="" className='close_btn'>{button_name}</Button>
        </>
    )
}
