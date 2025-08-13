import { Button, Form, Offcanvas } from 'react-bootstrap'
import AddGradeForm from '../../../components/forms/sales/grade/AddGradeForm.jsx'
import UpdateGradeForm from '../../../components/forms/sales/grade/UpdateGradeForm.jsx'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { parseLinkHeader } from '@web3-storage/parse-link-header'
import { gradeListTodo } from '../../../redux/slices/sales/grade/GradeList.js'
import GradeAction from '../../../action/sales/grade/GradeAction.jsx'
import Search from '../../../components/buttons/Search.jsx'
import PDF from '../../../components/buttons/PDF.jsx'
import Excel from '../../../components/buttons/Excel.jsx'
import Loader from '../../../components/loader/Loader.jsx'
import DataTable from '../../../components/data_table/DataTable.jsx'
import Pagination from '../../../components/pagination/Pagination.jsx'
import { ToastContainer } from 'react-toastify'
import AddButton from '../../../components/buttons/AddButton.jsx'

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../lang/ar/Grade.js').default
} else {
    lang = require('../../../lang/en/Grade.js').default
}

export const GradeImport = {
    Offcanvas,
    Link,
    Form,
    Button,
    AddButton,
    AddGradeForm,
    UpdateGradeForm,
    useNavigate,
    useDispatch,
    useSelector,
    parseLinkHeader,
    gradeListTodo,
    GradeAction,
    Search,
    PDF,
    Excel,
    Loader,
    DataTable,
    Pagination,
    ToastContainer,
    lang
}