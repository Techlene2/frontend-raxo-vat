import { Form } from 'react-bootstrap'
import Text from '../../../input_fields/Text'
import { useFormik } from 'formik'
import SaveButton from '../../../buttons/SaveButton'
import TextArea from '../../../input_fields/TextArea'
import SingleSelect from "../../../input_fields/SingleSelect"
import { AddMeasureUnitSchema } from './ValidationSchema'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { measureUnitTypeListTodo } from '../../../../redux/slices/inventory/measure_unit_type/MeasureUnitTypeList.js'
import Loader from '../../../loader/Loader'
import { addMeasureUnitTodo } from '../../../../redux/slices/inventory/measure_unit/AddMeasureUnit.js'
import { updateMeasureUnitTodo } from '../../../../redux/slices/inventory/measure_unit/UpdateMeasureUnit.js'
import { measureUnitDetailsTodo } from '../../../../redux/slices/inventory/measure_unit/MeasureUnitDetails.js'
import { ToastContainer, toast } from 'react-toastify'

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../../lang/ar/MeasureUnit.js').default
} else {
    lang = require('../../../../lang/en/MeasureUnit.js').default
}

export const MeasureUnitImport = {
    Text,
    TextArea,
    Form,
    SingleSelect,
    useFormik,
    SaveButton,
    AddMeasureUnitSchema,
    useLocation,
    useNavigate,
    useDispatch,
    useSelector,
    measureUnitTypeListTodo,
    Loader,
    addMeasureUnitTodo,
    updateMeasureUnitTodo,
    measureUnitDetailsTodo,
    ToastContainer,
    toast,
    lang
}