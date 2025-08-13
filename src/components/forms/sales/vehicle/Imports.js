import { Form } from 'react-bootstrap'
import Text from '../../../input_fields/Text'
import SelectStatus from '../../../input_fields/SelectStatus'
import { useFormik } from 'formik'
import SaveButton from '../../../buttons/SaveButton'
import { AddVehicleSchema } from './ValidationSchema'
import TextArea from '../../../input_fields/TextArea'
import { useDispatch, useSelector } from 'react-redux'
import { addVehicleTodo } from '../../../../redux/slices/sales/vehicle/AddVehicle.js'
import { updateVehicleTodo } from '../../../../redux/slices/sales/vehicle/UpdateVehicle.js'
import { vehicleDetailsTodo } from '../../../../redux/slices/sales/vehicle/VehicleDetails.js'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import Loader from '../../../loader/Loader'

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../../lang/ar/Vehicle.js').default
} else {
    lang = require('../../../../lang/en/Vehicle.js').default
}

export const VehicleImport = {
    Text,
    TextArea,
    Form,
    SelectStatus,
    useFormik,
    SaveButton,
    AddVehicleSchema,
    useDispatch,
    useNavigate,
    toast,
    ToastContainer,
    useLocation,
    Loader,
    useSelector,
    addVehicleTodo,
    updateVehicleTodo,
    vehicleDetailsTodo,
    lang
}