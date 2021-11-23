import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthService } from "../serviceManager/servicesProvider";

export const Authorize = ({children,...rest })=>{
    const v = AuthService.isSignedIn();
    return (
            <Route {...rest} render={
                (routeprops) => v ? (children)
                    : (<Navigate to={{ pathname: "/", state: { from: routeprops.location } }} />
                    )}
            />
        );
    
}