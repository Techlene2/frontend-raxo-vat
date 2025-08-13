import { Link, useNavigate, useLocation } from "react-router-dom"
import LoginBanner from '../../../assets/images/login-banner.png'
import AddButton from '../../../components/buttons/AddButton.jsx'
import { Form, Button, Offcanvas } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import Loader from "../../../components/loader/Loader.jsx"
import DataTable from "../../../components/data_table/DataTable.jsx"
import Search from '../../../components/buttons/Search.jsx'
import PDF from '../../../components/buttons/PDF.jsx'
import Excel from '../../../components/buttons/Excel.jsx'
import Pagination from '../../../components/pagination/Pagination.jsx'
import { parseLinkHeader } from '@web3-storage/parse-link-header'
import AddSubCategoryForm from "../../../components/forms/inventory/sub_category/AddSubCategoryForm.jsx"
import UpdateSubCategoryForm from "../../../components/forms/inventory/sub_category/UpdateSubCategoryForm.jsx"
import { subCategoryListTodo } from "../../../redux/slices/inventory/sub_category/SubCategoryList.js"
import SubCategoryAction from "../../../action/inventory/sub_category/SubCategoryAction.jsx"

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../lang/ar/SubCategory.js').default
} else {
    lang = require('../../../lang/en/SubCategory.js').default
}

export const SubCategoryImport = {
    Link,
    LoginBanner,
    AddButton,
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
    parseLinkHeader,
    Offcanvas,
    AddSubCategoryForm,
    UpdateSubCategoryForm,
    subCategoryListTodo,
    SubCategoryAction,
    lang
}