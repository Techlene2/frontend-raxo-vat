import React from 'react'
import { Button } from 'react-bootstrap'
import { FaRegFilePdf } from 'react-icons/fa6'
import { Tooltip } from 'react-tooltip'

export default function PDF(props) {

    const { onClick, tooltip_content } = props

    return (
        <>
            <Button
                variant="outline-danger"
                size='sm'
                onClick={onClick}
                className={localStorage.getItem('lang_key') == 'ar' ? 'me-1' : 'ms-1'}
                data-tooltip-id='pdf'
                data-tooltip-content={tooltip_content}
                data-tooltip-place="bottom"
            >
                <FaRegFilePdf className='mb-1' size={14} />
            </Button>

            <Tooltip id='pdf' className='bg-danger' style={{ zIndex: '9', lineHeight: '1' }} />
        </>
    )
}
