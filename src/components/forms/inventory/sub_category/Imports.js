import { Form } from 'react-bootstrap'
import Text from '../../../input_fields/Text'
import { useFormik } from 'formik'
import SaveButton from '../../../buttons/SaveButton'
import Loader from '../../../loader/Loader'
import SingleSelect from '../../../input_fields/SingleSelect'
import { toast, ToastContainer } from 'react-toastify'
import SelectStatus from '../../../input_fields/SelectStatus'
import { SubCategorySchema } from './ValidationSchema.js'
import TextArea from '../../../input_fields/TextArea.jsx'
import { categoryListTodo } from '../../../../redux/slices/sales/category/CategoryList.js'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { addSubCategoryTodo } from '../../../../redux/slices/inventory/sub_category/AddSubCategory.js'
import { subCategoryDetailsTodo } from '../../../../redux/slices/inventory/sub_category/SubCategoryDetails.js'
import { updateSubCategoryTodo } from '../../../../redux/slices/inventory/sub_category/UpdateSubCategory.js'

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../../lang/ar/SubCategory.js').default
} else {
    lang = require('../../../../lang/en/SubCategory.js').default
}

export const SubCategoryImport = {
    Text,
    Form,
    useFormik,
    SaveButton,
    SingleSelect,
    toast,
    ToastContainer,
    Loader,
    SelectStatus,
    SubCategorySchema,
    TextArea,
    categoryListTodo,
    useDispatch,
    useSelector,
    useNavigate,
    useLocation,
    addSubCategoryTodo,
    subCategoryDetailsTodo,
    updateSubCategoryTodo,
    lang
}