import { Form } from 'react-bootstrap'
import { useFormik } from 'formik'
import SaveButton from '../../../buttons/SaveButton.jsx'
import Loader from '../../../loader/Loader.jsx'
import { ToastContainer, toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { AddCustomerRouteAssignmentSchema } from './ValidationSchema.js'
import SingleSelect from '../../../input_fields/SingleSelect.jsx'
import { updateCustomerRouteAssignmentTodo } from '../../../../redux/slices/sales/customer_route_assignment/UpdateCustomerRouteAssignment.js'
import { customerRouteAssignmentDetailsTodo } from '../../../../redux/slices/sales/customer_route_assignment/CustomerRouteAssignmentDetails.js'
import { customerRouteAssignmentListTodo } from '../../../../redux/slices/sales/customer_route_assignment/CustomerRouteAssignmentList.js'
import { addCustomerRouteAssignmentTodo } from '../../../../redux/slices/sales/customer_route_assignment/AddCustomerRouteAssignment.js'
import { customerListTodo } from '../../../../redux/slices/sales/customer/CustomerList.js'
import { routesListTodo } from '../../../../redux/slices/sales/routes/RoutesList.js'

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../../lang/ar/CustomerRouteAssignment.js').default
} else {
    lang = require('../../../../lang/en/CustomerRouteAssignment.js').default
}

export const CustomerRouteAssignmentImport = {
    Form,
    useFormik,
    SaveButton,
    ToastContainer,
    toast,
    Loader,
    SingleSelect,
    useDispatch,
    useSelector,
    useNavigate,
    useLocation,
    AddCustomerRouteAssignmentSchema,
    addCustomerRouteAssignmentTodo,
    updateCustomerRouteAssignmentTodo,
    customerRouteAssignmentDetailsTodo,
    customerRouteAssignmentListTodo,
    customerListTodo,
    routesListTodo,
    lang
}