import { Button, Form, Offcanvas } from 'react-bootstrap'
import AddCustomerRouteAssignmentForm from '../../../components/forms/sales/customer_route_assignment/AddCustomerRouteAssignmentForm.jsx'
import UpdateCustomerRouteAssignmentForm from '../../../components/forms/sales/customer_route_assignment/UpdateCustomerRouteAssignmentForm.jsx'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { parseLinkHeader } from '@web3-storage/parse-link-header'
import AddButton from '../../../components/buttons/AddButton.jsx'
import Search from '../../../components/buttons/Search.jsx'
import PDF from '../../../components/buttons/PDF.jsx'
import Excel from '../../../components/buttons/Excel.jsx'
import Loader from '../../../components/loader/Loader.jsx'
import DataTable from '../../../components/data_table/DataTable.jsx'
import Pagination from '../../../components/pagination/Pagination.jsx'
import { ToastContainer } from 'react-toastify'
import CustomerRouteAssignmentAction from '../../../action/sales/customer_route_assignment/CustomerRouteAssignmentAction.jsx'
import { customerRouteAssignmentListTodo } from '../../../redux/slices/sales/customer_route_assignment/CustomerRouteAssignmentList.js'

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../lang/ar/CustomerRouteAssignment.js').default
} else {
    lang = require('../../../lang/en/CustomerRouteAssignment.js').default
}

export const CustomerRouteAssignmentImport = {
    Offcanvas,
    Link,
    Form,
    Button,
    Search,
    PDF,
    Excel,
    Loader,
    DataTable,
    Pagination,
    ToastContainer,
    AddButton,
    AddCustomerRouteAssignmentForm,
    UpdateCustomerRouteAssignmentForm,
    CustomerRouteAssignmentAction,
    customerRouteAssignmentListTodo,
    useNavigate,
    useDispatch,
    useSelector,
    parseLinkHeader,
    lang
}