import { Form, Button, Offcanvas } from 'react-bootstrap'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import AddButton from '../../../components/buttons/AddButton'
import Search from '../../../components/buttons/Search'
import PDF from '../../../components/buttons/PDF'
import Excel from '../../../components/buttons/Excel'
import AddRoutesForm from '../../../components/forms/sales/routes/AddRoutesForm.jsx'
import UpdateRoutesForm from '../../../components/forms/sales/routes/UpdateRoutesForm.jsx'
import { useDispatch, useSelector } from 'react-redux'
import DataTable from "../../../components/data_table/DataTable"
import Pagination from '../../../components/pagination/Pagination'
import { parseLinkHeader } from '@web3-storage/parse-link-header'
import Loader from "../../../components/loader/Loader"
import { ToastContainer } from 'react-toastify'
import { routesListTodo } from '../../../redux/slices/sales/routes/RoutesList.js'
import RoutesAction from '../../../action/sales/routes/RoutesAction.jsx'
import { routesPositionTodo } from '../../../redux/slices/sales/routes/RoutesPosition.js'

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../lang/ar/Routes.js').default
} else {
    lang = require('../../../lang/en/Routes.js').default
}


export const RoutesImport = {
    Form,
    Button,
    Offcanvas,
    Link,
    AddButton,
    Search,
    PDF,
    Excel,
    AddRoutesForm,
    UpdateRoutesForm,
    useNavigate,
    useLocation,
    useDispatch,
    useSelector,
    DataTable,
    Pagination,
    parseLinkHeader,
    Loader,
    ToastContainer,
    routesListTodo,
    RoutesAction,
    lang,
    routesPositionTodo
}