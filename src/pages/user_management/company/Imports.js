import { Link, useNavigate, useLocation } from "react-router-dom"
import LoginBanner from '../../../assets/images/login-banner.png'
import AddButton from '../../../components/buttons/AddButton.jsx'
import Search from '../../../components/buttons/Search.jsx'
import PDF from '../../../components/buttons/PDF.jsx'
import Excel from '../../../components/buttons/Excel.jsx'
import Pagination from '../../../components/pagination/Pagination.jsx'
import { Form, Button, Offcanvas } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import Loader from "../../../components/loader/Loader.jsx"
import DataTable from "../../../components/data_table/DataTable.jsx"
import { parseLinkHeader } from '@web3-storage/parse-link-header'
import AddCompanyForm from "../../../components/forms/user_management/company/AddCompanyForm.jsx"
import UpdateCompanyForm from "../../../components/forms/user_management/company/UpdateCompanyForm.jsx"
import { companyListTodo } from "../../../redux/slices/user_management/company/CompanyList.js"
import CompanyAction from "../../../action/user_management/company/CompanyAction.jsx"

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../lang/ar/Company.js').default
} else {
    lang = require('../../../lang/en/Company.js').default
}

export const CompanyImport = {
    Link,
    LoginBanner,
    AddButton,
    Search,
    PDF,
    Excel,
    Pagination,
    DataTable,
    ToastContainer,
    Loader,
    useNavigate,
    useLocation,
    useDispatch,
    useSelector,
    parseLinkHeader,
    Form,
    Button,
    Offcanvas,
    AddCompanyForm,
    UpdateCompanyForm,
    companyListTodo,
    CompanyAction,
    lang
}