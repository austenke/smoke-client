import React from 'react'

import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import Login from './Login'
import Profile from './Profile'
import Nav from './Nav'
import Search from './Search'
import Home from './Home'
import Explore from './Explore'
import Details from './Details'

export default class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            waitMessage: false,
            spinner: false
        };

        this.props.refreshJwt();

        setTimeout(() => {
            if (this.props.loading) {
                this.setState({
                    spinner: true
                })
            }
        }, 500);

        setTimeout(() => {
            if (this.props.loading) {
                this.setState({
                    waitMessage: true
                })
            }
        }, 4000);
    }

    render() {
        return (
            <div className="bg-primary contentContainer h-100">
                {
                    this.state.waitMessage &&
                    <div className="text-center text-white w-100 loadingMessage">
                        <h2>Server is starting, this may take a second...</h2>
                    </div>
                }
                {
                    this.state.spinner &&
                    <div id="home-jumbo" className="center main-jumbo jumbotron">
                        <div className="spinner-border home-spinner" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                }
                {
                    !this.props.loading &&
                    <Router basename={'smoke-client'}>
                        <Nav {...this.props} />
                        <Route
                            exact path="/"
                            render={() => <Home {...this.props} />}/>

                        <div className="container mt-2">
                            <div className="container">
                                <Route
                                    exact path="/profile/:profileId"
                                    render={() => <Profile {...this.props} />}/>
                                {
                                    this.props.loggedIn &&
                                    <Route
                                        exact path="/profile"
                                        render={() => <Profile {...this.props} />}/>
                                }
                                {
                                    !this.props.loggedIn &&
                                    <Route
                                        exact path="/profile"
                                        render={() => <Redirect to="/" />}/>
                                }
                                <Route
                                    exact path="/login"
                                    render={() => <Login {...this.props} />}/>
                                <Route
                                    exact path="/explore"
                                    render={() => <Explore {...this.props} />}/>
                                <Route
                                    path="/search"
                                    render={() => <Search {...this.props} />}/>
                                <Route
                                    path="/details"
                                    render={() => <Details {...this.props} />}/>
                            </div>
                        </div>
                    </Router>
                }
            </div>
        )
    }
}

