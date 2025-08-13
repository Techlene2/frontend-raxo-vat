import { Form } from 'react-bootstrap'
import Text from '../../../input_fields/Text'
import { useFormik } from 'formik'
import SaveButton from '../../../buttons/SaveButton'
import Loader from '../../../loader/Loader'
import { toast, ToastContainer } from 'react-toastify'
import SelectStatus from '../../../input_fields/SelectStatus'
import { BrandSchema } from './ValidationSchema.js'
import TextArea from '../../../input_fields/TextArea.jsx'
import { addBrandTodo } from '../../../../redux/slices/inventory/brand/AddBrand.js'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { updateBrandTodo } from '../../../../redux/slices/inventory/brand/UpdateBrand.js'
import { brandDetailsTodo } from '../../../../redux/slices/inventory/brand/BrandDetails.js'

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../../lang/ar/Brand.js').default
} else {
    lang = require('../../../../lang/en/Brand.js').default
}

export const BrandImport = {
    Text,
    Form,
    useFormik,
    SaveButton,
    ToastContainer,
    Loader,
    SelectStatus,
    BrandSchema,
    TextArea,
    addBrandTodo,
    useDispatch,
    useNavigate,
    useLocation,
    toast,
    updateBrandTodo,
    useDispatch,
    useSelector,
    toast,
    brandDetailsTodo,
    lang
}