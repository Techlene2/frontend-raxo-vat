import { Button, Form, Offcanvas, Table, Modal } from 'react-bootstrap'
import { parseLinkHeader } from '@web3-storage/parse-link-header'
import AddCustomerSalesOrderForm from '../../../components/forms/sales/sales_order/AddCustomerSalesOrderForm.jsx'
import UpdateCustomerSalesOrderForm from '../../../components/forms/sales/sales_order/UpdateCustomerSalesOrderForm.jsx'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer } from 'react-bootstrap'
import Pagination from '../../../components/pagination/Pagination.jsx'
import DataTable from '../../../components/data_table/DataTable.jsx'
import Loader from '../../../components/loader/Loader.jsx'
import Excel from '../../../components/buttons/Excel.jsx'
import PDF from '../../../components/buttons/PDF.jsx'
import Search from '../../../components/buttons/Search.jsx'
import AddButton from '../../../components/buttons/AddButton.jsx'
import { salesOrderListTodo } from '../../../redux/slices/sales/sales_order/SalesOrderList.js'
import CustomerSalesOrderAction from '../../../action/sales/sales_order/CustomerSalesOrderAction.jsx'
import moment from 'moment'
import SalesOrderRoutePlanningForm from '../../../components/forms/sales/sales_order/SalesOrderRoutePlanning.jsx'
import { salesOrderDetailsTodo } from '../../../redux/slices/sales/sales_order/SalesOrderDetails'
import SalesOrderItem from '../../modal_pdf/SalesOrderItem'

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../lang/ar/CustomerSalesOrder.js').default
} else {
    lang = require('../../../lang/en/CustomerSalesOrder.js').default
}

export const CustomerSalesOrderImport = {
    Button,
    Form,
    Offcanvas,
    Table,
    Modal,
    parseLinkHeader,
    AddCustomerSalesOrderForm,
    UpdateCustomerSalesOrderForm,
    Link,
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
    salesOrderListTodo,
    CustomerSalesOrderAction,
    moment,
    SalesOrderRoutePlanningForm,
    lang,
    salesOrderDetailsTodo,
    SalesOrderItem
}