import React from 'react'
import { RoutesActionImport } from './Import'
const { LuFileEdit, LuBadgeInfo, LuTrash2, Tooltip, useNavigate, Swal, useDispatch, toast, delRoutesTodo, lang } = RoutesActionImport

export default function RoutesAction(props) {

    const { bool, setBool, setLoading } = props

    const navigate = useNavigate()
    const dispatch = useDispatch()

    var permission = JSON.parse(localStorage.getItem('permission'))

    const edit_routes = () => {
        navigate('/update-routes', { state: props.data && props.data.id })
    }

    const route_details = () => {
        navigate('/routes-details', { state: props.data && props.data.id })
    }

    const del_routes = () => {
        Swal.fire({
            title: lang.routes + ' ' + lang.delete,
            text: lang.confirm_text,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#121136',
            cancelButtonColor: '#EF3D50',
            cancelButtonText: lang.cancel,
            confirmButtonText: lang.delete
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(delRoutesTodo({ 'id': props.data && props.data.id })).then((res) => del_res(res.payload))
            }
        })
    }

    const del_res = (res) => {
        if (res && res.status == 204) {
            setBool(!bool)
            Swal.fire({
                title: lang.routes,
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
            {permission.some(val => val.actionName == 'Update Route') ?
                <LuFileEdit size={16} className='edit text-success'
                    onClick={() => edit_routes()}
                    data-tooltip-id='edit'
                    data-tooltip-content={lang.edit + ' ' + lang.routes}
                    data-tooltip-place="bottom"
                />
                : ''
            }
            {permission.some(val => val.actionName == 'Route Details') ?
                <LuBadgeInfo size={16} className={localStorage.getItem('lang_key') == 'ar' ? 'details text-primary me-3' : 'details text-primary ms-3'}
                    onClick={() => route_details()}
                    data-tooltip-id='details'
                    data-tooltip-content={lang.routes + ' ' + lang.details}
                    data-tooltip-place="bottom"
                />
                : ''
            }
            {permission.some(val => val.actionName == 'Delete Route') ?
                <LuTrash2 size={16} className={localStorage.getItem('lang_key') == 'ar' ? 'delete text-danger me-3' : 'delete text-danger ms-3'}
                    onClick={() => del_routes()}
                    data-tooltip-id='del'
                    data-tooltip-content={lang.delete + ' ' + lang.routes}
                    data-tooltip-place="bottom"
                />
                : ''
            }

            <Tooltip id='edit' className='bg-success tooltip_msg' />
            <Tooltip id='details' className='bg-primary tooltip_msg' />
            <Tooltip id='del' className='bg-danger tooltip_msg' />
        </>
    )
}
