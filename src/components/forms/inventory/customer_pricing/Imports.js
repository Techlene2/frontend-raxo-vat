import { Form, Button, Table } from "react-bootstrap"
import { useFormik, FormikProvider, FieldArray } from "formik"
import { CustomerPricingSchema } from "./ValidationSchema"
import SingleSelect from '../../../input_fields/SingleSelect'
import DatePicker from '../../../input_fields/DatePicker'
import moment from 'moment'
import Number from '../../../input_fields/Number'
import TextArea from '../../../input_fields/TextArea'
import SaveButton from '../../../buttons/SaveButton'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { subCategoryListTodo } from '../../../../redux/slices/inventory/sub_category/SubCategoryList'
import { brandListTodo } from '../../../../redux/slices/inventory/brand/BrandList'
import Loader from '../../../loader/Loader'
import { customerPricingFilterTodo } from "../../../../redux/slices/inventory/customer_pricing/CustomerPricingFilter"
import Swal from 'sweetalert2'
import { ToastContainer, toast } from 'react-toastify'
import { updateCustomerPricingTodo } from "../../../../redux/slices/inventory/customer_pricing/UpdateCustomerPricing"
import { customerListTodo } from '../../../../redux/slices/sales/customer/CustomerList'
import debounce from "lodash/debounce"

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../../lang/ar/PricingMaster.js').default
} else {
    lang = require('../../../../lang/en/PricingMaster.js').default
}

export const CustomerPricingImport = {
    Form,
    Button,
    Table,
    useFormik,
    FormikProvider,
    FieldArray,
    CustomerPricingSchema,
    SingleSelect,
    DatePicker,
    moment,
    Number,
    TextArea,
    SaveButton,
    useNavigate,
    useLocation,
    useDispatch,
    useSelector,
    subCategoryListTodo,
    brandListTodo,
    Loader,
    customerPricingFilterTodo,
    Swal,
    ToastContainer,
    toast,
    updateCustomerPricingTodo,
    customerListTodo,
    debounce,
    lang
}