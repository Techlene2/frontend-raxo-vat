import { Link, useNavigate, useLocation } from "react-router-dom"
import LoginBanner from '../../../assets/images/login-banner.png'
import AddButton from '../../../components/buttons/AddButton.jsx'
import Search from '../../../components/buttons/Search.jsx'
import PDF from '../../../components/buttons/PDF.jsx'
import Excel from '../../../components/buttons/Excel.jsx'
import Pagination from '../../../components/pagination/Pagination.jsx'
import { Form, Button, Offcanvas } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import Loader from "../../../components/loader/Loader.jsx"
import DataTable from "../../../components/data_table/DataTable.jsx"
import { parseLinkHeader } from '@web3-storage/parse-link-header'
import AddBusinessAreaWareHouseForm from "../../../components/forms/user_management/business_area_ware_house/AddBusinessAreaWareHouseForm.jsx"
import UpdateBusinessAreaWareHouseForm from "../../../components/forms/user_management/business_area_ware_house/UpdateBusinessAreaWareHouseForm.jsx"
import { wareHouseListTodo } from "../../../redux/slices/user_management/business_area_ware_house/WareHouseList.js"
import BusinessAreaWareHouseAction from "../../../action/user_management/business_area_ware_house/BusinessAreaWareHouseAction.jsx"

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../lang/ar/BusinessAreaWareHouse.js').default
} else {
    lang = require('../../../lang/en/BusinessAreaWareHouse.js').default
}

export const BusinessAreaWareHouseImport = {
    Link,
    LoginBanner,
    AddButton,
    Search,
    PDF,
    Excel,
    Pagination,
    DataTable,
    ToastContainer,
    Loader,
    useNavigate,
    useLocation,
    useDispatch,
    useSelector,
    parseLinkHeader,
    Form,
    Button,
    Offcanvas,
    AddBusinessAreaWareHouseForm,
    UpdateBusinessAreaWareHouseForm,
    wareHouseListTodo,
    BusinessAreaWareHouseAction,
    lang
}