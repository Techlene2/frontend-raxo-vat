import { Form } from 'react-bootstrap'
import { useFormik } from 'formik'
import SaveButton from '../../../buttons/SaveButton'
import Text from '../../../input_fields/Text'
import TextArea from '../../../input_fields/TextArea'
import Email from '../../../input_fields/Email'
import SelectStatus from '../../../input_fields/SelectStatus'
import SingleSelect from '../../../input_fields/SingleSelect'
import { AddCompanyBusinessAreaSchema } from './ValidationSchema'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { companyListTodo } from '../../../../redux/slices/user_management/company/CompanyList.js'
import { cityListTodo } from '../../../../redux/slices/user_management/city/CityList.js'
import Loader from '../../../loader/Loader'
import { addCompanyBusinessAreaTodo } from '../../../../redux/slices/user_management/company_business_area/AddCompanyBusinessArea.js'
import { ToastContainer, toast } from 'react-toastify'
import { companyBusinessAreaDetailsTodo } from '../../../../redux/slices/user_management/company_business_area/CompanyBusinessAreaDetails.js'
import { updateCompanyBusinessAreaTodo } from '../../../../redux/slices/user_management/company_business_area/UpdateCompanyBusinessArea.js'
import debounce from "lodash/debounce"

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../../lang/ar/CompanyBusinessArea.js').default
} else {
    lang = require('../../../../lang/en/CompanyBusinessArea.js').default
}


export const CompanyBusinessAreaImport = {
    Form,
    useFormik,
    SaveButton,
    Text,
    TextArea,
    Email,
    SelectStatus,
    SingleSelect,
    AddCompanyBusinessAreaSchema,
    useNavigate,
    useLocation,
    useDispatch,
    useSelector,
    companyListTodo,
    cityListTodo,
    Loader,
    addCompanyBusinessAreaTodo,
    ToastContainer,
    toast,
    companyBusinessAreaDetailsTodo,
    updateCompanyBusinessAreaTodo,
    debounce,
    lang
}