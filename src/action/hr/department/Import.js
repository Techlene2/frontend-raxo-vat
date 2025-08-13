import { LuFileEdit, LuTrash2 } from 'react-icons/lu'
import { Tooltip } from 'react-tooltip'
import { useNavigate, useLocation } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { delDepartmentTodo } from '../../../redux/slices/hr/department/DeleteDepartment'

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../lang/ar/Department').default
} else {
    lang = require('../../../lang/en/Department').default
}

export const DepartmentActionImport = {
    LuFileEdit,
    LuTrash2,
    Tooltip,
    useNavigate,
    useLocation,
    Swal,
    useDispatch,
    toast,
    delDepartmentTodo,
    lang
}