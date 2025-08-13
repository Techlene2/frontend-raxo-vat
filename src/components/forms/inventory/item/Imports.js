import { Form, Button, Modal } from 'react-bootstrap'
import Text from '../../../input_fields/Text'
import { useFormik } from 'formik'
import TextArea from '../../../input_fields/TextArea.jsx'
import SaveButton from '../../../buttons/SaveButton'
import SingleSelect from '../../../input_fields/SingleSelect'
import SelectStatus from '../../../input_fields/SelectStatus.jsx'
import { toast, ToastContainer } from 'react-toastify'
import Loader from '../../../loader/Loader'
import { ItemSchema, AddItemModal } from './ValidationSchema'
import File from '../../../input_fields/File.jsx'
import Checkbox from '../../../input_fields/Checkbox.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { measureUnitListTodo } from '../../../../redux/slices/inventory/measure_unit/MeasureUnitList.js'
import { taxListTodo } from '../../../../redux/slices/user_management/tax/TaxList.js'
import { categoryListTodo } from '../../../../redux/slices/sales/category/CategoryList.js'
import { groupListTodo } from '../../../../redux/slices/hr/group/GroupList.js'
import { addItemTodo } from '../../../../redux/slices/inventory/item/AddItem.js'
import { itemDetailsTodo } from '../../../../redux/slices/inventory/item/ItemDetails.js'
import { updateItemTodo } from '../../../../redux/slices/inventory/item/UpdateItem.js'
import { LuPlus } from 'react-icons/lu'
import { brandListTodo } from '../../../../redux/slices/inventory/brand/BrandList.js'
import { costCenterListTodo } from '../../../../redux/slices/user_management/cost_center/CostCenterList.js'
import { subCatbyCatTodo } from '../../../../redux/slices/inventory/sub_category/SubCatbyCat.js'
import { colorListTodo } from '../../../../redux/slices/color/ColorList.js'
import { segmentListTodo } from '../../../../redux/slices/segment/SegmentList.js'
import { rackListTodo } from '../../../../redux/slices/rack/RackList.js'
import { addColorTodo } from '../../../../redux/slices/color/AddColor.js'
import { addSegmentTodo } from '../../../../redux/slices/segment/AddSegment.js'
import { addRackTodo } from '../../../../redux/slices/rack/AddRack.js'

let lang
if (localStorage.getItem('lang_key') == 'ar') {
    lang = require('../../../../lang/ar/Item.js').default
} else {
    lang = require('../../../../lang/en/Item.js').default
}

export const ItemImport = {
    Text,
    Form,
    useFormik,
    SaveButton,
    TextArea,
    File,
    SingleSelect,
    SelectStatus,
    Checkbox,
    toast,
    ToastContainer,
    Loader,
    ItemSchema,
    AddItemModal,
    useLocation,
    useNavigate,
    useDispatch,
    useSelector,
    measureUnitListTodo,
    taxListTodo,
    categoryListTodo,
    groupListTodo,
    addItemTodo,
    itemDetailsTodo,
    updateItemTodo,
    Button,
    LuPlus,
    Modal,
    brandListTodo,
    costCenterListTodo,
    lang,
    subCatbyCatTodo,
    colorListTodo,
    segmentListTodo,
    rackListTodo,
    addColorTodo,
    addSegmentTodo,
    addRackTodo
}