import { Form } from 'react-bootstrap'
import Text from '../../../input_fields/Text.jsx'
import { useFormik } from 'formik'
import SaveButton from '../../../buttons/SaveButton.jsx'
import Loader from '../../../loader/Loader.jsx'
import { ToastContainer, toast } from 'react-toastify'
import SelectStatus from '../../../input_fields/SelectStatus.jsx'
import TextArea from '../../../input_fields/TextArea.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { AddCustomerTypeSchema } from './ValidationSchema.js'
import { addCustomerTypeTodo } from '../../../../redux/slices/sales/customer_type/AddCustomerType.js'
import { updateCustomerTypeTodo } from '../../../../redux/slices/sales/customer_type/UpdateCustomerType.js'
import { customerTypeDetailsTodo } from '../../../../redux/slices/sales/customer_type/CustomerTypeDetails.js'

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../../lang/ar/CustomerType.js').default
} else {
    lang = require('../../../../lang/en/CustomerType.js').default
}

export const CustomerTypeImport = {
    Text,
    Form,
    useFormik,
    SaveButton,
    ToastContainer,
    toast,
    Loader,
    SelectStatus,
    TextArea,
    useDispatch,
    useSelector,
    useNavigate,
    useLocation,
    AddCustomerTypeSchema,
    addCustomerTypeTodo,
    updateCustomerTypeTodo,
    customerTypeDetailsTodo,
    lang
}