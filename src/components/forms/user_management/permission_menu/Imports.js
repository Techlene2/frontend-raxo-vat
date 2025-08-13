import { Form, Button } from 'react-bootstrap'
import { useFormik, FieldArray, FormikProvider } from 'formik'
import SaveButton from '../../../buttons/SaveButton'
import Text from '../../../input_fields/Text'
import TextArea from '../../../input_fields/TextArea'
import SingleSelect from '../../../input_fields/SingleSelect'
import IconSelect from '../../../input_fields/IconSelect'
import { FaTrash, FaPlus } from 'react-icons/fa';
import { AddPermissionSchema } from './ValidationSchema'
import { useDispatch, useSelector } from 'react-redux'
import { menuListTodo } from '../../../../redux/slices/user_management/menu/MenuList.js'
import { useNavigate, useLocation } from 'react-router-dom'
import Loader from '../../../loader/Loader'
import { subMenuTodo } from '../../../../redux/slices/user_management/sub_menu/SubMenu.js'
import { addPermissionMenuTodo } from '../../../../redux/slices/user_management/permission_menu/AddPermissionMenu.js'
import { updatePermissionMenuTodo } from '../../../../redux/slices/user_management/permission_menu/UpdatePermissionMenu.js'
import { permissionMenuDetailsTodo } from '../../../../redux/slices/user_management/permission_menu/PermissionMenuDetails.js'
import { ToastContainer, toast } from 'react-toastify'

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../../lang/ar/PermissionMenu.js').default
} else {
    lang = require('../../../../lang/en/PermissionMenu.js').default
}

export const PermissionMenuImport = {
    Form,
    useFormik,
    FieldArray,
    FormikProvider,
    SaveButton,
    Text,
    TextArea,
    SingleSelect,
    IconSelect,
    FaTrash,
    FaPlus,
    AddPermissionSchema,
    useDispatch,
    useSelector,
    menuListTodo,
    useNavigate,
    Loader,
    subMenuTodo,
    addPermissionMenuTodo,
    updatePermissionMenuTodo,
    permissionMenuDetailsTodo,
    ToastContainer,
    toast,
    useLocation,
    Button,
    lang
}