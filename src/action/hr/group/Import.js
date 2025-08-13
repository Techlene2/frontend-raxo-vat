import { LuFileEdit, LuTrash2 } from 'react-icons/lu'
import { Tooltip } from 'react-tooltip'
import { useNavigate, useLocation } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { delGroupTodo } from '../../../redux/slices/hr/group/DeleteGroup'


let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../lang/ar/Group').default
} else {
    lang = require('../../../lang/en/Group').default
}

export const GroupActionImport = {
    LuFileEdit,
    LuTrash2,
    Tooltip,
    useNavigate,
    useLocation,
    Swal,
    useDispatch,
    toast,
    delGroupTodo,
    lang
}