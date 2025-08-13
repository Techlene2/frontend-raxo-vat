import React from 'react'
import { CustomerSalesOrderActionImport } from './Import.js'
const { LuFileEdit, LuTrash2, Tooltip, useNavigate, Swal, useDispatch, toast, delSalesOrderTodo, lang } = CustomerSalesOrderActionImport

export default function CustomerSalesOrderAction(props) {

    const { bool, setBool, setLoading } = props

    const navigate = useNavigate()
    const dispatch = useDispatch()

    var permission = JSON.parse(localStorage.getItem('permission'))

    const edit_customer_sales_order = () => {
        navigate('/update-customer-sales-order', { state: props.data && props.data.id })
    }

    const del_customer_sales_order = () => {
        Swal.fire({
            title: lang.sales_order + ' ' + lang.delete,
            text: lang.confirm_text,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#121136',
            cancelButtonColor: '#EF3D50',
            cancelButtonText: lang.cancel,
            confirmButtonText: lang.delete,
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(delSalesOrderTodo({ 'id': props.data && props.data.id })).then((res) => del_res(res.payload))
            }
        })
    }

    const del_res = (res) => {
        if (res && res.status == 204) {
            setBool(!bool)
            Swal.fire({
                title: lang.sales_order,
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
            {permission.some(val => val.actionName == 'Update Customer Sales Order') ?
                <LuFileEdit size={16} className='edit text-success'
                    onClick={() => edit_customer_sales_order()}
                    data-tooltip-id='edit'
                    data-tooltip-content={lang.edit + ' ' + lang.sales_order}
                    data-tooltip-place="bottom"
                />
                : ''
            }
            {permission.some(val => val.actionName == 'Delete Customer Sales Order') ?
                <LuTrash2 size={16} className={localStorage.getItem('lang_key') == 'ar' ? 'delete text-danger me-3' : 'delete text-danger ms-3'}
                    onClick={() => del_customer_sales_order()}
                    data-tooltip-id='del'
                    data-tooltip-content={lang.delete + ' ' + lang.sales_order}
                    data-tooltip-place="bottom"
                />
                : ''
            }

            <Tooltip id='edit' className='bg-success tooltip_msg' />
            <Tooltip id='del' className='bg-danger tooltip_msg' />
        </>
    )
}
