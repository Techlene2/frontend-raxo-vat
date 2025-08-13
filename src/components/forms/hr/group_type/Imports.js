import { Form } from 'react-bootstrap'
import Text from '../../../input_fields/Text'
import SaveButton from '../../../buttons/SaveButton'
import SelectStatus from '../../../input_fields/SelectStatus'
import TextArea from '../../../input_fields/TextArea'
import { useFormik } from 'formik'
import { GroupTypeSchema } from './ValidationSchema'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { addGroupTypeTodo } from '../../../../redux/slices/hr/group_type/AddGroupType.js'
import { updateGroupTypeTodo } from '../../../../redux/slices/hr/group_type/UpdateGroupType.js'
import { groupTypeDetailsTodo } from '../../../../redux/slices/hr/group_type/GroupTypeDetails.js'
import { ToastContainer, toast } from 'react-toastify'
import Loader from '../../../loader/Loader'

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../../lang/ar/GroupType.js').default
} else {
    lang = require('../../../../lang/en/GroupType.js').default
}

export const GroupTypeImport = {
    Text,
    TextArea,
    SaveButton,
    Form,
    SelectStatus,
    useFormik,
    GroupTypeSchema,
    useDispatch,
    useSelector,
    useNavigate,
    useLocation,
    addGroupTypeTodo,
    updateGroupTypeTodo,
    groupTypeDetailsTodo,
    ToastContainer,
    toast,
    Loader,
    lang
}
