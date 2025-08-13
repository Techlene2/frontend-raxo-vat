import React from 'react'
import Button from 'react-bootstrap/Button'

export default function SaveButton(props) {

    const { button_name } = props

    return (
        <>
            <Button type='submit' size='sm' variant="primary" className=''>{button_name}</Button>
        </>
    )
}
