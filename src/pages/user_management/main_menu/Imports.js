import { Link, useNavigate } from "react-router-dom"
import AddButton from "../../../components/buttons/AddButton.jsx"
import LoginBanner from "../../../assets/images/login-banner.png"
import AddMainMenuForm from "../../../components/forms/user_management/main_menu/AddMainMenuForm.jsx"
import UpdateMainMenuForm from "../../../components/forms/user_management/main_menu/UpdateMainMenuForm.jsx"
import { useDispatch, useSelector } from 'react-redux'
import { menuListTodo } from "../../../redux/slices/user_management/menu/MenuList.js"
import Loader from '../../../components/loader/Loader.jsx'
import { Button, Form, Offcanvas } from 'react-bootstrap'
import Search from '../../../components/buttons/Search.jsx'
import PDF from '../../../components/buttons/PDF.jsx'
import Excel from '../../../components/buttons/Excel.jsx'
import Pagination from '../../../components/pagination/Pagination.jsx'
import DataTable from '../../../components/data_table/DataTable.jsx'
import MenuAction from "../../../action/user_management/menu/MenuAction.jsx"
import { ToastContainer } from "react-toastify"
import { parseLinkHeader } from '@web3-storage/parse-link-header'

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../lang/ar/MainMenu.js').default
} else {
    lang = require('../../../lang/en/MainMenu.js').default
}

export const MainMenuImport = {
    Link,
    AddButton,
    LoginBanner,
    AddMainMenuForm,
    UpdateMainMenuForm,
    useNavigate,
    useDispatch,
    useSelector,
    menuListTodo,
    Loader,
    Button,
    Form,
    Search,
    PDF,
    Excel,
    Pagination,
    DataTable,
    MenuAction,
    ToastContainer,
    parseLinkHeader,
    Offcanvas,
    lang
}