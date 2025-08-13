import { Form } from 'react-bootstrap'
import Text from '../../../input_fields/Text'
import SingleSelect from '../../../input_fields/SingleSelect'
import SelectStatus from '../../../input_fields/SelectStatus'
import { useFormik } from 'formik'
import SaveButton from '../../../buttons/SaveButton'
import { AddCurrencySchema } from './ValidationSchema'
import { useDispatch, useSelector } from 'react-redux'
import { countryListTodo } from '../../../../redux/slices/user_management/country/CountryList.js'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import Loader from '../../../loader/Loader'
import currencyFormatter from 'currency-formatter'
import { addCurrencyTodo } from '../../../../redux/slices/user_management/currency/AddCurrency.js'
import { updateCurrencyTodo } from '../../../../redux/slices/user_management/currency/UpdateCurrency.js'
import { currencyDetailsTodo } from '../../../../redux/slices/user_management/currency/CurrencyDetails.js'

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../../lang/ar/Currency.js').default
} else {
    lang = require('../../../../lang/en/Currency.js').default
}

export const CurrencyImport = {
    Text,
    Form,
    SingleSelect,
    SelectStatus,
    useFormik,
    SaveButton,
    AddCurrencySchema,
    useDispatch,
    countryListTodo,
    useNavigate,
    toast,
    ToastContainer,
    useLocation,
    Loader,
    useSelector,
    currencyFormatter,
    addCurrencyTodo,
    updateCurrencyTodo,
    currencyDetailsTodo,
    lang
}