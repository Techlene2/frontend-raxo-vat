import { Link, useNavigate, useLocation } from "react-router-dom"
import LoginBanner from '../../../assets/images/login-banner.png'
import AddButton from '../../../components/buttons/AddButton'
import AddCustomerForm from "../../../components/forms/sales/customer/AddCustomerForm.jsx"
import UpdateCustomerForm from "../../../components/forms/sales/customer/UpdateCustomerForm.jsx"
import DataTable from '../../../components/data_table/DataTable'
import { Form, Button, Offcanvas } from 'react-bootstrap'
import CustomerAction from "../../../action/sales/customer/CustomerAction.jsx"
import Search from '../../../components/buttons/Search'
import PDF from '../../../components/buttons/PDF'
import Excel from '../../../components/buttons/Excel'
import Pagination from '../../../components/pagination/Pagination'
import { useDispatch, useSelector } from 'react-redux'
import { customerListTodo } from "../../../redux/slices/sales/customer/CustomerList.js"
import Loader from '../../../components/loader/Loader'
import { LuPcCase } from "react-icons/lu"
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import CustomerImg from '../../../assets/images/UserImg.jpg'
import 'react-perfect-scrollbar/dist/css/styles.css'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { ToastContainer } from 'react-toastify'
import { parseLinkHeader } from '@web3-storage/parse-link-header'

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../lang/ar/Customer.js').default
} else {
    lang = require('../../../lang/en/Customer.js').default
}

export const CustomerImport = {
    Link,
    LoginBanner,
    AddButton,
    AddCustomerForm,
    UpdateCustomerForm,
    DataTable,
    Form,
    Button,
    CustomerAction,
    Search,
    PDF,
    Excel,
    Pagination,
    Offcanvas,
    useDispatch,
    useSelector,
    customerListTodo,
    Loader,
    LuPcCase,
    Tab,
    Tabs,
    CustomerImg,
    PerfectScrollbar,
    ToastContainer,
    useNavigate,
    useLocation,
    parseLinkHeader,
    lang
}