import { Button, Form, Offcanvas } from 'react-bootstrap'
import { parseLinkHeader } from '@web3-storage/parse-link-header'
import AddCustomerGroupForm from '../../../components/forms/sales/customer_group/AddCustomerGroupForm.jsx'
import UpdateCustomerGroupForm from '../../../components/forms/sales/customer_group/UpdateCustomerGroupForm.jsx'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { customerGroupListTodo } from '../../../redux/slices/sales/customer_group/CustomerGroupList.js'
import { ToastContainer } from 'react-bootstrap'
import Pagination from '../../../components/pagination/Pagination.jsx'
import DataTable from '../../../components/data_table/DataTable.jsx'
import Loader from '../../../components/loader/Loader.jsx'
import Excel from '../../../components/buttons/Excel.jsx'
import PDF from '../../../components/buttons/PDF.jsx'
import Search from '../../../components/buttons/Search.jsx'
import AddButton from '../../../components/buttons/AddButton.jsx'
import CustomerGroupAction from '../../../action/sales/customer_group/CustomerGroupAction.jsx'

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../lang/ar/CustomerGroup.js').default
} else {
    lang = require('../../../lang/en/CustomerGroup.js').default
}

export const CustomerGroupImport = {
    Offcanvas,
    Link,
    Form,
    Button,
    useNavigate,
    useDispatch,
    useSelector,
    ToastContainer,
    Pagination,
    DataTable,
    Loader,
    Excel,
    PDF,
    Search,
    AddButton,
    CustomerGroupAction,
    parseLinkHeader,
    AddCustomerGroupForm,
    UpdateCustomerGroupForm,
    customerGroupListTodo,
    lang
}