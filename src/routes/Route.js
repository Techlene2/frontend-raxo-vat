import React from 'react';
import PublicLayout from '../layout/public/Public.Layout';
import PublicRoute from './Public.Route';
import PrivateLayout from '../layout/main/Private.Layout';
import PrivateRoute from './Private.Route';


const Routes = () => {
    return [
        {
            element: <PublicLayout />,
            children: [
                ...PublicRoute(),
            ]
        },
        {
            element: <PrivateLayout />,
            children: [
                ...PrivateRoute(),
            ]
        }
    ]
}

export default Routes ;