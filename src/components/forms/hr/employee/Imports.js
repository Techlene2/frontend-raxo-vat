import { Form } from 'react-bootstrap'
import Text from '../../../input_fields/Text'
import File from '../../../input_fields/File'
import Email from '../../../input_fields/Email'
import SelectStatus from '../../../input_fields/SelectStatus'
import { useFormik } from 'formik'
import SaveButton from '../../../buttons/SaveButton'
import { addEmployeeTodo } from '../../../../redux/slices/hr/employee/AddEmployee.js'
import { useNavigate, useLocation } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../../loader/Loader.jsx'
import { AddEmployeeSchema } from './ValidationSchema'
import { cityListTodo } from '../../../../redux/slices/user_management/city/CityList.js'
import TextArea from '../../../input_fields/TextArea'
import SingleSelect from '../../../input_fields/SingleSelect'
import DatePicker from '../../../input_fields/DatePicker'
import { updateEmployeeTodo } from '../../../../redux/slices/hr/employee/UpdateEmployee.js'
import { employeeDetailsTodo } from '../../../../redux/slices/hr/employee/EmployeeDetails.js'
import { ToastContainer, toast } from "react-toastify"
import moment from 'moment'
import debounce from "lodash/debounce"

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../../lang/ar/Employee.js').default
} else {
    lang = require('../../../../lang/en/Employee.js').default
}

export const EmployeeImport = {
    Text,
    File,
    Email,
    TextArea,
    Form,
    SelectStatus,
    useFormik,
    SaveButton,
    addEmployeeTodo,
    cityListTodo,
    Loader,
    useNavigate,
    useDispatch,
    useSelector,
    useLocation,
    updateEmployeeTodo,
    employeeDetailsTodo,
    toast,
    AddEmployeeSchema,
    ToastContainer,
    SingleSelect,
    DatePicker,
    moment,
    debounce,
    lang,
}