import { React } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthService } from "../serviceManager/servicesProvider";

export function Authentication({ children }) {

    const auth = AuthService.isSigned;

    return (auth ? children : < Navigate to = "/" />);
}

/*
function PrivateOutlet() {
    const auth = useAuth();
    return auth ? <Outlet /> : <Navigate to="/login" />;
}

function PrivateRoute({ children }) {
    const auth = useAuth();
    return auth ? children : <Navigate to="/login" />;
}*/