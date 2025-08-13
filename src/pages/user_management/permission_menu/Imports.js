import { Link, useNavigate } from "react-router-dom"
import AddButton from "../../../components/buttons/AddButton"
import LoginBanner from "../../../assets/images/login-banner.png"
import AddPermissionMenuForm from "../../../components/forms/user_management/permission_menu/AddPermissionMenuForm.jsx"
import UpdatePermissionMenuForm from "../../../components/forms/user_management/permission_menu/UpdatePermissionMenuForm.jsx"
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../../components/loader/Loader'
import { Button, Form, Offcanvas } from 'react-bootstrap'
import Search from '../../../components/buttons/Search'
import PDF from '../../../components/buttons/PDF'
import Excel from '../../../components/buttons/Excel'
import Pagination from '../../../components/pagination/Pagination'
import DataTable from '../../../components/data_table/DataTable'
import { permissionMenuListTodo } from "../../../redux/slices/user_management/permission_menu/PermissionMenuList.js"
import PermissionMenuAction from "../../../action/user_management/permission_menu/PermissionMenuAction.jsx"
import { ToastContainer } from "react-toastify"
import { parseLinkHeader } from '@web3-storage/parse-link-header'

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../lang/ar/PermissionMenu.js').default
} else {
    lang = require('../../../lang/en/PermissionMenu.js').default
}

export const PermissionMenuImport = {
    Link,
    AddButton,
    LoginBanner,
    AddPermissionMenuForm,
    UpdatePermissionMenuForm,
    useNavigate,
    useDispatch,
    useSelector,
    Loader,
    Button,
    Form,
    Search,
    PDF,
    Excel,
    Pagination,
    DataTable,
    permissionMenuListTodo,
    PermissionMenuAction,
    ToastContainer,
    parseLinkHeader,
    Offcanvas,
    lang
}