
import React, { useState } from 'react';
import { AuthService } from '../serviceManager/servicesProvider';
import {  Navigate, useNavigate } from 'react-router-dom';
import '../styles/login.scss';

export function Login() {
    let navigate = useNavigate();
    const [View, currentViewState] = useState("logIn");
    const [password, passwordState] = useState('');
    const [login, loginState] = useState('');
    const [error_description, errorState] = useState('');
    const isSignedIn = AuthService.isSignedIn();
    const removeDescription = () => errorState('');
    const handleChangePass = (e) => passwordState(e.target.value);
    const handleChangeLog = (e) => loginState(e.target.value);
    const currentView = () => {
        switch (View) {
            case "logIn":
                return (
                    <form onSubmit={handleSubmit}>
                        <h2>Welcome!</h2>
                        <fieldset>
                            <legend>Log In</legend>
                            <ul>

                                <div className={_formGroupClass(error_description)}>{error_description}</div>

                                <li>
                                    <label htmlFor="username">Username:</label>
                                    <input type="text" id="username" value={login} onFocus={removeDescription} onChange={handleChangeLog} required />
                                </li>
                                <li>
                                    <label htmlFor="password">Password:</label>
                                    <input type="password" id="password" value={password} onChange={handleChangePass} required />
                                </li>
                                <li>
                                    <i />
                                    <a onClick={() => currentViewState("PWReset")} href=".">Forgot Password?</a>
                                </li>
                            </ul>
                        </fieldset>
                        <button type="submit">Log In</button>
                    </form>
                )
            case "PWReset":
                return (
                    <form>
                        <h2>Reset Password</h2>
                        <fieldset>
                            <legend>Password Reset</legend>
                            <ul>
                                <li>
                                    <em>A reset link will be sent to your inbox!</em>
                                </li>
                                <li>
                                    <label htmlFor="email">Email:</label>
                                    <input type="email" id="email" required />
                                </li>
                            </ul>
                        </fieldset>
                        <button>Send Reset Link</button>
                        <button type="button" onClick={() => currentViewState("logIn")}>Go Back</button>
                    </form>
                )
            default:
                break;
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        AuthService.signIn(login, password)
            .then((response) => {
                if (response.succeeded === true) {
                    console.log("login", AuthService.isSignedIn());
                    navigate("/users");
                } else {
                    if (response.error_description)
                        errorState(response.error_description);
                }
            })
    }
    //  this.from = this.props.location || { from: { pathname: "/" } };
    if (isSignedIn === true) {
        return (<Navigate to="/users" />);
    } else {
        return (
            <section id="entry-page">
                {currentView()}
            </section>
        )
    }
}


function _formGroupClass(field) {
    var className = "form-control-feedback ";
    if (field) {
        className += " has-danger";
    }
    return className;
}

/*export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentView: "logIn",
            password: '',
            login: '',
            isSignedIn: AuthService.isSignedIn(),
        }
        this.history = this.props.history;
        //  this.from = this.props.location || { from: { pathname: "/" } };
        this.currentView = this.currentView.bind(this);
        this.handleChangePass = this.handleChangePass.bind(this);
        this.handleChangeLog = this.handleChangeLog.bind(this);
        this.removeDescription = this.removeDescription.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    removeDescription() {
        if (this.state.error_description) {
            this.setState({ error_description: '' });
        }
    }
    handleChangePass(e) {
        this.setState({
            password: e.target.value
        });
    }
    handleChangeLog(e) {
        this.setState({
            login: e.target.value
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        AuthService.signIn(this.state.login, this.state.password)
            .then((response) => {
                if (response.succeeded === true) {
                    this.history.push("./users");
                } else {
                    if (response.error_description) this.setState({ error_description: response.error_description })
                }
            })
    }

    changeView = (view) => {
        this.setState({
            currentView: view
        });
    }
    _formGroupClass(field) {
        var className = "form-control-feedback ";
        if (field) {
            className += " has-danger"
        }
        return className;
    }
    componentBefore
    currentView = () => {

        switch (this.state.currentView) {
            case "logIn":
                return (
                    <form onSubmit={this.handleSubmit}>
                        <h2>Welcome!</h2>
                        <fieldset>
                            <legend>Log In</legend>
                            <ul>

                                <div className={this._formGroupClass(this.state.error_description)}>{this.state.error_description}</div>

                                <li>
                                    <label htmlFor="username">Username:</label>
                                    <input type="text" id="username" value={this.state.login} onFocus={this.removeDescription} onChange={this.handleChangeLog} required />
                                </li>
                                <li>
                                    <label htmlFor="password">Password:</label>
                                    <input type="password" id="password" value={this.state.password} onChange={this.handleChangePass} required />
                                </li>
                                <li>
                                    <i />
                                    <a onClick={() => this.changeView("PWReset")} href=".">Forgot Password?</a>
                                </li>
                            </ul>
                        </fieldset>
                        <button type="submit">Log In</button>
                    </form>
                )
            case "PWReset":
                return (
                    <form>
                        <h2>Reset Password</h2>
                        <fieldset>
                            <legend>Password Reset</legend>
                            <ul>
                                <li>
                                    <em>A reset link will be sent to your inbox!</em>
                                </li>
                                <li>
                                    <label htmlFor="email">Email:</label>
                                    <input type="email" id="email" required />
                                </li>
                            </ul>
                        </fieldset>
                        <button>Send Reset Link</button>
                        <button type="button" onClick={() => this.changeView("logIn")}>Go Back</button>
                    </form>
                )
            default:
                break;
        }
    }
    redirect() {
        console.log("login", AuthService.isSignedIn())
        this.props.history.push("./users")
    }
    render() {
        if (this.state.isSignedIn === true) {
            return (<Navigate to="/users" />)
        } else {
            return (
                <section id="entry-page">
                    {this.currentView()}
                </section>
            )
        }
    }
}
*/
