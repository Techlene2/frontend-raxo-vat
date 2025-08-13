import { LuBadgeInfo, LuEye, LuFileEdit, LuTrash2, LuEyeOff } from 'react-icons/lu'
import { Tooltip } from 'react-tooltip'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { delCustomerTodo } from '../../../redux/slices/sales/customer/DeleteCustomer'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../lang/ar/Customer').default
} else {
    lang = require('../../../lang/en/Customer').default
}

export const CustomerActionImport = {
    LuBadgeInfo,
    LuEye,
    LuEyeOff,
    LuFileEdit,
    LuTrash2,
    Tooltip,
    useNavigate,
    useDispatch,
    delCustomerTodo,
    toast,
    Swal,
    lang
}