import { Link, useNavigate } from "react-router-dom"
import AddButton from "../../../components/buttons/AddButton.jsx"
import LoginBanner from "../../../assets/images/login-banner.png"
import CustomerCategoryPricingForm from "../../../components/forms/inventory/customer_category_pricing/CustomerCategoryPricingForm.jsx"
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../../components/loader/Loader.jsx'
import { Button, Form, Offcanvas } from 'react-bootstrap'
import Search from '../../../components/buttons/Search.jsx'
import PDF from '../../../components/buttons/PDF.jsx'
import Excel from '../../../components/buttons/Excel.jsx'
import Pagination from '../../../components/pagination/Pagination.jsx'
import DataTable from '../../../components/data_table/DataTable.jsx'
import { ToastContainer } from "react-toastify"
import { parseLinkHeader } from '@web3-storage/parse-link-header'
import { customerCategoryPricingListTodo } from "../../../redux/slices/inventory/customer_category_pricing/CustomerCategoryPricingList.js"
import moment from "moment"
import Flatpickr from 'react-flatpickr'

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../lang/ar/PricingMaster.js').default
} else {
    lang = require('../../../lang/en/PricingMaster.js').default
}

export const CustomerCategoryPricingImport = {
    Link,
    AddButton,
    LoginBanner,
    CustomerCategoryPricingForm,
    useNavigate,
    useDispatch,
    useSelector,
    Loader,
    Button,
    Form,
    Search,
    PDF,
    Excel,
    Pagination,
    DataTable,
    ToastContainer,
    parseLinkHeader,
    Offcanvas,
    customerCategoryPricingListTodo,
    moment,
    Flatpickr,
    lang,
}