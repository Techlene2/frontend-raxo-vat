import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Header from './layout/header/Header'
import SidebarLayout from './layout/sidebar/Sidebar';

const useAuth = () => {
    let user = localStorage.getItem('user_token');

    if (user) {
        try {
            if (user) {
                return user;

            }
        } catch (error) {
            return false
        }
    } else {
        return false
    }
}


const ProtectedRoutes = (props) => {
    const { collapsed, setCollapsed } = props
    const auth = useAuth()
    if (!auth) {
        return <Navigate to="/login" />
    } else {
        return (
            <div>
                <Header collapsed={collapsed} setCollapsed={setCollapsed} />
                <SidebarLayout collapsed={collapsed} setCollapsed={setCollapsed} />
                <div className={collapsed ? "outlet_collapsed" : "outlet_not_collapsed"}>
                    <Outlet />
                </div>
            </div>
        )
    }
}


export default ProtectedRoutes;
