import { Link, useNavigate } from "react-router-dom"
import AddButton from "../../../components/buttons/AddButton.jsx"
import LoginBanner from "../../../assets/images/login-banner.png"
import AddMeasureUnitTypeForm from "../../../components/forms/inventory/measure_unit_type/AddMeasureUnitTypeForm.jsx"
import UpdateMeasureUnitTypeForm from "../../../components/forms/inventory/measure_unit_type/UpdateMeasureUnitTypeForm.jsx"
import { useDispatch, useSelector } from 'react-redux'
import { measureUnitTypeListTodo } from "../../../redux/slices/inventory/measure_unit_type/MeasureUnitTypeList.js"
import { Form, Button, Offcanvas } from 'react-bootstrap'
import Search from '../../../components/buttons/Search.jsx'
import PDF from '../../../components/buttons/PDF.jsx'
import Excel from '../../../components/buttons/Excel.jsx'
import Pagination from '../../../components/pagination/Pagination.jsx'
import DataTable from '../../../components/data_table/DataTable.jsx'
import Loader from '../../../components/loader/Loader.jsx'
import MeasureUnitTypeAction from "../../../action/inventory/measure_unit_type/MeasureUnitTypeAction.jsx"
import { ToastContainer } from "react-toastify"
import { parseLinkHeader } from '@web3-storage/parse-link-header'

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../lang/ar/MeasureUnitType.js').default
} else {
    lang = require('../../../lang/en/MeasureUnitType.js').default
}

export const MeasureUnitTypeImport = {
    Link,
    AddButton,
    LoginBanner,
    AddMeasureUnitTypeForm,
    UpdateMeasureUnitTypeForm,
    useNavigate,
    useDispatch,
    useSelector,
    measureUnitTypeListTodo,
    Form,
    Button,
    Search,
    PDF,
    Excel,
    Pagination,
    DataTable,
    Loader,
    MeasureUnitTypeAction,
    ToastContainer,
    parseLinkHeader,
    Offcanvas,
    lang
}