import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Tooltip } from 'react-tooltip'
import { LuFileEdit, LuTrash2 } from 'react-icons/lu'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'
import { delSalesOrderTodo } from '../../../redux/slices/sales/sales_order/DeleteSalesOrder'

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../lang/ar/CustomerSalesOrder.js').default
} else {
    lang = require('../../../lang/en/CustomerSalesOrder.js').default
}


export const CustomerSalesOrderActionImport = {
    useNavigate,
    useDispatch,
    delSalesOrderTodo,
    Tooltip,
    LuFileEdit,
    LuTrash2,
    Swal,
    toast,
    lang
}