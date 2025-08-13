import { LuFileEdit, LuTrash2 } from 'react-icons/lu'
import { Tooltip } from 'react-tooltip'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { subMenuTodo } from '../../../redux/slices/user_management/sub_menu/SubMenu'

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../lang/ar/SubMenu').default
} else {
    lang = require('../../../lang/en/SubMenu').default
}


export const SubMenuActionImport = {
    LuFileEdit,
    LuTrash2,
    Tooltip,
    useNavigate,
    Swal,
    useDispatch,
    toast,
    subMenuTodo,
    lang
}