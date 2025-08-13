import { Form } from 'react-bootstrap'
import Text from '../../../input_fields/Text'
import { useFormik } from 'formik'
import SaveButton from '../../../buttons/SaveButton'
import { AddDriverSchema } from './ValidationSchema'
import TextArea from '../../../input_fields/TextArea'
import { useDispatch, useSelector } from 'react-redux'
import { addDriverTodo } from '../../../../redux/slices/sales/driver/AddDriver.js'
import { updateDriverTodo } from '../../../../redux/slices/sales/driver/UpdateDriver.js'
import { driverDetailsTodo } from '../../../../redux/slices/sales/driver/DriverDetails.js'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import Loader from '../../../loader/Loader'
import DatePicker from '../../../input_fields/DatePicker'
import Number from '../../../input_fields/Number'
import SingleSelect from '../../../input_fields/SingleSelect'
import moment from 'moment'

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../../lang/ar/Driver.js').default
} else {
    lang = require('../../../../lang/en/Driver.js').default
}

export const DriverImport = {
    Text,
    TextArea,
    Form,
    useFormik,
    SaveButton,
    AddDriverSchema,
    useDispatch,
    useNavigate,
    toast,
    ToastContainer,
    useLocation,
    Loader,
    DatePicker,
    Number,
    useSelector,
    addDriverTodo,
    updateDriverTodo,
    driverDetailsTodo,
    SingleSelect,
    moment,
    lang
}