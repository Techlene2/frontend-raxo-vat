import React from 'react'
import { DispatchPlanningImport } from './Import.js'
const { LuFileEdit, LuTrash2, Tooltip, useNavigate, Swal, useDispatch, toast, delDispatchPlanningTodo, lang } = DispatchPlanningImport

export default function DispatchPlanningAction(props) {
    const { bool, setBool, setLoading } = props

    const navigate = useNavigate()
    const dispatch = useDispatch()

    var permission = JSON.parse(localStorage.getItem('permission'))

    const edit_planning = () => {
        navigate('/update-dispatch-planning', { state: props.data && props.data.id })
    }

    const del_planning = () => {
        Swal.fire({
            title: lang.dispatch_planning + ' ' + lang.delete,
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
                dispatch(delDispatchPlanningTodo({ 'id': props.data && props.data.id })).then((res) => del_res(res.payload))
            }
        })
    }

    const del_res = (res) => {
        if (res && res.status == 204) {
            setBool(!bool)
            Swal.fire({
                title: lang.dispatch_planning,
                text: lang.delete_text,
                icon: "success",
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
            {permission.some(val => val.actionName == 'Update Dispatch Planning') ?
                <LuFileEdit size={16} className='edit text-success'
                    onClick={() => edit_planning()}
                    data-tooltip-id='edit'
                    data-tooltip-content={lang.edit + ' ' + lang.dispatch_planning}
                    data-tooltip-place="bottom"
                />
                : ''
            }
            {permission.some(val => val.actionName == 'Delete Dispatch Planning') ?
                <LuTrash2 size={16} className={localStorage.getItem('lang_key') == 'ar' ? 'delete text-danger me-3' : 'delete text-danger ms-3'}
                    onClick={() => del_planning()}
                    data-tooltip-id='del'
                    data-tooltip-content={lang.delete + ' ' + lang.dispatch_planning}
                    data-tooltip-place="bottom"
                />
                : ''
            }
            <Tooltip id='edit' className='bg-success tooltip_msg' />
            <Tooltip id='del' className='bg-danger tooltip_msg' />
        </>
    )
}
