import { Link, useNavigate } from "react-router-dom"
import AddButton from "../../../components/buttons/AddButton.jsx"
import LoginBanner from '../../../assets/images/login-banner.png'
import AddSubMenuForm from "../../../components/forms/user_management/sub_menu/AddSubMenuForm.jsx"
import UpdateSubMenuForm from "../../../components/forms/user_management/sub_menu/UpdateSubMenuForm.jsx"
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../../components/loader/Loader.jsx'
import { Button, Form, Offcanvas } from 'react-bootstrap'
import Search from '../../../components/buttons/Search.jsx'
import PDF from '../../../components/buttons/PDF.jsx'
import Excel from '../../../components/buttons/Excel.jsx'
import Pagination from '../../../components/pagination/Pagination.jsx'
import DataTable from '../../../components/data_table/DataTable.jsx'
import { subMenuTodo } from "../../../redux/slices/user_management/sub_menu/SubMenu.js"
import SubMenuAction from "../../../action/user_management/sub_menu/SubMenuAction.jsx"
import { ToastContainer } from "react-toastify"
import { parseLinkHeader } from '@web3-storage/parse-link-header'

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../lang/ar/SubMenu.js').default
} else {
    lang = require('../../../lang/en/SubMenu.js').default
}

export const SubMenuImport = {
    Link,
    AddButton,
    LoginBanner,
    AddSubMenuForm,
    UpdateSubMenuForm,
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
    subMenuTodo,
    SubMenuAction,
    ToastContainer,
    parseLinkHeader,
    Offcanvas,
    lang
}