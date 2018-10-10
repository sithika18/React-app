import React, { Component } from 'react';
import { connect } from 'react-redux';
import { doGetUsers, doDeleteUser, doUpdateUserRole, doUpdateUser } from '../actions/Users';


class Users extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            phoneNo: '',
            id: ''
        };
    }

    componentDidMount() {
        const userObj = window.localStorage.getItem('userDetails') && JSON.parse(window.localStorage.getItem('userDetails'));

        if (userObj && userObj.roles !== 'manager')
            this.props.doGetUsers({ url: 'http://10.100.110.120:8080/users' });
        else
            this.props.doGetUsers({ url: 'http://10.100.110.120:8080/manager/users/' + userObj.userId });
    }

    deletedUser = (id) => {
        if (window.confirm('Are you sure want to Delete ?')) {
            this.props.doDeleteUser({ url: 'http://10.100.110.120:8080/delete/' + id });
            setTimeout(() => {
                this.props.doGetUsers({ url: 'http://10.100.110.120:8080/users' });
            }, 500)
        }
        else
            return false;
    }

    updateRole = (e, id) => {
        const { value } = e.target;
        if (value) {
            if (window.confirm('Do you want to change the role of a User ?')) {
                this.props.doUpdateUserRole({ url: 'http://10.100.110.120:8080/update/' + id, data: { roles: value } });
                setTimeout(() => {
                    this.props.doGetUsers({ url: 'http://10.100.110.120:8080/users' });
                }, 500)
            } else
                return false;
        } else
            return false;
    };

    editUser = (e, id) => {
        var user = this.props.UsersData.users.filter((u) => u.userId === id);
        this.setState({
            name: user[0].name,
            phoneNo: user[0].phoneNo,
            id: user[0].userId
        })
    };

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    updateUser = (e) => {
        var userData = this.state;
        this.props.doUpdateUser({url: 'http://10.100.110.120:8080/update/' + userData.id, data: userData});
        setTimeout(() => {
            this.props.doGetUsers({ url: 'http://10.100.110.120:8080/users' });
        }, 500)
    };


    render() {

        const userObj = window.localStorage.getItem('userDetails') && JSON.parse(window.localStorage.getItem('userDetails'));
        let { users } = this.props.UsersData;
        var userRoles = ['admin', 'manager', 'guest'];
        if (users.length)
            users = users.filter((user) => user._id !== userObj._id);
        const userList = users.length ? (
            <table className="highlight responsive-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone No</th>
                        <th>Roles</th>
                        {
                            userObj && userObj.roles === 'admin' && <React.Fragment><th>Assign Roles</th>
                                <th>Actions</th></React.Fragment>
                        }
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => {
                        return (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.emailID}</td>
                                <td>{user.phoneNo}</td>
                                <td>{user.roles.charAt(0).toUpperCase() + user.roles.slice(1)}</td>
                                {
                                    userObj && userObj.roles === 'admin' &&
                                    <React.Fragment>
                                        <td>
                                            <select className="browser-default" onChange={(e) => this.updateRole(e, user.userId)} name={'gender'}>
                                                <option value="">Select Role</option>
                                                {
                                                    userRoles.filter((r) => r !== user.roles).map((role) => <option key={role} value={role}>{role.charAt(0).toUpperCase() + role.slice(1)}</option>)
                                                }
                                            </select>
                                        </td>
                                        <td><a className="modal-trigger" href="/modal1"><i style={{ cursor: 'pointer' }} onClick={(e) => this.editUser(e, user.userId)} className="small material-icons">edit</i></a>&nbsp;&nbsp;&nbsp;<i style={{ cursor: 'pointer' }} onClick={() => this.deletedUser(user.userId)} className="small material-icons">delete</i></td>
                                    </React.Fragment>

                                }
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        ) : <h4 className={'center'}>Users not found!!</h4>;

        return (
            <div className={'container'}>
                <div>
                    <h4>Users</h4>
                    <hr />
                </div>
                <div className={'card-panel'}>
                    {userList}
                </div>


                <div id="modal1" className="modal">
                    <div className="modal-content">
                        <h4>Edit User</h4>
                        <p>User Details</p>
                        <hr />
                    </div>
                    <div className={'container'}>
                    
                        <div className="row">
                            <div className="input-field col s10">
                                <input type="text" name="name" value={this.state.name} onChange={this.handleChange} className={'validate'} required />
                                <label className={this.state.name ? 'active' : ''} htmlFor="name">Name</label>
                                <span className={'helper-text'} data-error={'Name Required'}></span>
                            </div>
                        </div>
                    <div className="row">
                        <div className="input-field col s10">
                            <input type="text" name="phoneNo" value={this.state.phoneNo} onChange={this.handleChange} className={'validate'} required />
                            <label className={this.state.name ? 'active' : ''} htmlFor="phoneNo">Mobile Number</label>
                            <span className={'helper-text'} data-error={'Mobile No Required'}></span>
                        </div>
                    </div>
                    </div>
                    <div className="modal-footer">
                        <a className="modal-close waves-effect btn waves-green btn-flat">Cancel<i class="small material-icons right">clear</i></a>
                        <a onClick={this.updateUser} className="modal-close waves-effect btn waves-green btn-flat">Update<i class="small material-icons right">check</i></a>
                    </div>
                </div>
            </div>
        )
    }
}

const mapToProps = (state, props) => {
    return {
        UsersData: state.Users
    }
};

export default connect(mapToProps, { doGetUsers, doDeleteUser, doUpdateUserRole, doUpdateUser })(Users);