import { Form } from 'react-bootstrap'
import Text from '../../../input_fields/Text'
import SelectStatus from '../../../input_fields/SelectStatus'
import { useFormik } from 'formik'
import SaveButton from '../../../buttons/SaveButton'
import { AddCountrySchema } from './ValidationSchema'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import Loader from '../../../loader/Loader'
import { addCountryTodo } from '../../../../redux/slices/user_management/country/AddCountry.js'
import { updateCountryTodo } from '../../../../redux/slices/user_management/country/UpdateCountry.js'
import { countryDetailsTodo } from '../../../../redux/slices/user_management/country/CountryDetails.js'

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../../lang/ar/Country.js').default
} else {
    lang = require('../../../../lang/en/Country.js').default
}

export const CountryImport = {
    Text,
    Form,
    SelectStatus,
    useFormik,
    SaveButton,
    AddCountrySchema,
    useDispatch,
    useNavigate,
    toast,
    ToastContainer,
    useLocation,
    Loader,
    useSelector,
    lang,
    addCountryTodo,
    updateCountryTodo,
    countryDetailsTodo
}