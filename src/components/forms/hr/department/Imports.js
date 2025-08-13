import Text from "../../../input_fields/Text"
import TextArea from "../../../input_fields/TextArea"
import SelectStatus from "../../../input_fields/SelectStatus"
import { Form } from 'react-bootstrap'
import { useFormik } from 'formik'
import SaveButton from "../../../buttons/SaveButton"
import { DepartmentSchema } from "./ValidationSchema"
import { addDepartmentTodo } from "../../../../redux/slices/hr/department/AddDepartment.js"
import { updateDepartmentTodo } from "../../../../redux/slices/hr/department/UpdateDepartment.js" 
import { departmentDetailsTodo } from "../../../../redux/slices/hr/department/DepartmentDetails.js"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify"
import Loader from '../../../loader/Loader'

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../../lang/ar/Department.js').default
} else {
    lang = require('../../../../lang/en/Department.js').default
}

export const DepartmentImport = {
    Text,
    TextArea,
    SelectStatus,
    Form,
    useFormik,
    SaveButton,
    DepartmentSchema,
    addDepartmentTodo,
    updateDepartmentTodo,
    departmentDetailsTodo,
    useDispatch,
    useSelector,
    useLocation,
    useNavigate,
    ToastContainer,
    toast,
    Loader,
    lang
}
