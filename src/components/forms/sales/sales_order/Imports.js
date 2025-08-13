import { FieldArray, FormikProvider, useFormik } from 'formik'
import { Button, Card, Form, Tab, Table, Tabs, ListGroup } from 'react-bootstrap'
import SingleSelect from '../../../input_fields/SingleSelect'
import Text from '../../../input_fields/Text'
import DatePicker from '../../../input_fields/DatePicker'
import TextArea from '../../../input_fields/TextArea'
import Radio from '../../../input_fields/Radio'
import Number from '../../../input_fields/Number'
import { LuPlusCircle, LuX, LuXCircle } from "react-icons/lu"
import { FaSquare } from 'react-icons/fa'
import SaveButton from '../../../buttons/SaveButton'
import Loader from '../../../loader/Loader'
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { productPricingWithFiltersTodo } from '../../../../redux/slices/sales/sales_order/ProductPricingWithFilters.js'
import { customerListTodo } from '../../../../redux/slices/sales/customer/CustomerList'
import { customerDispatchDetailsTodo } from '../../../../redux/slices/sales/customer/CustomerDispatchDetails'
import { AddSalesOrderSchema, SalesOrderRoutePlanningSchema } from './ValidationSchema'
import { userListTodo } from '../../../../redux/slices/hr/user/UserList'
import { addSalesOrderTodo } from '../../../../redux/slices/sales/sales_order/AddSalesOrder'
import { salesOrderDetailsTodo } from '../../../../redux/slices/sales/sales_order/SalesOrderDetails'
import { updateSalesOrderTodo } from '../../../../redux/slices/sales/sales_order/UpdateSalesOrder'
import { routesListTodo } from '../../../../redux/slices/sales/routes/RoutesList'
import { salesOrderRoutesListTodo } from '../../../../redux/slices/sales/sales_order/SalesOrderRoutesList'
import moment from 'moment'
import { updateSalesOrderRouteTodo } from '../../../../redux/slices/sales/sales_order/UpdateSalesOrderRoutes'
import Swal from 'sweetalert2'
import SalesOrderItem from '../../../../pages/modal_pdf/SalesOrderItem'
import debounce from "lodash/debounce"

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../../lang/ar/CustomerSalesOrder.js').default
} else {
    lang = require('../../../../lang/en/CustomerSalesOrder.js').default
}

export const CustomerSalesOrderImport = {
    FieldArray,
    FormikProvider,
    useFormik,
    Button,
    Card,
    Form,
    Tab,
    Table,
    Tabs,
    ListGroup,
    SingleSelect,
    Text,
    DatePicker,
    TextArea,
    Radio,
    Number,
    LuPlusCircle,
    LuX,
    LuXCircle,
    FaSquare,
    SaveButton,
    Loader,
    ToastContainer,
    toast,
    AddSalesOrderSchema,
    SalesOrderRoutePlanningSchema,
    useNavigate,
    useLocation,
    useDispatch,
    useSelector,
    productPricingWithFiltersTodo,
    customerListTodo,
    customerDispatchDetailsTodo,
    userListTodo,
    addSalesOrderTodo,
    salesOrderDetailsTodo,
    updateSalesOrderTodo,
    routesListTodo,
    salesOrderRoutesListTodo,
    moment,
    updateSalesOrderRouteTodo,
    lang,
    Swal,
    SalesOrderItem,
    debounce,
}