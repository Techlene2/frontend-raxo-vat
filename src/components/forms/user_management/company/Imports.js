import { Form } from 'react-bootstrap'
import { useFormik } from 'formik'
import SaveButton from '../../../buttons/SaveButton'
import Text from '../../../input_fields/Text'
import TextArea from '../../../input_fields/TextArea'
import Email from '../../../input_fields/Email'
import File from '../../../input_fields/File'
import SingleSelect from '../../../input_fields/SingleSelect'
import { AddCompanySchema } from './ValidationSchema'
import { useDispatch, useSelector } from 'react-redux'
import { cityListTodo } from '../../../../redux/slices/user_management/city/CityList.js'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import Loader from '../../../loader/Loader'
import { addCompanyTodo } from '../../../../redux/slices/user_management/company/AddCompany.js'
import { companyDetailsTodo } from '../../../../redux/slices/user_management/company/CompanyDetails.js'
import { updateCompanyTodo } from '../../../../redux/slices/user_management/company/UpdateCompany.js'
import debounce from "lodash/debounce"

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../../lang/ar/Company.js').default
} else {
    lang = require('../../../../lang/en/Company.js').default
}

export const CompanyImport = {
    Form,
    useFormik,
    Text,
    Email,
    File,
    TextArea,
    SaveButton,
    SingleSelect,
    AddCompanySchema,
    useDispatch,
    useSelector,
    cityListTodo,
    useNavigate,
    useLocation,
    toast,
    ToastContainer,
    Loader,
    addCompanyTodo,
    companyDetailsTodo,
    updateCompanyTodo,
    debounce,
    lang
}