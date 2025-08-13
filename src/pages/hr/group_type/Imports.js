import { Link, useNavigate } from "react-router-dom"
import LoginBanner from '../../../assets/images/login-banner.png'
import AddButton from '../../../components/buttons/AddButton.jsx'
import AddGroupTypeForm from "../../../components/forms/hr/group_type/AddGroupTypeForm.jsx"
import UpdateGroupTypeForm from "../../../components/forms/hr/group_type/UpdateGroupTypeForm.jsx"
import { useDispatch, useSelector } from 'react-redux'
import { groupTypeListTodo } from "../../../redux/slices/hr/group_type/GroupTypeList.js"
import Loader from '../../../components/loader/Loader.jsx'
import { Button, Form, Offcanvas } from 'react-bootstrap'
import Search from '../../../components/buttons/Search.jsx'
import PDF from '../../../components/buttons/PDF.jsx'
import Excel from '../../../components/buttons/Excel.jsx'
import Pagination from '../../../components/pagination/Pagination.jsx'
import DataTable from '../../../components/data_table/DataTable.jsx'
import GroupTypeAction from "../../../action/hr/group_type/GroupTypeAction.jsx"
import { ToastContainer } from "react-toastify"
import { parseLinkHeader } from '@web3-storage/parse-link-header'


let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../lang/ar/GroupType.js').default
} else {
    lang = require('../../../lang/en/GroupType.js').default
}

export const GroupTypeImport = {
    Link,
    LoginBanner,
    AddButton,
    AddGroupTypeForm,
    UpdateGroupTypeForm,
    useNavigate,
    useDispatch,
    useSelector,
    groupTypeListTodo,
    Loader,
    Button,
    Form,
    Search,
    PDF,
    Excel,
    Pagination,
    DataTable,
    GroupTypeAction,
    ToastContainer,
    parseLinkHeader,
    Offcanvas,
    lang
}