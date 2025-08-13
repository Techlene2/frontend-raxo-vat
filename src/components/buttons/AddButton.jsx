import React from 'react'
import { Button } from 'react-bootstrap'
import { LuPlus } from 'react-icons/lu'

export default function AddButton(props) {

    const { button_name } = props

    return (
        <>
            <Button type='button' variant="primary" size='sm' className='d-flex align-items-center'><LuPlus size={18} className=''/>{button_name}</Button>
        </>
    )
}
