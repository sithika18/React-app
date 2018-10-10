import React, { Component } from 'react';

class Dashboard extends Component {

    componentWillMount() {
        this.user = window.localStorage.getItem('userDetails') && JSON.parse(window.localStorage.getItem('userDetails'));
    }
    render() {
        return (
            <React.Fragment>
                <h4>Welcome, {this.user.name}</h4><br />
                <div className="col s6">
                    <div className="container">
                        <div className="card-panel">
                            <p>Name: { this.user.name }</p>
                            <p>Gender: { this.user.gender }</p>
                            <p>Date of Birth: { this.user.dob }</p>
                            <p>Role: { this.user.roles }</p>
                            <p>Email ID: { this.user.emailID }</p>
                            <p>Phone No: { this.user.phoneNo }</p>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Dashboard;