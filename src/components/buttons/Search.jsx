import React from 'react'
import { Button } from 'react-bootstrap'
import { LuSearch } from 'react-icons/lu'
import { Tooltip } from 'react-tooltip'

export default function Search(props) {

    const { onClick, tooltip_content } = props

    return (
        <>
            <Button
                variant="outline-primary"
                size='sm'
                onClick={onClick}
                className={localStorage.getItem('lang_key') == 'ar' ? 'me-1' : 'ms-1'}
                data-tooltip-id='filter'
                data-tooltip-content={tooltip_content}
                data-tooltip-place="bottom"
            >
                <LuSearch className='mb-1' size={14} />
            </Button>

            <Tooltip id='filter' className='bg-primary' style={{ zIndex: '9', lineHeight: '1' }} />
        </>
    )
}
