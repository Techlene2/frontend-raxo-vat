import { LuFileEdit, LuTrash2, LuBadgeInfo } from 'react-icons/lu'
import { Tooltip } from 'react-tooltip'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { delEmployeeTodo } from '../../../redux/slices/hr/employee/DeleteEmployee'
import { employeeDetailsTodo } from '../../../redux/slices/hr/employee/EmployeeDetails'

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../lang/ar/Employee').default
} else {
    lang = require('../../../lang/en/Employee').default
}

export const EmployeeActionImport = {
    LuFileEdit,
    LuTrash2,
    LuBadgeInfo,
    Tooltip,
    useNavigate,
    Swal,
    useDispatch,
    toast,
    delEmployeeTodo,
    employeeDetailsTodo,
    lang
}