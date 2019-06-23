import React from 'react'
import {Link} from 'react-router-dom'

class Nav extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <Link to="/" className="navbar-brand">Smoke</Link>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to="/explore" className="nav-link">Explore</Link>
                        </li>
                        {
                            this.props.loggedIn &&
                            <li className="nav-item">
                                <Link to="/profile" className="nav-link">My Profile</Link>
                            </li>
                        }
                        {
                            this.props.loggedIn && this.props.user.role === "CURATOR" &&
                            <li className="nav-item">
                                <Link to="/search" className="nav-link">Search</Link>
                            </li>
                        }
                    </ul>
                    <div className="ml-auto mr-2">
                        {
                            this.props.loggedIn &&
                            <ul className="navbar-nav">
                                <li className="nav-item active my-2 mr-1">
                                    <a className="text-white">Welcome {this.props.displayName}</a>
                                </li>
                                <li className="nav-item active">
                                    <a className="col-4 nav-link" onClick={this.props.logout}>
                                        <i className="fa fa-sign-out"></i>
                                    </a>
                                </li>
                            </ul>
                        }
                        {
                            !this.props.loggedIn &&
                            <ul className="navbar-nav">
                                <li className="nav-item active my-2 mr-1">
                                    <Link to="/login" className="text-white">Login / Register</Link>
                                </li>
                            </ul>
                        }
                    </div>
                </div>
            </nav>
        )
    }
}

export default Nav