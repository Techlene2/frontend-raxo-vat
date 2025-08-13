import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Tooltip } from 'react-tooltip'
import { LuFileEdit, LuTrash2 } from 'react-icons/lu'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'
import { delCustomerCategoryTodo } from '../../../redux/slices/sales/customer_category/DeleteCustomerCategory.js'

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../lang/ar/CustomerCategory.js').default
} else {
    lang = require('../../../lang/en/CustomerCategory.js').default
}

export const CustomerCategoryActionImport = {
    useNavigate,
    useDispatch,
    Tooltip,
    LuFileEdit,
    LuTrash2,
    Swal,
    toast,
    delCustomerCategoryTodo,
    lang
}