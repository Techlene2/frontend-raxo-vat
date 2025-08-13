import { LuFileEdit, LuTrash2 } from 'react-icons/lu'
import { Tooltip } from 'react-tooltip'
import { useNavigate, useLocation } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { delMeasureUnitTypeTodo } from '../../../redux/slices/inventory/measure_unit_type/DeleteMeasureUnitType'

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../lang/ar/MeasureUnitType').default
} else {
    lang = require('../../../lang/en/MeasureUnitType').default
}

export const MeasureUnitTypeActionImport = {
    LuFileEdit,
    LuTrash2,
    Tooltip,
    useNavigate,
    useLocation,
    Swal,
    useDispatch,
    toast,
    delMeasureUnitTypeTodo,
    lang
}