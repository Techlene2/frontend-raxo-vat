import { Button, Form, Offcanvas } from 'react-bootstrap'
import AddRegionForm from '../../../components/forms/sales/region/AddRegionForm.jsx'
import UpdateRegionForm from '../../../components/forms/sales/region/UpdateRegionForm.jsx'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { parseLinkHeader } from '@web3-storage/parse-link-header'
import { regionListTodo } from '../../../redux/slices/sales/region/RegionList.js'
import AddButton from '../../../components/buttons/AddButton.jsx'
import Search from '../../../components/buttons/Search.jsx'
import PDF from '../../../components/buttons/PDF.jsx'
import Excel from '../../../components/buttons/Excel.jsx'
import Loader from '../../../components/loader/Loader.jsx'
import DataTable from '../../../components/data_table/DataTable.jsx'
import Pagination from '../../../components/pagination/Pagination.jsx'
import { ToastContainer } from 'react-toastify'
import RegionAction from '../../../action/sales/region/RegionAction.jsx'

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../lang/ar/Region.js').default
} else {
    lang = require('../../../lang/en/Region.js').default
}

export const RegionImport = {
    Offcanvas,
    Link,
    Form,
    Button,
    Search,
    PDF,
    Excel,
    Loader,
    DataTable,
    Pagination,
    ToastContainer,
    AddButton,
    AddRegionForm,
    UpdateRegionForm,
    useNavigate,
    useDispatch,
    useSelector,
    parseLinkHeader,
    RegionAction,
    regionListTodo,
    lang
}