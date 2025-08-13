import React from 'react'
import { EmployeeActionImport } from './Import'
const { LuFileEdit, LuTrash2, LuBadgeInfo, Tooltip, useNavigate, Swal, useDispatch, toast, delEmployeeTodo, employeeDetailsTodo, lang } = EmployeeActionImport

export default function EmployeeAction(props) {

    const { bool, setBool, setLoading, details, setDetails, setDetailsLoading } = props

    const navigate = useNavigate()
    const dispatch = useDispatch()

    var permission = JSON.parse(localStorage.getItem('permission'))

    const edit_employee = () => {
        navigate('/update-employee', { state: props.data && props.data.id })
    }

    const del_employee = () => {
        Swal.fire({
            title: lang.employee + ' ' + lang.delete,
            text: lang.confirm_text,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#121136',
            cancelButtonColor: '#EF3D50',
            cancelButtonText: lang.cancel,
            confirmButtonText: lang.delete
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(delEmployeeTodo({ 'id': props.data && props.data.id })).then((res) => del_res(res.payload))
            }
        })
    }

    const del_res = (res) => {
        if (res && res.status == 204) {
            setBool(!bool)
            Swal.fire({
                title: lang.employee,
                text: lang.delete_text,
                icon: 'success',
                confirmButtonText: lang.ok
            })
        } else if (res && res.status == 400) {
            toast.error("400 BAD REQUEST", { position: "bottom-right" })
        } else {
            toast.error('lang.wrong', { position: "bottom-right" })
        }
    }

    const employee_details = () => {
        setDetailsLoading(true)
        setDetails(true)
        dispatch(employeeDetailsTodo({ 'id': props.data.id })).then((res) => details_res(res.payload))
    }

    const details_res = (res) => {
        if (res && res.status == 200) {
            setDetailsLoading(false)
        } else if (res && res.status == 401) {
            localStorage.clear()
            navigate('/login')
        } else {
            setDetailsLoading(false)
        }
    }

    return (
        <>
            {permission.some(val => val.actionName == 'Update Employee') ?
                <LuFileEdit size={16} className='edit text-success'
                    onClick={() => edit_employee()}
                    data-tooltip-id='edit'
                    data-tooltip-content={lang.edit + ' ' + lang.employee}
                    data-tooltip-place="bottom"
                />
                : ''
            }
            {permission.some(val => val.actionName == 'Delete Employee') ?
                <LuTrash2 size={16} className={localStorage.getItem('lang_key') == 'ar' ? 'delete text-danger me-3' : 'delete text-danger ms-3'}
                    onClick={() => del_employee()}
                    data-tooltip-id='del'
                    data-tooltip-content={lang.delete + ' ' + lang.employee}
                    data-tooltip-place="bottom"
                />
                : ''
            }

            <LuBadgeInfo size={16} className={localStorage.getItem('lang_key') == 'ar' ? 'details text-primary me-3' : 'details text-primary ms-3'}
                onClick={() => employee_details()}
                data-tooltip-id='details'
                data-tooltip-content={lang.employee + ' ' + lang.details}
                data-tooltip-place="bottom"
            />

            <Tooltip id='edit' className='bg-success tooltip_msg' />
            <Tooltip id='del' className='bg-danger tooltip_msg' />
            <Tooltip id='details' className='bg-primary tooltip_msg' />
        </>
    )
}
