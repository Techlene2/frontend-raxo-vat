import { Form } from 'react-bootstrap'
import { useFormik } from 'formik'
import SaveButton from '../../../buttons/SaveButton.jsx'
import Text from '../../../input_fields/Text.jsx'
import TextArea from '../../../input_fields/TextArea.jsx'
import Email from '../../../input_fields/Email.jsx'
import SingleSelect from '../../../input_fields/SingleSelect.jsx'
import { AddBusinessAreaWareHouseSchema } from './ValidationSchema.js'
import SelectStatus from '../../../input_fields/SelectStatus.jsx'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import { companyBusinessAreaListTodo } from '../../../../redux/slices/user_management/company_business_area/CompanyBusinessAreaList.js'
import { addWareHouseTodo } from '../../../../redux/slices/user_management/business_area_ware_house/AddWareHouse.js'
import Loader from '../../../loader/Loader.jsx'
import { wareHouseDetailsTodo } from '../../../../redux/slices/user_management/business_area_ware_house/WareHouseDetails.js'
import { updateWareHouseTodo } from '../../../../redux/slices/user_management/business_area_ware_house/UpdateWareHouse.js'

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../../lang/ar/BusinessAreaWareHouse.js').default
} else {
    lang = require('../../../../lang/en/BusinessAreaWareHouse.js').default
}

export const BusinessAreaWareHouseImport = {
    Form,
    useFormik,
    SaveButton,
    Text,
    TextArea,
    Email,
    SingleSelect,
    AddBusinessAreaWareHouseSchema,
    SelectStatus,
    Loader,
    ToastContainer,
    toast,
    useNavigate,
    useLocation,
    useDispatch,
    useSelector,
    companyBusinessAreaListTodo,
    addWareHouseTodo,
    wareHouseDetailsTodo,
    updateWareHouseTodo,
    lang
}