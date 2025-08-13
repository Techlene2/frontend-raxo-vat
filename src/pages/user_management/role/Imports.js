import { Link, useNavigate, useLocation } from "react-router-dom"
import AddButton from "../../../components/buttons/AddButton"
import LoginBanner from "../../../assets/images/login-banner.png"
import AddRoleForm from "../../../components/forms/user_management/role/AddRoleForm.jsx"
import UpdateRoleForm from "../../../components/forms/user_management/role/UpdateRoleForm.jsx"
import { Form, Button, Offcanvas } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import Loader from "../../../components/loader/Loader"
import DataTable from "../../../components/data_table/DataTable"
import RoleAction from "../../../action/user_management/role/RoleAction.jsx"
import { roleListTodo } from "../../../redux/slices/user_management/role/RoleList.js"
import Search from '../../../components/buttons/Search'
import PDF from '../../../components/buttons/PDF'
import Excel from '../../../components/buttons/Excel'
import Pagination from '../../../components/pagination/Pagination'
import { parseLinkHeader } from '@web3-storage/parse-link-header'

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../lang/ar/Role.js').default
} else {
    lang = require('../../../lang/en/Role.js').default
}

export const RoleImport = {
    Link,
    AddButton,
    LoginBanner,
    AddRoleForm,
    UpdateRoleForm,
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
    RoleAction,
    roleListTodo,
    parseLinkHeader,
    Offcanvas,
    lang
}