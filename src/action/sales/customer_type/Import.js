import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Tooltip } from 'react-tooltip'
import { LuFileEdit, LuTrash2 } from 'react-icons/lu'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'
import { delCustomerTypeTodo } from '../../../redux/slices/sales/customer_type/DeleteCustomerType.js'

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../lang/ar/CustomerType.js').default
} else {
    lang = require('../../../lang/en/CustomerType.js').default
}

export const CustomerTypeActionImport = {
    useNavigate,
    useDispatch,
    Tooltip,
    LuFileEdit,
    LuTrash2,
    Swal,
    toast,
    delCustomerTypeTodo,
    lang
}