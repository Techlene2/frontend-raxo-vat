import { LuFileEdit, LuTrash2 } from 'react-icons/lu'
import { Tooltip } from 'react-tooltip'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { delTaxTypeTodo } from '../../../redux/slices/user_management/tax_type/DeleteTaxType'

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../lang/ar/TaxType').default
} else {
    lang = require('../../../lang/en/TaxType').default
}

export const TaxTypeActionImport = {
    LuFileEdit,
    LuTrash2,
    Tooltip,
    useNavigate,
    Swal,
    useDispatch,
    toast,
    delTaxTypeTodo,
    lang
}