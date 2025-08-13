import { LuFileEdit, LuTrash2 } from 'react-icons/lu'
import { Tooltip } from 'react-tooltip'
import { useNavigate, useLocation } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { delGroupTypeTodo } from '../../../redux/slices/hr/group_type/DeleteGroupType'

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../lang/ar/GroupType').default
} else {
    lang = require('../../../lang/en/GroupType').default
}

export const GroupTypeActionImport = {
    LuFileEdit,
    LuTrash2,
    Tooltip,
    useNavigate,
    useLocation,
    Swal,
    useDispatch,
    toast,
    delGroupTypeTodo,
    lang
}