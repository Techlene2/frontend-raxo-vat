import React from 'react'
import { MeasureUnitActionImport } from './Import'
const { LuFileEdit, LuTrash2, Tooltip, useNavigate, Swal, useDispatch, toast, delMeasureUnitTodo, lang } = MeasureUnitActionImport

export default function MeasureUnitAction(props) {

    const { bool, setBool, setLoading } = props

    const navigate = useNavigate()
    const dispatch = useDispatch()

    var permission = JSON.parse(localStorage.getItem('permission'))

    const edit_unit_type = () => {
        navigate('/update-measure-unit', { state: props.data && props.data.id })
    }

    const del_unit = () => {
        Swal.fire({
            title: lang.measurement_unit + ' ' + lang.delete,
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
                dispatch(delMeasureUnitTodo({ 'id': props.data && props.data.id })).then((res) => del_res(res.payload))
            }
        })
    }

    const del_res = (res) => {
        if (res && res.status == 204) {
            setBool(!bool)
            Swal.fire({
                title: lang.measurement_unit,
                text: lang.delete_text,
                icon: "success",
                confirmButtonText: lang.ok
            })
        } else if (res && res.status == 400) {
            setBool(!bool)
            toast.error("400 BAD REQUEST", { position: "bottom-right" })
        } else {
            setBool(!bool)
            toast.error(lang.wrong, { position: "bottom-right" })
        }
    }

    return (
        <>
            {permission.some(val => val.actionName == 'Update Measure Unit') ?
                <LuFileEdit size={16} className='edit text-success'
                    onClick={() => edit_unit_type()}
                    data-tooltip-id='edit'
                    data-tooltip-content={lang.edit + ' ' + lang.measurement_unit}
                    data-tooltip-place="bottom"
                />
                : ''
            }
            {permission.some(val => val.actionName == 'Delete Measure Unit') ?
                <LuTrash2 size={16} className={localStorage.getItem('lang_key') == 'ar' ? 'delete text-danger me-3' : 'delete text-danger ms-3'}
                    onClick={() => del_unit()}
                    data-tooltip-id='del'
                    data-tooltip-content={lang.delete + ' ' + lang.measurement_unit}
                    data-tooltip-place="bottom"
                />
                : ''
            }

            <Tooltip id='edit' className='bg-success tooltip_msg' />
            <Tooltip id='del' className='bg-danger tooltip_msg' />
        </>
    )
}
