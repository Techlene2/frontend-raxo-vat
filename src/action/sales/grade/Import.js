import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Tooltip } from 'react-tooltip'
import { LuFileEdit, LuTrash2 } from 'react-icons/lu'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'
import { delGradeTodo } from '../../../redux/slices/sales/grade/DeleteGrade.js'

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../lang/ar/Grade.js').default
} else {
    lang = require('../../../lang/en/Grade.js').default
}

export const GradeActionImport = {
    useNavigate,
    useDispatch,
    Tooltip,
    LuFileEdit,
    LuTrash2,
    Swal,
    toast,
    delGradeTodo,
    lang
}