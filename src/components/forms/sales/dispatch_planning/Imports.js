import { Form, Table } from "react-bootstrap"
import { useFormik, FormikProvider, FieldArray } from "formik"
import DatePicker from '../../../input_fields/DatePicker'
import moment from "moment"
import SingleSelect from '../../../input_fields/SingleSelect'
import SaveButton from '../../../buttons/SaveButton'
import { LuX } from 'react-icons/lu'
import { AddDispatchPlanningSchema } from "./ValidationSchema"
import { ToastContainer, toast } from "react-toastify"
import Loader from '../../../loader/Loader'
import { useNavigate, useLocation } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { driverListTodo } from '../../../../redux/slices/sales/driver/DriverList'
import { vehicleListTodo } from '../../../../redux/slices/sales/vehicle/VehicleList'
import { routesListTodo } from '../../../../redux/slices/sales/routes/RoutesList'
import { salesOrderRoutesListTodo } from '../../../../redux/slices/sales/sales_order/SalesOrderRoutesList'
import { addDispatchPlanningTodo } from '../../../../redux/slices/sales/dispatch_planning/AddDispatchPlanning'
import { updateDispatchPlanningTodo } from "../../../../redux/slices/sales/dispatch_planning/UpdateDispatchPlanning"
import { dispatchPlanningDetailsTodo } from "../../../../redux/slices/sales/dispatch_planning/DispatchPlanningDetails"
import SalesOrderItem from '../../../../pages/modal_pdf/SalesOrderItem'
import { salesOrderDetailsTodo } from '../../../../redux/slices/sales/sales_order/SalesOrderDetails'

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../../lang/ar/DispatchPlanning.js').default
} else {
    lang = require('../../../../lang/en/DispatchPlanning.js').default
}

export const DispatchPlanningImport = {
    Form,
    Table,
    useFormik,
    FormikProvider,
    FieldArray,
    DatePicker,
    moment,
    SingleSelect,
    SaveButton,
    LuX,
    AddDispatchPlanningSchema,
    ToastContainer,
    toast,
    Loader,
    useNavigate,
    useLocation,
    useDispatch,
    useSelector,
    driverListTodo,
    vehicleListTodo,
    routesListTodo,
    salesOrderRoutesListTodo,
    addDispatchPlanningTodo,
    updateDispatchPlanningTodo,
    dispatchPlanningDetailsTodo,
    lang,
    SalesOrderItem,
    salesOrderDetailsTodo,
}