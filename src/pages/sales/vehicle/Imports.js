import { Link, useNavigate, useLocation } from "react-router-dom"
import LoginBanner from '../../../assets/images/login-banner.png'
import AddButton from '../../../components/buttons/AddButton'
import AddVehicleForm from "../../../components/forms/sales/vehicle/AddVehicleForm.jsx"
import UpdateVehicleForm from "../../../components/forms/sales/vehicle/UpdateVehicleForm.jsx"
import { Form, Button, Offcanvas } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import VehicleAction from "../../../action/sales/vehicle/VehicleAction.jsx"
import { vehicleListTodo } from "../../../redux/slices/sales/vehicle/VehicleList.js"
import Loader from "../../../components/loader/Loader"
import DataTable from "../../../components/data_table/DataTable"
import Search from '../../../components/buttons/Search'
import PDF from '../../../components/buttons/PDF'
import Excel from '../../../components/buttons/Excel'
import Pagination from '../../../components/pagination/Pagination'
import { parseLinkHeader } from '@web3-storage/parse-link-header'


let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../lang/ar/Vehicle.js').default
} else {
    lang = require('../../../lang/en/Vehicle.js').default
}

export const VehicleImport = {
    Link,
    LoginBanner,
    AddButton,
    AddVehicleForm,
    UpdateVehicleForm,
    DataTable,
    Search,
    PDF,
    Excel,
    Pagination,
    Button,
    Form,
    ToastContainer,
    Loader,
    useNavigate,
    useLocation,
    useDispatch,
    useSelector,
    VehicleAction,
    vehicleListTodo,
    parseLinkHeader,
    Offcanvas,
    lang
}