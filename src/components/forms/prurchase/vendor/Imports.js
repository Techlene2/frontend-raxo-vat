import { Form } from 'react-bootstrap'
import Text from '../../../input_fields/Text'
import SelectStatus from '../../../input_fields/SelectStatus'
import { useFormik } from 'formik'
import SaveButton from '../../../buttons/SaveButton'
import { AddVendorSchema } from './ValidationSchema.js'
import TextArea from '../../../input_fields/TextArea'
import { vendorDetailsTodo } from '../../../../redux/slices/purchase/vendor/VendorDetails.js'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import Loader from '../../../loader/Loader'
import SingleSelect from '../../../input_fields/SingleSelect'
import { cityListTodo } from '../../../../redux/slices/user_management/city/CityList.js'
import { addVendorTodo } from '../../../../redux/slices/purchase/vendor/AddVendor.js'
import { ToastContainer, toast } from 'react-toastify'
import { updateVendorTodo } from '../../../../redux/slices/purchase/vendor/UpdateVendor.js'
import debounce from "lodash/debounce"

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../../lang/ar/Vendor.js').default
} else {
    lang = require('../../../../lang/en/Vendor.js').default
}


export const VendorImport = {
    Text,
    TextArea,
    Form,
    SelectStatus,
    useFormik,
    SaveButton,
    Number,
    AddVendorSchema,
    vendorDetailsTodo,
    useDispatch,
    useSelector,
    useLocation,
    useNavigate,
    Loader,
    SingleSelect,
    cityListTodo,
    addVendorTodo,
    updateVendorTodo,
    toast,
    ToastContainer,
    debounce,
    lang
}