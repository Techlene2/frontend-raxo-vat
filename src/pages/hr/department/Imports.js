import { Link, useNavigate } from "react-router-dom"
import LoginBanner from '../../../assets/images/login-banner.png'
import AddButton from '../../../components/buttons/AddButton.jsx'
import AddDepartmentForm from "../../../components/forms/hr/department/AddDepartmentForm.jsx"
import UpdateDepartmentForm from "../../../components/forms/hr/department/UpdateDepartmentForm.jsx"
import { Form, Button, Offcanvas } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from "../../../components/loader/Loader.jsx"
import DataTable from "../../../components/data_table/DataTable.jsx"
import Search from '../../../components/buttons/Search.jsx'
import PDF from '../../../components/buttons/PDF.jsx'
import Excel from '../../../components/buttons/Excel.jsx'
import Pagination from '../../../components/pagination/Pagination.jsx'
import { departmentListTodo } from "../../../redux/slices/hr/department/DepartmentList.js"
import DepartmentAction from "../../../action/hr/department/DepartmentAction.jsx"
import { ToastContainer } from "react-toastify"
import { parseLinkHeader } from '@web3-storage/parse-link-header'

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../lang/ar/Department.js').default
} else {
    lang = require('../../../lang/en/Department.js').default
}

export const DepartmentImport = {
    Link,
    LoginBanner,
    AddButton,
    AddDepartmentForm,
    UpdateDepartmentForm,
    Form,
    Button,
    useDispatch,
    useSelector,
    Loader,
    DataTable,
    Search,
    PDF,
    Excel,
    Pagination,
    useNavigate,
    departmentListTodo,
    DepartmentAction,
    ToastContainer,
    parseLinkHeader,
    Offcanvas,
    lang
}