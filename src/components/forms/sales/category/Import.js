import { Form } from 'react-bootstrap'
import Text from '../../../input_fields/Text'
import SelectStatus from '../../../input_fields/SelectStatus'
import { useFormik } from 'formik'
import SaveButton from '../../../buttons/SaveButton'
import { AddCategorySchema } from './ValidationSchema'
import TextArea from '../../../input_fields/TextArea'
import { useDispatch, useSelector } from 'react-redux'
import { addCategoryTodo } from '../../../../redux/slices/sales/category/AddCategory.js'
import { updateCategoryTodo } from '../../../../redux/slices/sales/category/UpdateCategory.js'
import { categoryDetailsTodo } from '../../../../redux/slices/sales/category/CategoryDetails.js'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import Loader from '../../../loader/Loader'

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../../lang/ar/Category.js').default
} else {
    lang = require('../../../../lang/en/Category.js').default
}

export const CategoryImport = {
    Text,
    TextArea,
    Form,
    SelectStatus,
    useFormik,
    SaveButton,
    AddCategorySchema,
    useDispatch,
    useNavigate,
    toast,
    ToastContainer,
    useLocation,
    Loader,
    useSelector,
    addCategoryTodo,
    updateCategoryTodo,
    categoryDetailsTodo,
    lang
}