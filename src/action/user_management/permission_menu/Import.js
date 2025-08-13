import { LuFileEdit, LuTrash2 } from 'react-icons/lu'
import { Tooltip } from 'react-tooltip'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { delPermissionMenuTodo } from '../../../redux/slices/user_management/permission_menu/DeletePermissionMenu'

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../lang/ar/PermissionMenu').default
} else {
    lang = require('../../../lang/en/PermissionMenu').default
}


export const PermissionMenuActionImport = {
    LuFileEdit,
    LuTrash2,
    Tooltip,
    useNavigate,
    Swal,
    useDispatch,
    toast,
    delPermissionMenuTodo,
    lang
}