import React from 'react'
import { Button } from 'react-bootstrap'
import { RiFileExcel2Line } from 'react-icons/ri'
import { Tooltip } from 'react-tooltip'

export default function Excel(props) {

    const { onClick, tooltip_content } = props

    return (
        <>
            <Button
                variant="outline-success"
                size='sm'
                onClick={onClick}
                className={localStorage.getItem('lang_key') == 'ar' ? 'me-1' : 'ms-1'}
                data-tooltip-id='excel'
                data-tooltip-content={tooltip_content}
                data-tooltip-place="bottom"
            >
                <RiFileExcel2Line className='mb-1' size={14} />
            </Button>

            <Tooltip id='excel' className='bg-success' style={{ zIndex: '9', lineHeight: '1' }} />
        </>
    )
}
