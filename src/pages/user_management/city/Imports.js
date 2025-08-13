import { Link, useNavigate, useLocation } from "react-router-dom"
import LoginBanner from '../../../assets/images/login-banner.png'
import AddButton from '../../../components/buttons/AddButton.jsx'
import AddCityForm from "../../../components/forms/user_management/city/AddCityForm.jsx"
import UpdateCityForm from "../../../components/forms/user_management/city/UpdateCityForm.jsx"
import { Form, Button, Offcanvas } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import Loader from "../../../components/loader/Loader.jsx"
import DataTable from "../../../components/data_table/DataTable.jsx"
import CityAction from "../../../action/user_management/city/CityAction.jsx"
import { cityListTodo } from "../../../redux/slices/user_management/city/CityList.js"
import Search from '../../../components/buttons/Search.jsx'
import PDF from '../../../components/buttons/PDF.jsx'
import Excel from '../../../components/buttons/Excel.jsx'
import Pagination from '../../../components/pagination/Pagination.jsx'
import { parseLinkHeader } from '@web3-storage/parse-link-header'

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../lang/ar/City.js').default
} else {
    lang = require('../../../lang/en/City.js').default
}

export const CityImport = {
    Link,
    LoginBanner,
    AddButton,
    AddCityForm,
    UpdateCityForm,
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
    CityAction,
    cityListTodo,
    parseLinkHeader,
    Offcanvas,
    lang
}