import React from 'react';
import { useNavigate } from 'react-router';
import { NavItem, NavLink } from 'reactstrap';
import { AuthService } from "../serviceManager/servicesProvider";

export function AuthButton() {
    const navigate = useNavigate();
    const logIn = () => navigate('/');
    const logOut = () => {
        navigate('/');
        AuthService.signOut()
    }

    return (AuthService.isSignedIn() ? (
        <NavItem>
            <NavLink className="text-dark hover" onClick={logOut}>LogOut</NavLink>
        </NavItem>
    ) : <NavItem >
        <NavLink className="text-dark hover" onClick={logIn}>Log in</NavLink>
    </NavItem>
    )
}
/*
export class AuthButton extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);
        this.logIn = this.logIn.bind(this);
    }
    logIn() {
        this.props.history.push('/');
    }
    logOut() {
        this.props.history.push('/');
        AuthService.signOut()
    }
    render() {
        return AuthService.isSignedIn() ? (
            <NavItem>
                <NavLink className="text-dark hover" onClick={this.logOut}>LogOut</NavLink>
            </NavItem>
        ) : <NavItem >
            <NavLink className="text-dark hover" onClick={this.logIn}>Log in</NavLink>
        </NavItem>
    }
}*/