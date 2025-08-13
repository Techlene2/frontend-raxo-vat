import React from 'react'
import { CustomerCategoryActionImport } from './Import.js'
const { LuFileEdit, LuTrash2, Tooltip, useNavigate, Swal, useDispatch, toast, delCustomerCategoryTodo, lang } = CustomerCategoryActionImport

export default function CustomerCategoryAction(props) {

    const { bool, setBool, setLoading } = props

    const navigate = useNavigate()
    const dispatch = useDispatch()

    var permission = JSON.parse(localStorage.getItem('permission'))

    const edit_customer_category = () => {
        navigate('/update-customer-category', { state: props.data && props.data.id })
    }

    const del_customer_category = () => {
        Swal.fire({
            title: lang.customer_category + ' ' + lang.delete,
            text: lang.confirm_text,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#121136',
            cancelButtonColor: '#EF3D50',
            cancelButtonText: lang.cancel,
            confirmButtonText: lang.delete
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(delCustomerCategoryTodo({ 'id': props.data && props.data.id })).then((res) => del_res(res.payload))
            }
        })
    }

    const del_res = (res) => {
        if (res && res.status == 204) {
            setBool(!bool)
            Swal.fire({
                title: lang.customer_category,
                text: lang.delete_text,
                icon: "success",
                confirmButtonText: lang.ok
            })
        } else if (res && res.status == 400) {
            toast.error("400 BAD REQUEST", { position: "bottom-right" })
        } else {
            toast.error(lang.wrong, { position: "bottom-right" })
        }
    }

    return (
        <>
            {permission.some(val => val.actionName == 'Update Customer Category') ?
                <LuFileEdit size={16} className='edit text-success'
                    onClick={() => edit_customer_category()}
                    data-tooltip-id='edit'
                    data-tooltip-content={lang.edit + ' ' + lang.customer_category}
                    data-tooltip-place="bottom"
                />
                : ''
            }
            {permission.some(val => val.actionName == 'Delete Customer Category') ?
                <LuTrash2 size={16} className={localStorage.getItem('lang_key') == 'ar' ? 'delete text-danger me-3' : 'delete text-danger ms-3'}
                    onClick={() => del_customer_category()}
                    data-tooltip-id='del'
                    data-tooltip-content={lang.delete + ' ' + lang.customer_category}
                    data-tooltip-place="bottom"
                />
                : ''
            }

            <Tooltip id='edit' className='bg-success tooltip_msg' />
            <Tooltip id='del' className='bg-danger tooltip_msg' />
        </>
    )
}
