import { Link, useNavigate } from "react-router-dom"
import AddButton from "../../../components/buttons/AddButton.jsx"
import LoginBanner from "../../../assets/images/login-banner.png"
import AddMeasureUnitForm from "../../../components/forms/inventory/measure_unit/AddMeasureUnitForm.jsx"
import UpdateMeasureUnitForm from "../../../components/forms/inventory/measure_unit/UpdateMeasureUnitForm.jsx"
import { useDispatch, useSelector } from 'react-redux'
import { measureUnitListTodo } from "../../../redux/slices/inventory/measure_unit/MeasureUnitList.js"
import Loader from '../../../components/loader/Loader.jsx'
import { Button, Form, Offcanvas } from 'react-bootstrap'
import Search from '../../../components/buttons/Search.jsx'
import PDF from '../../../components/buttons/PDF.jsx'
import Excel from '../../../components/buttons/Excel.jsx'
import Pagination from '../../../components/pagination/Pagination.jsx'
import DataTable from '../../../components/data_table/DataTable.jsx'
import MeasureUnitAction from "../../../action/inventory/measure_unit/MeasureUnitAction.jsx"
import { ToastContainer } from "react-toastify"
import { parseLinkHeader } from '@web3-storage/parse-link-header'

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../lang/ar/MeasureUnit.js').default
} else {
    lang = require('../../../lang/en/MeasureUnit.js').default
}

export const MeasureUnitImport = {
    Link,
    AddButton,
    LoginBanner,
    AddMeasureUnitForm,
    UpdateMeasureUnitForm,
    useNavigate,
    useDispatch,
    useSelector,
    measureUnitListTodo,
    Loader,
    Button,
    Form,
    Search,
    PDF,
    Excel,
    Pagination,
    DataTable,
    MeasureUnitAction,
    ToastContainer,
    parseLinkHeader,
    Offcanvas,
    lang
}