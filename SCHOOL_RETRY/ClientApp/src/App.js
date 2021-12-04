import React from 'react';
import { List } from './pages/List';
import { Login } from './pages/Login';
import { UserForm } from './pages/UserForm';
import UserTestList from './pages/examination/UsersTestList';

import Roles from './pages/Roles';

/*  ReactRouter v4
 *  <Switch>
       <Route exact path='/' element={Login} />
*       <Authorize exact path='/users'><List /></Authorize>
       <Authorize exact path='/users/edit/:id'><Route render={(routeProps) => (<UserForm {...routeProps} />)} /></ Authorize>
       <Authorize exact path='/users/create'><Route render={(routeProps) => (<UserForm {...routeProps} />)} /></Authorize>
       <Authorize exact path='/roles'><Roles /></Authorize>
       <Authorize exact path='/tests'><Route render={(routeProps) => (<UserTestList {...routeProps} />)} /></Authorize>
       <Authorize exact path='/tests/edit/:id'><Route render={(routeProps) => (<UsersTestEdit {...routeProps} />)} /></Authorize>
       <Authorize exact path='/tests/create'><Route render={(routeProps) => (<UsersTestEdit {...routeProps} />)} /></Authorize>
       <Route exact path='*' element={NotFoundPage} />
   </Switch>
 */

import {
    Routes,
    Route,
    Link,
    Navigate,
    Outlet
} from "react-router-dom";
import { AuthService } from './serviceManager/servicesProvider';
import NotFoundPage from './pages/NotFoundPage';
import UsersTestEdit from './pages/examination/UsersTestEdit';

export default function App() {
    return (
        <div>
            <Routes>
                <Route path="/users" element={<PrivateRoute><List /></PrivateRoute>} />
                <Route path='/users/edit/:id' element={<PrivateRoute><UserForm /></PrivateRoute>} />
                <Route exact path='/users/create' element={<PrivateRoute><UserForm /></PrivateRoute>} />
                <Route exact path='/roles' element={<PrivateRoute><Roles /></PrivateRoute>} />
                <Route exact path='/tests' element={<PrivateRoute><UserTestList /></PrivateRoute>} />
                <Route exact path='/tests/edit/:id' element={<PrivateRoute><UsersTestEdit/> </PrivateRoute>} />
                <Route exact path='/tests/create' element={<PrivateRoute><UsersTestEdit /></PrivateRoute>} />
                <Route path="/" element={<Login />} />
                <Route exact path='*' element={<NotFoundPage />} />
            </Routes>
        </div>
    );
}


function PrivateRoute({ children }) {
    const auth = useAuth();
    return auth ? children : <Navigate to="/" />;
}

function useAuth() {
    console.log(AuthService.isSignedIn());
    return AuthService.isSignedIn();
}
/*
function MyMenu() {
    return (
        <nav>
            <Link to="/">Public</Link>
            {" | "}
            <Link to="/users">Private Using Nested</Link>
            {" | "}
            <Link to="/dashboard">Private Using Outlet</Link>
        </nav>
    );
    <Route path="/dashbord" element={<PrivateOutlet />}>
                    <Route path="" element={<Private />} />
                </Route>
   /*function PrivateOutlet() {
    const auth = useAuth();
    return auth ? <Outlet /> : <Navigate to="/" />;
    }
}
*/

