import { Link, useNavigate, useLocation } from "react-router-dom"
import LoginBanner from '../../../assets/images/login-banner.png'
import AddButton from '../../../components/buttons/AddButton.jsx'
import { Form, Button, Offcanvas } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import Loader from "../../../components/loader/Loader.jsx"
import DataTable from "../../../components/data_table/DataTable.jsx"
import Search from '../../../components/buttons/Search.jsx'
import PDF from '../../../components/buttons/PDF.jsx'
import Excel from '../../../components/buttons/Excel.jsx'
import Pagination from '../../../components/pagination/Pagination.jsx'
import { parseLinkHeader } from '@web3-storage/parse-link-header'
import AddCostCenterForm from "../../../components/forms/user_management/cost_center/AddCostCenterForm.jsx"
import UpdateCostCenterForm from "../../../components/forms/user_management/cost_center/UpdateCostCenterForm.jsx"
import { costCenterListTodo } from "../../../redux/slices/user_management/cost_center/CostCenterList.js"
import CostCenterAction from "../../../action/user_management/cost_center/CostCenterAction.jsx"

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../lang/ar/CostCenter.js').default
} else {
    lang = require('../../../lang/en/CostCenter.js').default
}

export const CostCenterImport = {
    Link,
    LoginBanner,
    AddButton,
    DataTable,
    Search,
    PDF,
    Excel,
    Pagination,
    Button,
    Form,
    ToastContainer,
    Loader,
    useNavigate,
    useLocation,
    useDispatch,
    useSelector,
    parseLinkHeader,
    Offcanvas,
    AddCostCenterForm,
    UpdateCostCenterForm,
    costCenterListTodo,
    CostCenterAction,
    lang
}