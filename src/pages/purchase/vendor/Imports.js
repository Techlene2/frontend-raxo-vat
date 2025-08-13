import { Link, useNavigate } from "react-router-dom"
import AddButton from "../../../components/buttons/AddButton.jsx"
import LoginBanner from '../../../assets/images/login-banner.png'
import AddVendorForm from "../../../components/forms/prurchase/vendor/AddVendorForm.jsx"
import UpdateVendorForm from "../../../components/forms/prurchase/vendor/UpdateVendorForm.jsx"
import { vendorListTodo } from "../../../redux/slices/purchase/vendor/VendorList.js"
import { useDispatch, useSelector } from 'react-redux'
import { parseLinkHeader } from '@web3-storage/parse-link-header'
import Loader from '../../../components/loader/Loader.jsx'
import { Button, Form, Offcanvas } from 'react-bootstrap'
import Search from '../../../components/buttons/Search.jsx'
import PDF from '../../../components/buttons/PDF.jsx'
import Excel from '../../../components/buttons/Excel.jsx'
import Pagination from '../../../components/pagination/Pagination.jsx'
import DataTable from '../../../components/data_table/DataTable.jsx'
import VendorAction from "../../../action/purchase/vendor/VendorAction.jsx"
import { ToastContainer } from "react-toastify"

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../lang/ar/Vendor.js').default
} else {
    lang = require('../../../lang/en/Vendor.js').default
}

export const VendorImport = {
    Link,
    LoginBanner,
    AddButton,
    AddVendorForm,
    UpdateVendorForm,
    vendorListTodo,
    useNavigate,
    useDispatch,
    useSelector,
    parseLinkHeader,
    Loader,
    Button,
    Form,
    Search,
    PDF,
    Excel,
    Pagination,
    DataTable,
    VendorAction,
    ToastContainer,
    Offcanvas,
    lang

}