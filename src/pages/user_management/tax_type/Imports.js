import { Link, useNavigate } from "react-router-dom"
import LoginBanner from '../../../assets/images/login-banner.png'
import AddButton from '../../../components/buttons/AddButton.jsx'
import AddTaxTypeForm from "../../../components/forms/user_management/tax_type/AddTaxTypeForm.jsx"
import UpdateTaxTypeForm from "../../../components/forms/user_management/tax_type/UpdateTaxTypeForm.jsx"
import { useDispatch, useSelector } from 'react-redux'
import { taxTypeListTodo } from "../../../redux/slices/user_management/tax_type/TaxTypeList.js"
import Loader from '../../../components/loader/Loader.jsx'
import { Button, Form, Offcanvas } from 'react-bootstrap'
import Search from '../../../components/buttons/Search.jsx'
import PDF from '../../../components/buttons/PDF.jsx'
import Excel from '../../../components/buttons/Excel.jsx'
import Pagination from '../../../components/pagination/Pagination.jsx'
import DataTable from '../../../components/data_table/DataTable.jsx'
import TaxTypeAction from "../../../action/user_management/tax_type/TaxTypeAction.jsx"
import { ToastContainer } from 'react-toastify'
import { parseLinkHeader } from '@web3-storage/parse-link-header'

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../lang/ar/TaxType.js').default
} else {
    lang = require('../../../lang/en/TaxType.js').default
}

export const TaxTypeImport = {
    Link,
    LoginBanner,
    AddButton,
    AddTaxTypeForm,
    UpdateTaxTypeForm,
    useNavigate,
    useDispatch,
    useSelector,
    taxTypeListTodo,
    Loader,
    Button,
    Form,
    Search,
    PDF,
    Excel,
    Pagination,
    DataTable,
    TaxTypeAction,
    ToastContainer,
    parseLinkHeader,
    Offcanvas,
    lang
}