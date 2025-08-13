import Text from "../../../input_fields/Text"
import TextArea from "../../../input_fields/TextArea"
import { Form } from 'react-bootstrap'
import { useFormik } from 'formik'
import SaveButton from "../../../buttons/SaveButton"
import SelectStatus from "../../../input_fields/SelectStatus"
import SingleSelect from "../../../input_fields/SingleSelect"
import { GroupSchema } from "./ValidationSchema"
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { groupTypeListTodo } from "../../../../redux/slices/hr/group_type/GroupTypeList.js"
import Loader from '../../../loader/Loader'
import { addGroupTodo } from "../../../../redux/slices/hr/group/AddGroup.js"
import { groupListTodo } from "../../../../redux/slices/hr/group/GroupList.js"
import { groupDetailsTodo } from "../../../../redux/slices/hr/group/GroupDetails.js"
import { updateGroupTodo } from "../../../../redux/slices/hr/group/UpdateGroup.js"
import { ToastContainer, toast } from "react-toastify"

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../../lang/ar/Group.js').default
} else {
    lang = require('../../../../lang/en/Group.js').default
}


export const GroupImport = {
    Text,
    TextArea,
    Form,
    SaveButton,
    useFormik,
    SelectStatus,
    SingleSelect,
    GroupSchema,
    useLocation,
    useNavigate,
    useDispatch,
    useSelector,
    groupTypeListTodo,
    Loader,
    addGroupTodo,
    groupListTodo,
    groupDetailsTodo,
    updateGroupTodo,
    ToastContainer,
    toast,
    lang
}