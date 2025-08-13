import React from 'react';
import AuthRoute from './auth/Auth.Route';


const PublicRoute = () => {
    return [
        ...AuthRoute()
    ]
}

export default PublicRoute;