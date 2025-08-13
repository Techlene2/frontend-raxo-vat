import { LuFileEdit, LuTrash2, LuBadgeInfo } from 'react-icons/lu'
import { Tooltip } from 'react-tooltip'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { delRoutesTodo } from '../../../redux/slices/sales/routes/DeleteRoutes'

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../lang/ar/Routes').default
} else {
    lang = require('../../../lang/en/Routes').default
}

export const RoutesActionImport = {
    LuFileEdit,
    LuBadgeInfo,
    LuTrash2,
    Tooltip,
    useNavigate,
    Swal,
    useDispatch,
    toast,
    delRoutesTodo,
    lang
}