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
import { AddCustomerCategorySchema } from './ValidationSchema.js'
import { addCustomerCategoryTodo } from '../../../../redux/slices/sales/customer_category/AddCustomerCategory.js'
import { updateCustomerCategoryTodo } from '../../../../redux/slices/sales/customer_category/UpdateCustomerCategory.js'
import { customerCategoryDetailsTodo } from '../../../../redux/slices/sales/customer_category/CustomerCategoryDetails.js'

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../../lang/ar/CustomerCategory.js').default
} else {
    lang = require('../../../../lang/en/CustomerCategory.js').default
}

export const CustomerCategoryImport = {
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
    AddCustomerCategorySchema,
    addCustomerCategoryTodo,
    updateCustomerCategoryTodo,
    customerCategoryDetailsTodo,
    lang
}