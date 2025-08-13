import { Form } from 'react-bootstrap'
import { useFormik } from 'formik'
import SaveButton from '../../../buttons/SaveButton'
import Text from "../../../input_fields/Text"
import TextArea from "../../../input_fields/TextArea"
import SelectStatus from '../../../input_fields/SelectStatus'
import { RoleSchema } from './ValidationSchema'
import { useDispatch, useSelector } from 'react-redux'
import { addRoleTodo } from '../../../../redux/slices/user_management/role/AddRole.js'
import { updateRoleTodo } from '../../../../redux/slices/user_management/role/UpdateRole.js'
import { roleDetailsTodo } from '../../../../redux/slices/user_management/role/RoleDetails.js'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import Loader from '../../../loader/Loader'

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../../lang/ar/Role.js').default
} else {
    lang = require('../../../../lang/en/Role.js').default
}

export const RoleImport = {
    Form,
    useFormik,
    SaveButton,
    Text,
    TextArea,
    SelectStatus,
    RoleSchema,
    useDispatch,
    useNavigate,
    toast,
    ToastContainer,
    useLocation,
    Loader,
    useSelector,
    addRoleTodo,
    updateRoleTodo,
    roleDetailsTodo,
    lang
}