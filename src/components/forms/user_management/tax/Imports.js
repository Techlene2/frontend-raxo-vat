import { Form } from 'react-bootstrap'
import Text from '../../../input_fields/Text'
import SaveButton from '../../../buttons/SaveButton'
import TextArea from '../../../input_fields/TextArea'
import { useFormik } from 'formik'
import { TaxSchema } from './ValidationSchema'
import SingleSelect from '../../../input_fields/SingleSelect'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { taxTypeListTodo } from '../../../../redux/slices/user_management/tax_type/TaxTypeList.js'
import Loader from '../../../loader/Loader'
import { addTaxTodo } from '../../../../redux/slices/user_management/tax/AddTax.js'
import { updateTaxTodo } from '../../../../redux/slices/user_management/tax/UpdateTax.js'
import { taxDetailsTodo } from '../../../../redux/slices/user_management/tax/TaxDetails.js'
import { ToastContainer, toast } from 'react-toastify'

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../../lang/ar/Tax.js').default
} else {
    lang = require('../../../../lang/en/Tax.js').default
}

export const TaxImport = {
    Form,
    Text,
    SaveButton,
    TextArea,
    useFormik,
    TaxSchema,
    SingleSelect,
    useNavigate,
    useLocation,
    useDispatch,
    useSelector,
    taxTypeListTodo,
    Loader,
    addTaxTodo,
    updateTaxTodo,
    taxDetailsTodo,
    ToastContainer,
    toast,
    lang
}