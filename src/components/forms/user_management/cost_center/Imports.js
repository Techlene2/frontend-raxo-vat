import { Form } from 'react-bootstrap'
import Text from '../../../input_fields/Text'
import { useFormik } from 'formik'
import SaveButton from '../../../buttons/SaveButton'
import Loader from '../../../loader/Loader'
import { ToastContainer, toast } from 'react-toastify'
import SelectStatus from '../../../input_fields/SelectStatus'
import { CostCenterSchema } from './ValidationSchema.js'
import TextArea from '../../../input_fields/TextArea.jsx'
import { addCostCenterTodo } from '../../../../redux/slices/user_management/cost_center/AddCostCenter.js'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { costCenterDetailsTodo } from '../../../../redux/slices/user_management/cost_center/CostCenterDetails.js'
import { updateCostCenterTodo } from '../../../../redux/slices/user_management/cost_center/UpdateCostCenter.js'

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../../lang/ar/CostCenter.js').default
} else {
    lang = require('../../../../lang/en/CostCenter.js').default
}

export const CostCenterImport = {
    Text,
    Form,
    useFormik,
    SaveButton,
    ToastContainer,
    toast,
    Loader,
    SelectStatus,
    CostCenterSchema,
    TextArea,
    addCostCenterTodo,
    useDispatch,
    useLocation,
    useNavigate,
    useSelector,
    costCenterDetailsTodo,
    updateCostCenterTodo,
    lang
}