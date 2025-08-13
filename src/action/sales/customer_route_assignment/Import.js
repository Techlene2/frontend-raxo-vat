import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Tooltip } from 'react-tooltip'
import { LuFileEdit, LuTrash2 } from 'react-icons/lu'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'
import { delCustomerRouteAssignmentTodo } from '../../../redux/slices/sales/customer_route_assignment/DeleteCustomerRouteAssignment.js'

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../lang/ar/CustomerRouteAssignment.js').default
} else {
    lang = require('../../../lang/en/CustomerRouteAssignment.js').default
}

export const CustomerRouteAssignmentActionImport = {
    useNavigate,
    useDispatch,
    Tooltip,
    LuFileEdit,
    LuTrash2,
    Swal,
    toast,
    delCustomerRouteAssignmentTodo,
    lang
}