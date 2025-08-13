import { Link, useNavigate, useLocation } from "react-router-dom"
import LoginBanner from '../../../assets/images/login-banner.png'
import AddButton from '../../../components/buttons/AddButton.jsx'
import { Form, Button, Offcanvas } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from "../../../components/loader/Loader.jsx"
import AddCountryForm from "../../../components/forms/user_management/country/AddCountryForm.jsx"
import UpdateCountryForm from "../../../components/forms/user_management/country/UpdateCountryForm.jsx"
import DataTable from "../../../components/data_table/DataTable.jsx"
import CountryAction from "../../../action/user_management/country/CountryAction.jsx"
import Search from '../../../components/buttons/Search.jsx'
import PDF from '../../../components/buttons/PDF.jsx'
import Excel from '../../../components/buttons/Excel.jsx'
import Pagination from '../../../components/pagination/Pagination.jsx'
import { countryListTodo } from "../../../redux/slices/user_management/country/CountryList.js"
import { ToastContainer } from 'react-toastify'
import { parseLinkHeader } from '@web3-storage/parse-link-header'

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../lang/ar/Country.js').default
} else {
    lang = require('../../../lang/en/Country.js').default
}

export const CountryImport = {
    Link,
    LoginBanner,
    AddButton,
    AddCountryForm,
    UpdateCountryForm,
    DataTable,
    Search,
    PDF,
    Excel,
    Pagination,
    Button,
    Form,
    Loader,
    useNavigate,
    useLocation,
    useDispatch,
    useSelector,
    CountryAction,
    countryListTodo,
    ToastContainer,
    parseLinkHeader,
    Offcanvas,
    lang
}