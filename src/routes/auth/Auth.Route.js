import React from 'react'
import { AuthRouteImport } from './Imports'
const { RoutesMap, UserLogin } = AuthRouteImport

const AuthRoute = () => {
    return [
        {
            path: RoutesMap.LOGIN.path,
            element: <UserLogin />
        }
    ]
}

export default AuthRoute;