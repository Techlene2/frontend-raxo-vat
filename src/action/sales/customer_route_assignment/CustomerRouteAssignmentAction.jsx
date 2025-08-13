import React from 'react'
import { CustomerRouteAssignmentActionImport } from './Import.js'
const { LuFileEdit, LuTrash2, Tooltip, toast, useNavigate, Swal, useDispatch, delCustomerRouteAssignmentTodo, lang } = CustomerRouteAssignmentActionImport

export default function CustomerRouteAssignmentAction(props) {
    
    const { bool, setBool, setLoading } = props

    const navigate = useNavigate()
    const dispatch = useDispatch()

    var permission = JSON.parse(localStorage.getItem('permission'))

    const edit_route_assignment = () => {
        navigate('/update-customer-route-assignment', { state: props.data && props.data.id })
    }

    const del_route_assignment = () => {
        Swal.fire({
            title: lang.customer_route_assignment + ' ' + lang.delete,
            text: lang.confirm_text,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#121136',
            cancelButtonColor: '#EF3D50',
            cancelButtonText: lang.cancel,
            confirmButtonText: lang.delete,
        }).then((result) => {
            if (result.isConfirmed) {
                setLoading(true)
                dispatch(delCustomerRouteAssignmentTodo({ 'id': props.data && props.data.id })).then((res) => del_res(res.payload))
            }
        })
    }

    const del_res = (res) => {
        if (res && res.status == 204) {
            setBool(!bool)
            Swal.fire({
                title: lang.customer_route_assignment,
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
        <>
            {permission.some(val => val.actionName == 'Update Customer Route Assignment') ?
                <LuFileEdit size={16} className='edit text-success'
                    onClick={() => edit_route_assignment()}
                    data-tooltip-id='edit'
                    data-tooltip-content={lang.edit + ' ' + lang.customer_route_assignment}
                    data-tooltip-place="bottom"
                />
                : ''
            }
            {permission.some(val => val.actionName == 'Delete Customer Route Assignment') ?
                <LuTrash2 size={16} className={localStorage.getItem('lang_key') == 'ar' ? 'delete text-danger me-3' : 'delete text-danger ms-3'}
                    onClick={() => del_route_assignment()}
                    data-tooltip-id='del'
                    data-tooltip-content={lang.delete + ' ' + lang.customer_route_assignment}
                    data-tooltip-place="bottom"
                />
                : ''
            }
            <Tooltip id='edit' className='bg-success tooltip_msg' />
            <Tooltip id='del' className='bg-danger tooltip_msg' />
        </>
    )
}
