import { Link, useNavigate, useLocation } from "react-router-dom"
import LoginBanner from '../../../assets/images/login-banner.png'
import AddButton from '../../../components/buttons/AddButton'
import AddCategoryForm from "../../../components/forms/sales/category/AddCategoryForm.jsx"
import UpdateCategoryForm from "../../../components/forms/sales/category/UpdateCategoryForm.jsx"
import { Form, Button, Offcanvas } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import CategoryAction from "../../../action/sales/category/CategoryAction.jsx"
import { categoryListTodo } from "../../../redux/slices/sales/category/CategoryList.js"
import Loader from "../../../components/loader/Loader"
import DataTable from "../../../components/data_table/DataTable"
import Search from '../../../components/buttons/Search'
import PDF from '../../../components/buttons/PDF'
import Excel from '../../../components/buttons/Excel'
import Pagination from '../../../components/pagination/Pagination'
import { parseLinkHeader } from '@web3-storage/parse-link-header'


let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../lang/ar/Category.js').default
} else {
    lang = require('../../../lang/en/Category.js').default
}

export const CategoryImport = {
    Link,
    LoginBanner,
    AddButton,
    AddCategoryForm,
    UpdateCategoryForm,
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
    CategoryAction,
    categoryListTodo,
    parseLinkHeader,
    Offcanvas,
    lang
}