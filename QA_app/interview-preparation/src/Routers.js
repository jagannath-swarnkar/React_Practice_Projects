import React, { Component } from 'react';
import { BrowserRouter as Router,Switch, Route } from "react-router-dom";

import Login from './Components/Login';
import Signup from './Components/Signup';
import App from './App';

class Routers extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/login' component={Login} />
                    <Route path='/signup' component={Signup} />
                    <Route path='/home' component={App} />
                </Switch>
            </Router>
        )
    }
}



export default Routers;
