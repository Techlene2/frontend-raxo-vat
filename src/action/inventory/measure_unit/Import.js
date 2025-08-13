import { LuFileEdit, LuTrash2 } from 'react-icons/lu'
import { Tooltip } from 'react-tooltip'
import { useNavigate, useLocation } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { delMeasureUnitTodo } from '../../../redux/slices/inventory/measure_unit/DeleteMeasureUnit'

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../lang/ar/MeasureUnit').default
} else {
    lang = require('../../../lang/en/MeasureUnit').default
}

export const MeasureUnitActionImport = {
    LuFileEdit,
    LuTrash2,
    Tooltip,
    useNavigate,
    useLocation,
    Swal,
    useDispatch,
    toast,
    delMeasureUnitTodo,
    lang
}