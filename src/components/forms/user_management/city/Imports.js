import { Form } from 'react-bootstrap'
import Text from '../../../input_fields/Text'
import SelectStatus from '../../../input_fields/SelectStatus'
import { useFormik } from 'formik'
import SaveButton from '../../../buttons/SaveButton'
import SingleSelect from '../../../input_fields/SingleSelect'
import { AddCitySchema } from './ValidationSchema'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import Loader from '../../../loader/Loader'
import { countryListTodo } from '../../../../redux/slices/user_management/country/CountryList.js'
import { statebyCountryTodo } from '../../../../redux/slices/user_management/state/StatebyCountry.js'
import { addCityTodo } from '../../../../redux/slices/user_management/city/AddCity.js'
import { updateCityTodo } from '../../../../redux/slices/user_management/city/UpdateCity.js'
import { cityDetailsTodo } from '../../../../redux/slices/user_management/city/CityDetails.js'

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../../lang/ar/City.js').default
} else {
    lang = require('../../../../lang/en/City.js').default
}

export const CityImport = {
    Text,
    Form,
    SelectStatus,
    useFormik,
    SaveButton,
    SingleSelect,
    AddCitySchema,
    useNavigate,
    toast,
    ToastContainer,
    useLocation,
    Loader,
    useSelector,
    useDispatch,
    countryListTodo,
    addCityTodo,
    updateCityTodo,
    cityDetailsTodo,
    statebyCountryTodo,
    lang
}