import { Link, useNavigate, useLocation } from "react-router-dom"
import LoginBanner from '../../../assets/images/login-banner.png'
import AddButton from '../../../components/buttons/AddButton'
import AddDriverForm from "../../../components/forms/sales/driver/AddDriverForm.jsx"
import UpdateDriverForm from "../../../components/forms/sales/driver/UpdateDriverForm.jsx"
import { Form, Button, Offcanvas } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import DriverAction from "../../../action/sales/driver/DriverAction.jsx"
import { driverListTodo } from "../../../redux/slices/sales/driver/DriverList.js"
import Loader from "../../../components/loader/Loader"
import DataTable from "../../../components/data_table/DataTable"
import Search from '../../../components/buttons/Search'
import PDF from '../../../components/buttons/PDF'
import Excel from '../../../components/buttons/Excel'
import Pagination from '../../../components/pagination/Pagination'
import { parseLinkHeader } from '@web3-storage/parse-link-header'


let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../lang/ar/Driver.js').default
} else {
    lang = require('../../../lang/en/Driver.js').default
}

export const DriverImport = {
    Link,
    LoginBanner,
    AddButton,
    AddDriverForm,
    UpdateDriverForm,
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
    DriverAction,
    driverListTodo,
    parseLinkHeader,
    Offcanvas,
    lang
}