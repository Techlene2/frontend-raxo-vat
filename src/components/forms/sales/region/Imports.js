import { Form } from 'react-bootstrap'
import Text from '../../../input_fields/Text.jsx'
import { useFormik } from 'formik'
import SaveButton from '../../../buttons/SaveButton.jsx'
import Loader from '../../../loader/Loader.jsx'
import { ToastContainer, toast } from 'react-toastify'
import SelectStatus from '../../../input_fields/SelectStatus.jsx'
import TextArea from '../../../input_fields/TextArea.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { AddRegionSchema } from './ValidationSchema.js'
import { addRegionTodo } from '../../../../redux/slices/sales/region/AddRegion.js'
import { updateRegionTodo } from '../../../../redux/slices/sales/region/UpdateRegion.js'
import { regionDetailsTodo } from '../../../../redux/slices/sales/region/RegionDetails.js'

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../../lang/ar/Region.js').default
} else {
    lang = require('../../../../lang/en/Region.js').default
}

export const RegionImport = {
    Text,
    Form,
    useFormik,
    SaveButton,
    ToastContainer,
    toast,
    Loader,
    SelectStatus,
    TextArea,
    useDispatch,
    useSelector,
    useNavigate,
    useLocation,
    AddRegionSchema,
    addRegionTodo,
    updateRegionTodo,
    regionDetailsTodo,
    lang
}