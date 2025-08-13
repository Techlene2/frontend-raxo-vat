import { Link, useNavigate } from "react-router-dom"
import LoginBanner from '../../../assets/images/login-banner.png'
import AddButton from '../../../components/buttons/AddButton.jsx'
import Search from '../../../components/buttons/Search.jsx'
import PDF from '../../../components/buttons/PDF.jsx'
import Excel from '../../../components/buttons/Excel.jsx'
import Pagination from '../../../components/pagination/Pagination.jsx'
import { Form, Button, Offcanvas, Modal, Tabs, Tab, Badge } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import Loader from "../../../components/loader/Loader.jsx"
import DataTable from "../../../components/data_table/DataTable.jsx"
import { parseLinkHeader } from '@web3-storage/parse-link-header'
import AddEmployeeForm from "../../../components/forms/hr/employee/AddEmployeeForm.jsx"
import UpdateEmployeeForm from "../../../components/forms/hr/employee/UpdateEmployeeForm.jsx"
import { employeeListTodo } from "../../../redux/slices/hr/employee/EmployeeList.js"
import EmployeeAction from "../../../action/hr/employee/EmployeeAction.jsx"
import NA from "../../../assets/images/user_img_NA.png"

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../lang/ar/Employee.js').default
} else {
    lang = require('../../../lang/en/Employee.js').default
}

export const EmployeeImport = {
    Link,
    LoginBanner,
    AddButton,
    Search,
    PDF,
    Excel,
    Pagination,
    DataTable,
    ToastContainer,
    Loader,
    useNavigate,
    useDispatch,
    useSelector,
    parseLinkHeader,
    Form,
    Button,
    Offcanvas,
    Modal,
    Tabs,
    Tab,
    Badge,
    AddEmployeeForm,
    UpdateEmployeeForm,
    employeeListTodo,
    EmployeeAction,
    NA,
    lang
}