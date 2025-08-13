import { Link, useNavigate } from "react-router-dom"
import { Offcanvas, Form, Button } from "react-bootstrap"
import AddButton from "../../../components/buttons/AddButton"
import LoginBanner from '../../../assets/images/login-banner.png'
import AddUserRoleForm from "../../../components/forms/user_management/user_role/AddUserRoleForm.jsx"
import UpdateUserRoleForm from "../../../components/forms/user_management/user_role/UpdateUserRoleForm.jsx"
import { useDispatch, useSelector } from 'react-redux'
import { parseLinkHeader } from '@web3-storage/parse-link-header'
import Search from '../../../components/buttons/Search'
import PDF from '../../../components/buttons/PDF'
import Excel from '../../../components/buttons/Excel'
import Loader from '../../../components/loader/Loader'
import DataTable from '../../../components/data_table/DataTable'
import Pagination from '../../../components/pagination/Pagination'
import { ToastContainer } from 'react-toastify'
import { userRoleListTodo } from "../../../redux/slices/user_management/user_role/UserRoleList.js"
import UserRoleAction from "../../../action/user_management/user_role/UserRoleAction.jsx"

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../lang/ar/UserRole.js').default
} else {
    lang = require('../../../lang/en/UserRole.js').default
}

export const UserRoleImport = {
    Link,
    LoginBanner,
    Offcanvas,
    Form,
    Button,
    AddButton,
    AddUserRoleForm,
    UpdateUserRoleForm,
    useNavigate,
    useDispatch,
    useSelector,
    parseLinkHeader,
    Search,
    PDF,
    Excel,
    Loader,
    DataTable,
    Pagination,
    ToastContainer,
    userRoleListTodo,
    UserRoleAction,
    lang
}