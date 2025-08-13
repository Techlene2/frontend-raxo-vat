import { Form } from 'react-bootstrap'
import { useFormik } from 'formik'
import SaveButton from '../../../buttons/SaveButton'
import Text from '../../../input_fields/Text'
import TextArea from '../../../input_fields/TextArea'
import SingleSelect from '../../../input_fields/SingleSelect'
import { AddSubMenuSchema } from './ValidationSchema'
import IconSelect from '../../../input_fields/IconSelect'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { menuListTodo } from '../../../../redux/slices/user_management/menu/MenuList.js'
import { ToastContainer, toast } from 'react-toastify'
import { useLocation } from 'react-router-dom'
import Loader from '../../../loader/Loader'
import { subMenuTodo } from '../../../../redux/slices/user_management/sub_menu/SubMenu.js'

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../../lang/ar/SubMenu.js').default
} else {
    lang = require('../../../../lang/en/SubMenu.js').default
}


export const SubMenuImport = {
    Form,
    useFormik,
    SaveButton,
    Text,
    TextArea,
    SingleSelect,
    AddSubMenuSchema,
    IconSelect,
    useNavigate,
    useDispatch,
    useSelector,
    menuListTodo,
    ToastContainer,
    toast,
    useLocation,
    Loader,
    subMenuTodo,
    lang
}