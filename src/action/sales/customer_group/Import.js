import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { delCustomerGroupTodo } from '../../../redux/slices/sales/customer_group/DeleteCustomerGroup.js'
import { Tooltip } from 'react-tooltip'
import { LuFileEdit, LuTrash2 } from 'react-icons/lu'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../lang/ar/CustomerGroup.js').default
} else {
    lang = require('../../../lang/en/CustomerGroup.js').default
}

export const CustomerGroupActionImport = {
    useNavigate,
    useDispatch,
    delCustomerGroupTodo,
    Tooltip,
    LuFileEdit,
    LuTrash2,
    Swal,
    toast,
    lang
}