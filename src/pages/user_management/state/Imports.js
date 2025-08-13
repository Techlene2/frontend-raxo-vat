import { Link, useNavigate, useLocation } from "react-router-dom"
import LoginBanner from '../../../assets/images/login-banner.png'
import AddButton from '../../../components/buttons/AddButton.jsx'
import AddStateForm from "../../../components/forms/user_management/state/AddStateForm.jsx"
import UpdateStateForm from "../../../components/forms/user_management/state/UpdateStateForm.jsx"
import { Form, Button, Offcanvas } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import Loader from "../../../components/loader/Loader.jsx"
import DataTable from "../../../components/data_table/DataTable.jsx"
import { stateListTodo } from "../../../redux/slices/user_management/state/StateList.js"
import StateAction from "../../../action/user_management/state/StateAction.jsx"
import Search from '../../../components/buttons/Search.jsx'
import PDF from '../../../components/buttons/PDF.jsx'
import Excel from '../../../components/buttons/Excel.jsx'
import Pagination from '../../../components/pagination/Pagination.jsx'
import { parseLinkHeader } from '@web3-storage/parse-link-header'

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../lang/ar/State.js').default
} else {
    lang = require('../../../lang/en/State.js').default
}

export const StateImport = {
    Link,
    LoginBanner,
    AddButton,
    AddStateForm,
    UpdateStateForm,
    DataTable,
    Search,
    PDF,
    Excel,
    Pagination,
    Button,
    Form,
    ToastContainer,
    stateListTodo,
    StateAction,
    Loader,
    useNavigate,
    useLocation,
    useDispatch,
    useSelector,
    StateAction,
    parseLinkHeader,
    Offcanvas,
    lang
}