import React, { Component } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';

class Nav extends Component {

    navigateToLogin() {
        window.localStorage.clear();
        this.props.history.push('/login');
    }

    render() {
        const userInfo = window.localStorage.getItem('userDetails') && JSON.parse(window.localStorage.getItem('userDetails'));
        const isUserInfo = userInfo ? userInfo.roles === 'admin' || userInfo.roles === 'manager' ?  <li><NavLink to={'/users'}>Users</NavLink></li> : null : null;
        const userDetails =userInfo ? (
            <React.Fragment>
                <li><NavLink to={'/dashboard'}>Dashboard</NavLink></li>
                {
                    isUserInfo

                }
                &nbsp;<li style={{marginRight: 15, cursor: 'pointer'}} onClick={() => this.navigateToLogin()}>Logout</li>
            </React.Fragment>
        ) : (
                <React.Fragment>
                    <li><NavLink to={'/'}>Home</NavLink></li>
                    <li><NavLink to={'/login'}>Login</NavLink></li>
                    <li><a href={'/register'}>Register</a></li>
                </React.Fragment>
            );

        return (
            <nav>
                <div className="nav-wrapper">
                    &nbsp; &nbsp;
                    {
                        userInfo ? <span className="brand-logo">User Management</span> : <Link to={'/'} className="brand-logo">User Management</Link>
                    }
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        {userDetails}
                    </ul>
                </div>
            </nav>
        )
    }
}

export default withRouter(Nav);