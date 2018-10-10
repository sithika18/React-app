import React, { Component } from 'react';
import { connect } from 'react-redux';
import { doGetUsers, doDeleteUser } from '../actions/Users';


class Users extends Component {

    componentDidMount() {
    const userObj = window.localStorage.getItem('userDetails') && JSON.parse(window.localStorage.getItem('userDetails'));

        if(userObj && userObj.roles !== 'manager')
            this.props.doGetUsers({ url: 'http://10.100.110.120:8080/users' });
        else
            this.props.doGetUsers({ url: 'http://10.100.110.120:8080/manager/users/' + userObj.userId });   
    }

    deletedUser = (id) => {
        if(window.confirm('Are you sure want to Delete ?')){
            this.props.doDeleteUser({url: 'http://10.100.110.120:8080/delete/'+ id});
            setTimeout(() => {
                this.props.doGetUsers({ url: 'http://10.100.110.120:8080/users' });
            }, 1000)
        }
        else 
            return false;
    }

    render() {
        
        const userObj = window.localStorage.getItem('userDetails') && JSON.parse(window.localStorage.getItem('userDetails'));
        let { users } = this.props.UsersData;
        if(users.length)
            users = users.filter((user) => user._id !== userObj._id);
        const userList = users.length ? (
                <table className="highlight responsive-table">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone No</th>
                        <th>Roles</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    { users.map((user) => {
                        return (
                        <tr key={user._id}>
                        <td>{user.name}</td>
                        <td>{user.emailID}</td>
                        <td>{user.phoneNo}</td>
                        <td>{user.roles}</td>
                        <td><i style={{cursor: 'pointer'}} onClick={() => this.deletedUser(user.userId)} className="small material-icons">delete</i></td>
                        </tr>
                        )
                    }) }
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
                    { userList }
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

export default connect(mapToProps, { doGetUsers, doDeleteUser })(Users);