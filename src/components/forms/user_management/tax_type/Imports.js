import { Form } from 'react-bootstrap'
import { useFormik } from 'formik'
import Text from '../../../input_fields/Text'
import TextArea from '../../../input_fields/TextArea'
import SelectStatus from '../../../input_fields/SelectStatus'
import SaveButton from '../../../buttons/SaveButton'
import { TaxTypeSchema } from './ValidationSchema'
import { addTaxTypeTodo } from '../../../../redux/slices/user_management/tax_type/AddTaxType.js'
import { updateTaxTypeTodo } from '../../../../redux/slices/user_management/tax_type/UpdateTaxType.js'
import { taxTypeDetailsTodo } from '../../../../redux/slices/user_management/tax_type/TaxTypeDetails.js'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import Loader from '../../../loader/Loader'

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../../lang/ar/TaxType.js').default
} else {
    lang = require('../../../../lang/en/TaxType.js').default
}

export const TaxTypeImport = {
    Text,
    TextArea,
    SelectStatus,
    Form,
    useFormik,
    SaveButton,
    TaxTypeSchema,
    addTaxTypeTodo,
    updateTaxTypeTodo,
    taxTypeDetailsTodo,
    useDispatch,
    useSelector,
    useLocation,
    useNavigate,
    ToastContainer,
    toast,
    Loader,
    lang
}