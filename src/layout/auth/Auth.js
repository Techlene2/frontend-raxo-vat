import React, { useState } from 'react'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import Header from '../header/Header'
import SidebarLayout from '../sidebar/Sidebar';
import Swal from 'sweetalert2'

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

const Auth = (props) => {
    const [collapsed, setCollapsed] = useState(false)
    const auth = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    var permission = JSON.parse(localStorage.getItem('permission'))

    // const isRouteAuthorized = permission && permission.some(
    //     (item) => item.route === location.pathname
    // );

    if (!auth) {
        return <Navigate to="/login" />
    }
    // else if (!isRouteAuthorized) {
    //     Swal.fire({
    //         title: 'Access Denied',
    //         text: "You do not have permission to access this page. Please contact your Administrator to request access.",
    //         icon: 'error',
    //         showCancelButton: false,
    //         confirmButtonColor: '#121136',
    //         cancelButtonColor: '#EF3D50',
    //         confirmButtonText: 'Ok'
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             navigate(-1)
    //         }
    //     })
    //     return null;
    // }
    else {
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

export default Auth;