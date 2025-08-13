import { Link, useNavigate } from "react-router-dom"
import LoginBanner from '../../../assets/images/login-banner.png'
import AddButton from '../../../components/buttons/AddButton.jsx'
import AddGroupForm from "../../../components/forms/hr/group/AddGroupForm.jsx"
import UpdateGroupForm from "../../../components/forms/hr/group/UpdateGroupForm.jsx"
import { useDispatch, useSelector } from 'react-redux'
import { groupListTodo } from "../../../redux/slices/hr/group/GroupList.js"
import Loader from '../../../components/loader/Loader.jsx'
import { Button, Form, Offcanvas } from 'react-bootstrap'
import Search from '../../../components/buttons/Search.jsx'
import PDF from '../../../components/buttons/PDF.jsx'
import Excel from '../../../components/buttons/Excel.jsx'
import Pagination from '../../../components/pagination/Pagination.jsx'
import DataTable from '../../../components/data_table/DataTable.jsx'
import GroupAction from "../../../action/hr/group/GroupAction.jsx"
import { ToastContainer } from "react-toastify"
import { parseLinkHeader } from '@web3-storage/parse-link-header'

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../lang/ar/Group.js').default
} else {
    lang = require('../../../lang/en/Group.js').default
}

export const GroupImport = {
    Link,
    LoginBanner,
    AddButton,
    AddGroupForm,
    UpdateGroupForm,
    useNavigate,
    useDispatch,
    useSelector,
    groupListTodo,
    Loader,
    Button,
    Form,
    Search,
    PDF,
    Excel,
    Pagination,
    DataTable,
    GroupAction,
    ToastContainer,
    parseLinkHeader,
    Offcanvas,
    lang
}