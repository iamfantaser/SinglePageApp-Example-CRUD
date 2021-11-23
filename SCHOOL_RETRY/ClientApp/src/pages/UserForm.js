
import React, { useState, useEffect } from 'react';
import User from '../stores/models/UserModel';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { UserService, RoleService } from '../serviceManager/servicesProvider';
import '../styles/UserForm.scss';
import { Layout } from '../components/Layout';

export function UserForm() {

    const userlist = "/users";
    // const [UserNew, UserNewState] = useState("/users/new");
    const [user, userState] = useState(null);
    const [errors, errorsState] = useState({});
    const [commonErrors, commonErrorsState] = useState([]);
    const [roleOptions, roleOptionsState] = useState([]);
    const location = useLocation();
    const navigation = useNavigate();
    const params = useParams();

    useEffect(() => {
        console.log(location.pathname);
        if (location.pathname === "/users/edit/" + params.id) {
            UserService.fetch(params.id).then((response) => {
                console.log(typeof response)
                if (response.id && typeof response === 'object') {
                    for (let prop in response) {
                        if (response[prop] === null) {
                            response[prop] = '';
                        }
                    }
                }
                userState(response);
            });
            RoleService.fetchAll().then(response => { roleOptionsState(response) });
        } else {
            RoleService.fetchAll().then(response => {
                let newUser = new User();
                userState(newUser);
                roleOptionsState(response);
            });
        }
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        saveUser(user);
    }
    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
       
        userState(prevStat => ({ ...prevStat, [name]: value }));
    }
    const arrRetunToString = (event) => {
       // User.roles.toString();
    }

    const saveUser = (User) => {
        errorsState({});
        let userUpdates = {};
        userUpdates.age = parseInt(User.age);
        if (User.roles.length > 0) {
           // console.log(typeof User.roles);
            if (typeof User.roles === 'string') {
                if (User.roles.indexOf(",") === -1) {
                    userUpdates.roles = User.roles.split();
                } else {
                    userUpdates.roles = User.roles.split(",");
                }
                userState(Object.assign(User, userUpdates));
            }
        }
        UserService.save(User).then((response) => {
            if (response.title && response.title === "One or more validation errors occurred.") {
                errorsState(response.errors);
            } else if (response && Array.isArray(response)) {
                commonErrorsState(response);
            } else {
                navigation(userlist);
            }
        }).catch(response => {
            console.log(response)
        });
    }

    const _formGroupClass = (field) => {
        var className = "form-group ";
        if (field) {
            className += " has-danger"
        }
        return className;
    }

    if (!user) {
        return <Layout><div> Loading...</ div></Layout>;
    }
    else {
        return <Layout><fieldset className="form-group">
            <legend>{user.ApplicationUserId !== "" ? "Edit User" : "New User"}</legend>
            <form onSubmit={handleSubmit}>
                <div >{commonErrors.map((errors) => <div className="form-control-feedback">{errors.description}</div>)}</div>

                <div className={_formGroupClass(errors.UserName)}>
                    <label htmlFor="inputUserName" className="form-control-label">User Name*</label>
                    <input type="text" autoFocus={true} name="userName" id="inputUserName" value={user.userName} onChange={handleInputChange} className="form-control form-control-danger" required />
                    <div className="form-control-feedback">{errors.UserName}</div>
                </div>
                <div className={_formGroupClass(errors.Roles)}>
                    <label htmlFor="inputRoles" className="form-control-label">Roles</label>
                    <select name="roles" id="inputRoles" value={user.roles.toString()} onFocus={arrRetunToString} onChange={handleInputChange} className="form-control form-control-danger" >
                        <option></option>
                        {roleOptions && roleOptions.map((option) => <option key={option.id}>{option.name}</option>)}
                    </select>
                    <div className="form-control-feedback">{errors.Roles}</div>
                </div>
                <div className={_formGroupClass(errors.LastName)}>
                    <label htmlFor="inputLastName" className="form-control-label">Last Name*</label>
                    <input type="text" name="lastName" id="inputLastName" value={user.lastName} onChange={handleInputChange} className="form-control form-control-danger" required />
                    <div className="form-control-feedback">{errors.LastName}</div>
                </div>
                <div className={_formGroupClass(errors.FirstName)}>
                    <label htmlFor="inputFirstName" className="form-control-label">First Name*</label>
                    <input type="text" name="firstName" id="inputFirstName" value={user.firstName} onChange={handleInputChange} className="form-control form-control-danger" required />
                    <div className="form-control-feedback">{errors.FirstName}</div>
                </div>
                <div className={_formGroupClass(errors.Patronymic)}>
                    <label htmlFor="inputPatronymic" className="form-control-label">Patronymic</label>
                    <input type="text" name="patronymic" id="inputPatronymic" value={user.patronymic} onChange={handleInputChange} className="form-control form-control-danger" />
                    <div className="form-control-feedback">{errors.Patronymic}</div>
                </div>
                <div className={_formGroupClass(errors.Email)}>
                    <label htmlFor="inputEmail" className="form-control-label">Email*</label>
                    <input type="Email" name="email" id="inputEmail" value={user.email} onChange={handleInputChange} className="form-control form-control-danger" required />
                    <div className="form-control-feedback">{errors.Email}</div>
                </div>
                <div className={_formGroupClass(errors.Age)}>
                    <label htmlFor="inputAge" className="form-control-label">Age</label>
                    <input type="number" name="age" id="inputAge" value={user.age} onChange={handleInputChange} className="form-control form-control-danger" />
                    <div className="form-control-feedback">{errors.Age}</div>
                </div>
                <div className={_formGroupClass(errors.Gender)}>
                    <label htmlFor="inputGender" className="form-control-label">Gender*</label>
                    <select name="gender" id="inputGender" value={user.gender} onChange={handleInputChange} className="form-control form-control-danger" required>
                        <option></option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                    </select>
                    <div className="form-control-feedback">{errors.Gender}</div>
                </div>
                <div className={_formGroupClass(errors.UniqId)}>
                    <label htmlFor="inputUniqId" className="form-control-label">Unique Identity*</label>
                    <input type="text" name="uniqId" id="inputUniqId" value={user.uniqId} onChange={handleInputChange} className="form-control form-control-danger" />
                    <div className="form-control-feedback">{errors.UniqId}</div>
                </div>
                <button className="btn btn-lg btn-primary btn-block" type="submit">Save</button>
                <Link className="btn btn-lg btn-light btn-block" to="/users">Cancel</Link>
            </form>
        </fieldset>
        </Layout>
    }
}



