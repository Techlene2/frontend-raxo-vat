import AddButton from '../../../components/buttons/AddButton.jsx'
import { Link } from 'react-router-dom'
import { Form, Button, Offcanvas, Modal, Tabs, Tab, Badge } from 'react-bootstrap'
import Search from '../../../components/buttons/Search.jsx'
import PDF from '../../../components/buttons/PDF.jsx'
import Excel from '../../../components/buttons/Excel.jsx'
import Pagination from '../../../components/pagination/Pagination.jsx'
import Loader from '../../../components/loader/Loader.jsx'
import { ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { itemListTodo } from '../../../redux/slices/inventory/item/ItemList.js'
import { parseLinkHeader } from '@web3-storage/parse-link-header'
import DataTable from '../../../components/data_table/DataTable.jsx'
import ItemAction from '../../../action/inventory/item/ItemAction.jsx'
import AddItemForm from '../../../components/forms/inventory/item/AddItemForm.jsx'
import UpdateItemForm from '../../../components/forms/inventory/item/UpdateItemForm.jsx'
import NotFoundImage from '../../../assets/images/image_not_available.png'

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../lang/ar/Item.js').default
} else {
    lang = require('../../../lang/en/Item.js').default
}

export const ItemImport = {
    Modal,
    Tabs,
    Tab,
    Badge,
    AddButton,
    Link,
    Form,
    Button,
    Search,
    PDF,
    Excel,
    Pagination,
    Loader,
    ToastContainer,
    useNavigate,
    useDispatch,
    useSelector,
    itemListTodo,
    parseLinkHeader,
    DataTable,
    Offcanvas,
    ItemAction,
    AddItemForm,
    UpdateItemForm,
    NotFoundImage,
    lang
}