import React, { Component } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';

class Nav extends Component {

    navigateToLogin() {
        window.localStorage.clear();
        this.props.history.push('/login');
    }

    render() {
        const userInfo = window.localStorage.getItem('userDetails') && JSON.parse(window.localStorage.getItem('userDetails'));
        const role = userInfo ? 'Role: ' + userInfo.roles : '';
        const isUserInfo = userInfo ? userInfo.roles === 'admin' || userInfo.roles === 'manager' ? <li><NavLink to={'/users'}>Users</NavLink></li> : null : null;
        const userDetails = userInfo ? (
            <React.Fragment>
                {
                    userInfo && (
                        <React.Fragment>
                            <li><i className="material-icons small">person_outline</i></li>
                            <li className={'tooltipped'} data-position="bottom" data-tooltip={role}>{userInfo.name}</li>
                        </React.Fragment>
                    )
                }
                <li><NavLink to={'/dashboard'}>Dashboard</NavLink></li>
                {
                    isUserInfo

                }
                &nbsp;<li style={{ marginRight: 15, cursor: 'pointer' }} onClick={() => this.navigateToLogin()}>Logout</li>
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
                        userInfo ? <React.Fragment><span className="brand-logo">User Management</span> <span className="brand-logo center">{userInfo.roles.charAt(0).toUpperCase() + userInfo.roles.slice(1)}</span></React.Fragment> : <Link to={'/'} className="brand-logo">User Management</Link>
                       
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