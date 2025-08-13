import 'react-perfect-scrollbar/dist/css/styles.css'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { LuCircleDot } from "react-icons/lu"
import FavIcon from '../../assets/images/Rexoapp-Logo.png'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { sidebarTodo } from '../../redux/slices/assets/Sidebar'
import Menu from 'antd/es/menu'
import ConfigProvider from 'antd/es/config-provider'

export const SidebarImport = {
    ConfigProvider,
    Menu,
    PerfectScrollbar,
    LuCircleDot,
    FavIcon,
    useDispatch,
    useSelector,
    Link,
    sidebarTodo,
    useNavigate
}