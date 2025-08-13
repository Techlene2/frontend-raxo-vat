import { Form } from 'react-bootstrap'
import Text from '../../../input_fields/Text'
import SelectStatus from '../../../input_fields/SelectStatus'
import { useFormik } from 'formik'
import SaveButton from '../../../buttons/SaveButton'
import { AddStateSchema } from './ValidationSchema'
import SingleSelect from '../../../input_fields/SingleSelect'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import Loader from '../../../loader/Loader'
import { countryListTodo } from '../../../../redux/slices/user_management/country/CountryList.js'
import { addStateTodo } from '../../../../redux/slices/user_management/state/AddState.js'
import { updateStateTodo } from '../../../../redux/slices/user_management/state/UpdateState.js'
import { stateDetailsTodo } from '../../../../redux/slices/user_management/state/StateDetails.js'

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../../lang/ar/State.js').default
} else {
    lang = require('../../../../lang/en/State.js').default
}


export const StateImport = {
    Text,
    Form,
    SelectStatus,
    useFormik,
    SaveButton,
    AddStateSchema,
    SingleSelect,
    addStateTodo,
    updateStateTodo,
    stateDetailsTodo,
    useNavigate,
    toast,
    ToastContainer,
    useLocation,
    Loader,
    useSelector,
    useDispatch,
    countryListTodo,
    lang
}