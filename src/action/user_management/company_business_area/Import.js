import { LuFileEdit, LuTrash2 } from 'react-icons/lu'
import { Tooltip } from 'react-tooltip'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { delCompanyBusinessAreaTodo } from '../../../redux/slices/user_management/company_business_area/DeleteCompanyBusinessArea'

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../lang/ar/CompanyBusinessArea').default
} else {
    lang = require('../../../lang/en/CompanyBusinessArea').default
}

export const CompanyBusinessAreaActionImport = {
    LuFileEdit,
    LuTrash2,
    Tooltip,
    useNavigate,
    Swal,
    useDispatch,
    toast,
    delCompanyBusinessAreaTodo,
    lang
}