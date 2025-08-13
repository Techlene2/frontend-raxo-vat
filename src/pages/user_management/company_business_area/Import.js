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
import AddCompanyBusinessAreaForm from "../../../components/forms/user_management/company_business_area/AddCompanyBusinessAreaForm.jsx"
import UpdateCompanyBusinessAreaForm from "../../../components/forms/user_management/company_business_area/UpdateCompanyBusinessAreaForm.jsx"
import { companyBusinessAreaListTodo } from "../../../redux/slices/user_management/company_business_area/CompanyBusinessAreaList.js"
import CompanyBusinessAreaAction from "../../../action/user_management/company_business_area/CompanyBusinessAreaAction.jsx"

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../lang/ar/CompanyBusinessArea.js').default
} else {
    lang = require('../../../lang/en/CompanyBusinessArea.js').default
}

export const CompanyBusinessAreaImport = {
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
    AddCompanyBusinessAreaForm,
    UpdateCompanyBusinessAreaForm,
    companyBusinessAreaListTodo,
    CompanyBusinessAreaAction,
    lang
}