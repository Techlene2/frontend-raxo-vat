import React from 'react';
import DashboardRoute from "./dashboard/Dashboard.Route"
import UserManagementRoute from './user_management/UserManagementRoute';
import PurchaseRoute from './purchase/PurchaseRoute';
import SalesRoute from './sales/SalesRoute';
import HRRoute from './hr/HRRoute';
import InventoryRoute from './inventory/InventoryRoute';

const PrivateRoute = () => {
    return [
        ...DashboardRoute(),
        ...UserManagementRoute(),
        ...PurchaseRoute(),
        ...SalesRoute(),
        ...HRRoute(),
        ...InventoryRoute(),
    ]
}

export default PrivateRoute