import React from 'react'
import { DashboardRouteImport } from './Imports'
const { RoutesMap, Dashboard } = DashboardRouteImport

const DashboardRoute = () => {
    return [
        {
            path: RoutesMap.DASHBOARD.path,
            element: <Dashboard />
        },
        {
            path: RoutesMap.DASHBOARDSECOND.path,
            element: <Dashboard />
        }
    ]
}

export default DashboardRoute;