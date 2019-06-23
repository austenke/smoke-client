import React from 'react'
import { Redirect } from 'react-router-dom'

export default class Login extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            login: true,
            spacing: "my-5",
            email: "",
            password: "",
            displayName: "",
            role: "LISTENER"
        };
    }

    emailChanged = (event) => {
        this.setState({
            email: event.target.value
        })
    };

    displayNameChanged = (event) => {
        this.setState({
            displayName: event.target.value
        })
    };

    passwordChanged = (event) => {
        this.setState({
            password: event.target.value
        })
    };

    roleChanged = (event) => {
        this.setState({
            role: event.target.value
        })
    };

    toggleLogin = () => {
        const spacing = this.state.login? "my-4" : "my-5";

        this.setState({
            login: !this.state.login,
            spacing: spacing
        })
    };

    login = () => {
        if (this.state.login) {
            console.log("Logging in");
            this.props.login(this.state.email, this.state.password);
        } else {
            console.log("Registering");
            this.props.register(this.state.email,
                                this.state.displayName,
                                this.state.password,
                                this.state.role);
        }
    };

    render() {
        return(
            <div className={`row align-middle ${this.state.spacing}`}>

                {
                    this.props.loggedIn &&
                    <Redirect to="/" />
                }

                <div className="jumbotron bg-dark text-white border col-sm-12 offset-sm-0 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                    <h1 className="display-6 text-center">
                        {
                            this.state.login && "Sign in"
                        }
                        {
                            !this.state.login && "Register"
                        }
                    </h1>
                    <form>
                        <div className="form-group">
                            <label htmlFor="email" className="col-sm-2 col-form-label">
                                Email
                            </label>
                            <div className="col-sm-12">
                                <input
                                    className="loginInput form-control" id="email" placeholder="foo@gmail.com"
                                    value={this.state.email}
                                    onChange={this.emailChanged}
                                />
                            </div>
                        </div>
                        {
                            !this.state.login &&
                            <div className="form-group">
                                <label htmlFor="displayName" className="col-sm-2 col-form-label">
                                    Username
                                </label>
                                <div className="col-sm-12">
                                    <input
                                        className="loginInput form-control" id="displayName" placeholder="Alice"
                                        value={this.state.displayName}
                                        onChange={this.displayNameChanged}
                                    />
                                </div>
                            </div>
                        }
                        <div className="form-group">
                            <label htmlFor="password" className="col-sm-2 col-form-label">
                                Password
                            </label>
                            <div className="col-sm-12">
                                <input type="password" className="loginInput form-control wbdv-password-fld"
                                       id="password" placeholder="123qwe#$%"
                                       value={this.state.password}
                                       onChange={this.passwordChanged}
                                />
                            </div>
                        </div>
                        {
                            !this.state.login &&
                            <div className="form-group">
                                <label htmlFor="role" className="col-sm-2 col-form-label">
                                    Role
                                </label>
                                <div className="col-sm-12">
                                    <select className="form-control" id="role"
                                            value={this.state.role}
                                            onChange={this.roleChanged}>
                                        <option value="LISTENER">Listener</option>
                                        <option value="CURATOR">Curator</option>
                                    </select>
                                </div>
                            </div>
                        }
                        <div className="form-group">
                            <label className="col-sm-2 col-form-label"/>
                            <div className="col-sm-12">
                                <button type="button" className="btn btn-primary btn-block"
                                        onClick={() => this.login()}>
                                    {
                                        this.state.login && "Sign in"
                                    }
                                    {
                                        !this.state.login && "Register"
                                    }
                                </button>
                                <div className="row">
                                    <div className="col-6">
                                        <a href="#" className="float-left registerTag text-white"
                                           onClick={() => this.toggleLogin()}>
                                            {
                                                this.state.login && "Register"
                                            }
                                            {
                                                !this.state.login && "Sign in"
                                            }
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

}