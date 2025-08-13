import React from 'react'
import { CustomerActionImport } from './Import'
const { LuBadgeInfo, LuEye, LuEyeOff, LuFileEdit, LuTrash2, Tooltip, useNavigate, useDispatch, delCustomerTodo, toast, Swal, lang } = CustomerActionImport

export default function CustomerAction(props) {

    const { bool, setBool, setLoading } = props

    const navigate = useNavigate()
    const dispatch = useDispatch()

    // const change_status = (status) => {
    //     Swal.fire({
    //         title: lang.customer + ' ' + lang.status,
    //         text: status ? lang.active_confirm_text : lang.deactive_confirm_text,
    //         icon: 'question',
    //         showCancelButton: true,
    //         confirmButtonColor: '#121136',
    //         cancelButtonColor: '#EF3D50',
    //         cancelButtonText: lang.cancel,
    //         confirmButtonText: lang.confirm
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             setLoading(true)
    //             dispatch(customerTodo({ 'method': 'PUT', 'values': '', 'id': props.data && props.data.id, 'status': status, 'search': '' })).then((res) => status_res(res.payload))
    //         }
    //     })
    // }

    // const status_res = (res) => {
    //     if (res && res.status == 200) {
    //         setBool(!bool)
    //         Swal.fire({
    //             title: lang.customer,
    //             text: lang.status_text,
    //             icon: 'success',
    //             confirmButtonText: lang.ok
    //         })
    //     } else if (res && res.status == 400) {
    //         setBool(!bool)
    //         toast.error("400 BAD REQUEST", { position: "bottom-right" })
    //     } else {
    //         setBool(!bool)
    //         toast.error(lang.wrong, { position: "bottom-right" })
    //     }
    // }

    var permission = JSON.parse(localStorage.getItem('permission'))

    const edit_customer = () => {
        navigate('/update-customer', { state: props.data && props.data.id })
    }

    // const customer_details = () => {
    //     navigate('/customer-details', { state: props.data && props.data.id })
    // }

    const del_customer = () => {
        Swal.fire({
            title: lang.customer + ' ' + lang.delete,
            text: lang.confirm_text,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#121136',
            cancelButtonColor: '#EF3D50',
            cancelButtonText: lang.cancel,
            confirmButtonText: lang.delete
        }).then((result) => {
            if (result.isConfirmed) {
                setLoading(true)
                dispatch(delCustomerTodo({ 'id': props.data && props.data.id })).then((res) => del_res(res.payload))
            }
        })
    }

    const del_res = (res) => {
        if (res && res.status == 204) {
            setBool(!bool)
            Swal.fire({
                title: lang.company,
                text: lang.delete_text,
                icon: 'success',
                confirmButtonText: lang.ok
            })
        } else if (res && res.status == 400) {
            setBool(!bool)
            toast.error("400", { position: "bottom-right" })
        } else {
            setBool(!bool)
            toast.error(lang.wrong, { position: "bottom-right" })
        }
    }

    return (
        <div>
            {/* {props.data && props.data.isActive ?
                <LuEyeOff size={16} className='eye text-secondary'
                    onClick={() => change_status(false)}
                    data-tooltip-id='deactivate'
                    data-tooltip-content={lang.de_active}
                    data-tooltip-place="bottom"
                />
                :
                <LuEye size={16} className='eye text-secondary'
                    onClick={() => change_status(true)}
                    data-tooltip-id='active'
                    data-tooltip-content={lang.active}
                    data-tooltip-place="bottom"
                />
            } */}
            {permission.some(val => val.actionName == 'Update Customer') ?
                <LuFileEdit size={16} className='edit text-success'
                    onClick={() => edit_customer()}
                    data-tooltip-id='edit'
                    data-tooltip-content={lang.edit + ' ' + lang.customer}
                    data-tooltip-place="bottom"
                />
                : ''
            }
            {/* <LuBadgeInfo size={16} className={localStorage.getItem('lang_key') == 'ar' ? 'details text-primary me-3' : 'details text-primary ms-3'}
                onClick={() => customer_details()}
                data-tooltip-id='details'
                data-tooltip-content={lang.customer + ' ' + lang.details}
                data-tooltip-place="bottom"
            /> */}
            {permission.some(val => val.actionName == 'Delete Customer') ?
                <LuTrash2 size={16} className={localStorage.getItem('lang_key') == 'ar' ? 'delete text-danger me-3' : 'delete text-danger ms-3'}
                    onClick={() => del_customer()}
                    data-tooltip-id='del'
                    data-tooltip-content={lang.delete + ' ' + lang.customer}
                    data-tooltip-place="bottom"
                />
                : ''
            }
            <Tooltip id='edit' className='bg-success tooltip_msg' />
            <Tooltip id='del' className='bg-danger tooltip_msg' />
            {/* <Tooltip id='details' className='bg-primary tooltip_msg' /> */}
            {/* <Tooltip id='active' className='bg-secondary tooltip_msg' />
            <Tooltip id='deactivate' className='bg-secondary tooltip_msg' /> */}

        </div>
    )
}
