import { Form } from 'react-bootstrap'
import Text from '../../../input_fields/Text'
import SelectStatus from '../../../input_fields/SelectStatus'
import { useFormik } from 'formik'
import SaveButton from '../../../buttons/SaveButton'
import TextArea from '../../../input_fields/TextArea'
import { AddMeasureUnitTypeSchema } from './ValidationSchema'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { addMeasureUnitTypeTodo } from '../../../../redux/slices/inventory/measure_unit_type/AddMeasureUnitType.js'
import { updateMeasureUnitTypeTodo } from '../../../../redux/slices/inventory/measure_unit_type/UpdateMeasureUnitType.js'
import { measureUnitTypeDetailsTodo } from '../../../../redux/slices/inventory/measure_unit_type/MeasureUnitTypeDetails.js'
import { ToastContainer, toast } from 'react-toastify'
import Loader from '../../../loader/Loader'

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../../lang/ar/MeasureUnitType.js').default
} else {
    lang = require('../../../../lang/en/MeasureUnitType.js').default
}

export const MeasureUnitTypeImport = {
    Text,
    TextArea,
    Form,
    SelectStatus,
    useFormik,
    SaveButton,
    AddMeasureUnitTypeSchema,
    useLocation,
    useDispatch,
    useSelector,
    useNavigate,
    addMeasureUnitTypeTodo,
    updateMeasureUnitTypeTodo,
    measureUnitTypeDetailsTodo,
    ToastContainer,
    toast,
    Loader,
    lang
}