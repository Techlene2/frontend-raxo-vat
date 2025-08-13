import { Form } from 'react-bootstrap'
import { useFormik } from 'formik'
import SaveButton from '../../../buttons/SaveButton'
import Text from '../../../input_fields/Text'
import TextArea from '../../../input_fields/TextArea'
import SelectStatus from '../../../input_fields/SelectStatus'
import SingleSelect from '../../../input_fields/SingleSelect'
import { AddMainMenuSchema } from './ValidationSchema'
import IconSelect from '../../../input_fields/IconSelect'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addMenuTodo } from '../../../../redux/slices/user_management/menu/AddMenu.js'
import { updateMenuTodo } from '../../../../redux/slices/user_management/menu/UpdateMenu.js'
import { menuDetailsTodo } from '../../../../redux/slices/user_management/menu/MenuDetails.js'
import { ToastContainer, toast } from 'react-toastify'
import { useLocation } from 'react-router-dom'
import Loader from '../../../loader/Loader'

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../../lang/ar/MainMenu.js').default
} else {
    lang = require('../../../../lang/en/MainMenu.js').default
}


export const MainMenuImport = {
    Form,
    useFormik,
    SaveButton,
    Text,
    TextArea,
    SelectStatus,
    SingleSelect,
    AddMainMenuSchema,
    IconSelect,
    useNavigate,
    useDispatch,
    useSelector,
    addMenuTodo,
    updateMenuTodo,
    menuDetailsTodo,
    ToastContainer,
    toast,
    useLocation,
    Loader,
    lang
}