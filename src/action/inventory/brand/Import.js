import { LuFileEdit, LuTrash2 } from 'react-icons/lu'
import { Tooltip } from 'react-tooltip'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { delBrandTodo } from '../../../redux/slices/inventory/brand/DeleteBrand'

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../lang/ar/Brand').default
} else {
    lang = require('../../../lang/en/Brand').default
}

export const BrandActionImport = {
    LuFileEdit,
    LuTrash2,
    Tooltip,
    useNavigate,
    Swal,
    useDispatch,
    toast,
    delBrandTodo,
    lang
}