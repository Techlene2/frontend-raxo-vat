import { Link, useNavigate, useLocation } from "react-router-dom"
import LoginBanner from '../../../assets/images/login-banner.png'
import AddButton from '../../../components/buttons/AddButton'
import AddDispatchPlanningForm from "../../../components/forms/sales/dispatch_planning/AddDispatchPlanningForm"
import UpdateDispatchPlanningForm from "../../../components/forms/sales/dispatch_planning/UpdateDispatchPlanningForm"
import { Form, Button, Offcanvas } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import Loader from "../../../components/loader/Loader"
import DataTable from "../../../components/data_table/DataTable"
import Search from '../../../components/buttons/Search'
import PDF from '../../../components/buttons/PDF'
import Excel from '../../../components/buttons/Excel'
import Pagination from '../../../components/pagination/Pagination'
import { parseLinkHeader } from '@web3-storage/parse-link-header'
import moment from 'moment'
import DispatchPlanningAction from "../../../action/sales/dispatch_planning/DispatchPlanningAction"
import { dispatchPlanningListTodo } from '../../../redux/slices/sales/dispatch_planning/DispatchPlanningList'

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../lang/ar/DispatchPlanning.js').default
} else {
    lang = require('../../../lang/en/DispatchPlanning.js').default
}

export const DispatchPlanningImport = {
    Link,
    useNavigate,
    useLocation,
    LoginBanner,
    AddButton,
    AddDispatchPlanningForm,
    UpdateDispatchPlanningForm,
    Form,
    Button,
    Offcanvas,
    ToastContainer,
    useDispatch,
    useSelector,
    Loader,
    DataTable,
    Search,
    PDF,
    Excel,
    Pagination,
    parseLinkHeader,
    moment,
    DispatchPlanningAction,
    dispatchPlanningListTodo,
    lang,
}