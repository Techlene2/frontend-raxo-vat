import { Button, Form, Offcanvas } from 'react-bootstrap'
import AddCustomerTypeForm from '../../../components/forms/sales/customer_type/AddCustomerTypeForm.jsx'
import UpdateCustomerTypeForm from '../../../components/forms/sales/customer_type/UpdateCustomerTypeForm.jsx'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { parseLinkHeader } from '@web3-storage/parse-link-header'
import { customerTypeListTodo } from '../../../redux/slices/sales/customer_type/CustomerTypeList.js'
import AddButton from '../../../components/buttons/AddButton.jsx'
import Search from '../../../components/buttons/Search.jsx'
import PDF from '../../../components/buttons/PDF.jsx'
import Excel from '../../../components/buttons/Excel.jsx'
import Loader from '../../../components/loader/Loader.jsx'
import DataTable from '../../../components/data_table/DataTable.jsx'
import Pagination from '../../../components/pagination/Pagination.jsx'
import { ToastContainer } from 'react-toastify'
import CustomerTypeAction from '../../../action/sales/customer_type/CustomerTypeAction.jsx'

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../lang/ar/CustomerType.js').default
} else {
    lang = require('../../../lang/en/CustomerType.js').default
}

export const CustomerTypeImport = {
    Offcanvas,
    Link,
    Form,
    Button,
    AddButton,
    Search,
    PDF,
    Excel,
    Loader,
    DataTable,
    Pagination,
    ToastContainer,
    useNavigate,
    useDispatch,
    useSelector,
    parseLinkHeader,
    AddCustomerTypeForm,
    UpdateCustomerTypeForm,
    customerTypeListTodo,
    CustomerTypeAction,
    lang
}