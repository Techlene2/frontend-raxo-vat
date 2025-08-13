import { LuFileEdit, LuTrash2 } from 'react-icons/lu'
import { Tooltip } from 'react-tooltip'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { delWareHouseTodo } from '../../../redux/slices/user_management/business_area_ware_house/DeleteWareHouse'

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../lang/ar/BusinessAreaWareHouse').default
} else {
    lang = require('../../../lang/en/BusinessAreaWareHouse').default
}


export const BusinessAreaWareHouseActionImport = {
    LuFileEdit,
    LuTrash2,
    Tooltip,
    useNavigate,
    Swal,
    useDispatch,
    toast,
    delWareHouseTodo,
    lang
}