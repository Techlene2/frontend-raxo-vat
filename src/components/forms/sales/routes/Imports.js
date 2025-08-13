import { Form, Button } from 'react-bootstrap'
import { useFormik, FieldArray, FormikProvider } from 'formik'
import SaveButton from '../../../buttons/SaveButton.jsx'
import Text from '../../../input_fields/Text.jsx'
import TextArea from '../../../input_fields/TextArea.jsx'
import SelectStatus from '../../../input_fields/SelectStatus.jsx'
import { FaTrash, FaPlus } from 'react-icons/fa';
import { AddRoutesSchema } from './ValidationSchema.js'
import { ToastContainer, toast } from 'react-toastify'
import Loader from '../../../loader/Loader.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { addRoutesTodo } from '../../../../redux/slices/sales/routes/AddRoutes.js'
import { updateRoutesTodo } from '../../../../redux/slices/sales/routes/UpdateRoutes.js'
import { routesDetailsTodo } from '../../../../redux/slices/sales/routes/RoutesDetails.js'
import { StandaloneSearchBox } from '@react-google-maps/api'

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../../lang/ar/Routes.js').default
} else {
    lang = require('../../../../lang/en/Routes.js').default
}


export const RoutesImport = {
    Form,
    Button,
    useFormik,
    FieldArray,
    FormikProvider,
    SaveButton,
    Text,
    TextArea,
    SelectStatus,
    FaTrash,
    FaPlus,
    AddRoutesSchema,
    ToastContainer,
    toast,
    Loader,
    useDispatch,
    useSelector,
    useNavigate,
    useLocation,
    addRoutesTodo,
    updateRoutesTodo,
    routesDetailsTodo,
    StandaloneSearchBox,
    lang
}