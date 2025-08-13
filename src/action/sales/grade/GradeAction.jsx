import React from 'react'
import { GradeActionImport } from './Import.js'
const { LuFileEdit, LuTrash2, Tooltip, useNavigate, Swal, useDispatch, toast, delGradeTodo, lang } = GradeActionImport

export default function GradeAction(props) {

    const { bool, setBool, setLoading } = props

    const navigate = useNavigate()
    const dispatch = useDispatch()

    var permission = JSON.parse(localStorage.getItem('permission'))

    const edit_grade = () => {
        navigate('/update-grade', { state: props.data && props.data.id })
    }

    const del_grade = () => {
        Swal.fire({
            title: lang.grade + ' ' + lang.delete,
            text: lang.confirm_text,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#121136',
            cancelButtonColor: '#EF3D50',
            cancelButtonText: lang.cancel,
            confirmButtonText: lang.delete
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(delGradeTodo({ 'id': props.data && props.data.id })).then((res) => del_res(res.payload))
            }
        })
    }

    const del_res = (res) => {
        if (res && res.status == 204) {
            setBool(!bool)
            Swal.fire({
                title: lang.grade,
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
            {permission.some(val => val.actionName == 'Update Grade') ?
                <LuFileEdit size={16} className='edit text-success'
                    onClick={() => edit_grade()}
                    data-tooltip-id='edit'
                    data-tooltip-content={lang.edit + ' ' + lang.grade}
                    data-tooltip-place="bottom"
                />
                : ''
            }
            {permission.some(val => val.actionName == 'Delete Grade') ?
                <LuTrash2 size={16} className={localStorage.getItem('lang_key') == 'ar' ? 'delete text-danger me-3' : 'delete text-danger ms-3'}
                    onClick={() => del_grade()}
                    data-tooltip-id='del'
                    data-tooltip-content={lang.delete + ' ' + lang.grade}
                    data-tooltip-place="bottom"
                />
                : ''
            }
            <Tooltip id='edit' className='bg-success tooltip_msg' />
            <Tooltip id='del' className='bg-danger tooltip_msg' />
        </>
    )
}
