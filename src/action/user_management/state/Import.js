import { LuFileEdit, LuTrash2 } from 'react-icons/lu'
import { Tooltip } from 'react-tooltip'
import { useNavigate, useLocation } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { delStateTodo } from '../../../redux/slices/user_management/state/DeleteState'

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../lang/ar/State').default
} else {
    lang = require('../../../lang/en/State').default
}

export const StateActionImport = {
    LuFileEdit,
    LuTrash2,
    Tooltip,
    useNavigate,
    useLocation,
    Swal,
    useDispatch,
    toast,
    delStateTodo,
    lang
}