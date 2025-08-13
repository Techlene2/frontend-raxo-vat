import { Form } from 'react-bootstrap'
import Text from '../../../input_fields/Text.jsx'
import { useFormik } from 'formik'
import SaveButton from '../../../buttons/SaveButton.jsx'
import Loader from '../../../loader/Loader.jsx'
import { ToastContainer, toast } from 'react-toastify'
import TextArea from '../../../input_fields/TextArea.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { AddGradeSchema } from './ValidationSchema.js'
import { addGradeTodo } from '../../../../redux/slices/sales/grade/AddGrade.js'
import { updateGradeTodo } from '../../../../redux/slices/sales/grade/UpdateGrade.js'
import { gradeDetailsTodo } from '../../../../redux/slices/sales/grade/GradeDetails.js'


let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../../lang/ar/Grade.js').default
} else {
    lang = require('../../../../lang/en/Grade.js').default
}

export const GradeImport = {
    Text,
    Form,
    useFormik,
    SaveButton,
    ToastContainer,
    toast,
    Loader,
    TextArea,
    useDispatch,
    useSelector,
    useNavigate,
    useLocation,
    AddGradeSchema,
    addGradeTodo,
    updateGradeTodo,
    gradeDetailsTodo,
    lang
}