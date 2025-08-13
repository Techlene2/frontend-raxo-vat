import { Button, Form, Offcanvas } from 'react-bootstrap'
import AddCustomerCategoryForm from '../../../components/forms/sales/customer_category/AddCustomerCategoryForm.jsx'
import UpdateCustomerCategoryForm from '../../../components/forms/sales/customer_category/UpdateCustomerCategoryForm.jsx'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { parseLinkHeader } from '@web3-storage/parse-link-header'
import { customerCategoryListTodo } from '../../../redux/slices/sales/customer_category/CustomerCategoryList.js'
import AddButton from '../../../components/buttons/AddButton.jsx'
import Search from '../../../components/buttons/Search.jsx'
import PDF from '../../../components/buttons/PDF.jsx'
import Excel from '../../../components/buttons/Excel.jsx'
import Loader from '../../../components/loader/Loader.jsx'
import DataTable from '../../../components/data_table/DataTable.jsx'
import Pagination from '../../../components/pagination/Pagination.jsx'
import { ToastContainer } from 'react-toastify'
import CustomerCategoryAction from '../../../action/sales/customer_category/CustomerCategoryAction.jsx'

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../lang/ar/CustomerCategory.js').default
} else {
    lang = require('../../../lang/en/CustomerCategory.js').default
}

export const CustomerCategoryImport = {
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
    AddCustomerCategoryForm,
    UpdateCustomerCategoryForm,
    customerCategoryListTodo,
    CustomerCategoryAction,
    lang
}