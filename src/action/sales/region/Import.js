import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Tooltip } from 'react-tooltip'
import { LuFileEdit, LuTrash2 } from 'react-icons/lu'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'
import { delRegionTodo } from '../../../redux/slices/sales/region/DeleteRegion.js'

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../lang/ar/Region.js').default
} else {
    lang = require('../../../lang/en/Region.js').default
}

export const RegionActionImport = {
    useNavigate,
    useDispatch,
    Tooltip,
    LuFileEdit,
    LuTrash2,
    Swal,
    toast,
    delRegionTodo,
    lang
}