import { Link, useNavigate, useLocation } from "react-router-dom"
import LoginBanner from '../../../assets/images/login-banner.png'
import AddButton from '../../../components/buttons/AddButton.jsx'
import { Form, Button, Offcanvas } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import Loader from "../../../components/loader/Loader.jsx"
import DataTable from "../../../components/data_table/DataTable.jsx"
import { parseLinkHeader } from '@web3-storage/parse-link-header'
import { currencyListTodo } from "../../../redux/slices/user_management/currency/CurrencyList.js"
import CurrencyAction from "../../../action/user_management/currency/CurrencyAction.jsx"
import Search from '../../../components/buttons/Search.jsx'
import PDF from '../../../components/buttons/PDF.jsx'
import Excel from '../../../components/buttons/Excel.jsx'
import Pagination from '../../../components/pagination/Pagination.jsx'
import AddCurrencyForm from "../../../components/forms/user_management/currency/AddCurrencyForm.jsx"
import UpdateCurrencyForm from "../../../components/forms/user_management/currency/UpdateCurrencyForm.jsx"

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../lang/ar/Currency.js').default
} else {
    lang = require('../../../lang/en/Currency.js').default
}

export const CurrencyImport = {
    Link,
    LoginBanner,
    AddButton,
    DataTable,
    Button,
    Form,
    ToastContainer,
    Search,
    PDF,
    Excel,
    Pagination,
    Loader,
    useNavigate,
    useLocation,
    useDispatch,
    useSelector,
    parseLinkHeader,
    Offcanvas,
    currencyListTodo,
    CurrencyAction,
    AddCurrencyForm,
    UpdateCurrencyForm,
    lang
}