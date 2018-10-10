import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Home from './components/Home';
import Register from './components/Signup';
import Login from './components/Login';
import NavBar from './components/Nav';
import Dashboard from './components/Dashboard';
import Users from './components/Users';
import PrivateRoute from './components/Private';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <NavBar/>
          <ToastContainer position="top-right"
                              autoClose={1000}
                              hideProgressBar
                              newestOnTop
                              closeOnClick
                              rtl={false}
                              pauseOnVisibilityChange
                              draggable
                              pauseOnHover />
          <Switch>
            <Route exact component={Home} path={'/'} />
            <Route component={Register} path={'/register'} />
            <Route component={Login} path={'/login'} />
            <PrivateRoute component={Dashboard} path={'/dashboard'} />
            <PrivateRoute component={Users} path={'/users'} />
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    )
  }

}

export default App;
