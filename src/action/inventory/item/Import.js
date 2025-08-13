import { LuFileEdit, LuTrash2, LuBadgeInfo } from 'react-icons/lu'
import { Tooltip } from 'react-tooltip'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { delItemTodo } from '../../../redux/slices/inventory/item/DeleteItem'
import { itemDetailsTodo } from '../../../redux/slices/inventory/item/ItemDetails'

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../lang/ar/Item').default
} else {
    lang = require('../../../lang/en/Item').default
}

export const ItemActionImport = {
    LuFileEdit,
    LuTrash2,
    LuBadgeInfo,
    Tooltip,
    useNavigate,
    Swal,
    useDispatch,
    toast,
    delItemTodo,
    itemDetailsTodo,
    lang
}