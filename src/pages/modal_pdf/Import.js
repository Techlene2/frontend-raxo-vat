import { Button, Table, Modal } from 'react-bootstrap'
import moment from 'moment'
import { useSelector } from 'react-redux'
import Loader from '../../components/loader/Loader'
import { useReactToPrint } from 'react-to-print'
import { LuPrinter } from "react-icons/lu"

export const ModalPDFImport = {
    Button,
    Table,
    Modal,
    moment,
    useSelector,
    Loader,
    useReactToPrint,
    LuPrinter
}