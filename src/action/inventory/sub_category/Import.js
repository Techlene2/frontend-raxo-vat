import { LuFileEdit, LuTrash2 } from 'react-icons/lu'
import { Tooltip } from 'react-tooltip'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { delSubCategoryTodo } from '../../../redux/slices/inventory/sub_category/DeleteSubCategory'

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../lang/ar/SubCategory').default
} else {
    lang = require('../../../lang/en/SubCategory').default
}

export const SubCategoryActionImport = {
    LuFileEdit,
    LuTrash2,
    Tooltip,
    useNavigate,
    Swal,
    useDispatch,
    toast,
    delSubCategoryTodo,
    lang
}