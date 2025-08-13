import { Link, useNavigate } from "react-router-dom"
import LoginBanner from '../../../assets/images/login-banner.png'
import AddButton from '../../../components/buttons/AddButton.jsx'
import AddTaxForm from "../../../components/forms/user_management/tax/AddTaxForm.jsx"
import UpdateTaxForm from "../../../components/forms/user_management/tax/UpdateTaxForm.jsx"
import { useDispatch, useSelector } from 'react-redux'
import { taxListTodo } from "../../../redux/slices/user_management/tax/TaxList.js"
import Loader from '../../../components/loader/Loader.jsx'
import { Button, Form, Offcanvas } from 'react-bootstrap'
import Search from '../../../components/buttons/Search.jsx'
import PDF from '../../../components/buttons/PDF.jsx'
import Excel from '../../../components/buttons/Excel.jsx'
import Pagination from '../../../components/pagination/Pagination.jsx'
import DataTable from '../../../components/data_table/DataTable.jsx'
import TaxAction from "../../../action/user_management/tax/TaxAction.jsx"
import { ToastContainer } from 'react-toastify'
import { parseLinkHeader } from '@web3-storage/parse-link-header'

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../lang/ar/Tax.js').default
} else {
    lang = require('../../../lang/en/Tax.js').default
}

export const TaxImport = {
    Link,
    LoginBanner,
    AddButton,
    AddTaxForm,
    UpdateTaxForm,
    useNavigate,
    useDispatch,
    useSelector,
    taxListTodo,
    Loader,
    Button,
    Form,
    Search,
    PDF,
    Excel,
    Pagination,
    DataTable,
    TaxAction,
    ToastContainer,
    parseLinkHeader,
    Offcanvas,
    lang
}