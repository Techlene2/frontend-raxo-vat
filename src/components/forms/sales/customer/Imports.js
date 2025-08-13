import { Form, Button, Card } from 'react-bootstrap'
import Text from '../../../input_fields/Text'
import SelectStatus from '../../../input_fields/SelectStatus'
import { useFormik, FormikProvider, FieldArray } from 'formik'
import SaveButton from '../../../buttons/SaveButton'
import { AddCustomerSchema } from './ValidationSchema'
import TextArea from '../../../input_fields/TextArea'
import SingleSelect from '../../../input_fields/SingleSelect'
import { useDispatch, useSelector } from 'react-redux'
import { addCustomerTodo } from '../../../../redux/slices/sales/customer/AddCustomer.js'
import { updateCustomerTodo } from '../../../../redux/slices/sales/customer/UpdateCustomer.js'
import { customerDetailsTodo } from '../../../../redux/slices/sales/customer/CustomerDetails.js'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import Loader from '../../../loader/Loader'
import { FaPlus, FaTrash } from 'react-icons/fa'
import { gradeListTodo } from '../../../../redux/slices/sales/grade/GradeList.js'
import { customerTypeListTodo } from '../../../../redux/slices/sales/customer_type/CustomerTypeList.js'
import { departmentListTodo } from '../../../../redux/slices/hr/department/DepartmentList.js'
import { taxTypeListTodo } from '../../../../redux/slices/user_management/tax_type/TaxTypeList.js'
import { currencyListTodo } from '../../../../redux/slices/user_management/currency/CurrencyList.js'
import { customerGroupListTodo } from '../../../../redux/slices/sales/customer_group/CustomerGroupList.js'
import { regionListTodo } from '../../../../redux/slices/sales/region/RegionList.js'
import { cityListTodo } from '../../../../redux/slices/user_management/city/CityList.js'
import { customerCategoryListTodo } from '../../../../redux/slices/sales/customer_category/CustomerCategoryList'
import debounce from "lodash/debounce"

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../../lang/ar/Customer.js').default
} else {
    lang = require('../../../../lang/en/Customer.js').default
}

export const CustomerImport = {
    Text,
    Form,
    Button,
    Card,
    useFormik,
    FormikProvider,
    FieldArray,
    SaveButton,
    AddCustomerSchema,
    TextArea,
    SelectStatus,
    SingleSelect,
    useDispatch,
    useSelector,
    addCustomerTodo,
    updateCustomerTodo,
    customerDetailsTodo,
    useNavigate,
    toast,
    ToastContainer,
    useLocation,
    Loader,
    FaPlus,
    FaTrash,
    gradeListTodo,
    customerTypeListTodo,
    departmentListTodo,
    taxTypeListTodo,
    currencyListTodo,
    customerGroupListTodo,
    regionListTodo,
    cityListTodo,
    customerCategoryListTodo,
    debounce,
    lang
}