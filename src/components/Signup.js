import React, { Component } from "react";
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux';
import { doRegister } from '../actions/Register';
import Spinner from '../assets/spinner/Spinner';

class Signup extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dob: new Date()
        };
    }

    onChangeState = (e) => {
        var { name, value } = e.target;
        this.setState({
            [name]: value
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        var signUpData = Object.assign(this.state, this.props.signUpForm.values);
        this.props.doRegister({ data: signUpData, url: 'http://10.100.110.120:8080/registration', history: this.props.history })
    };

    render() {
        const { isLoading } = this.props.register;
        var isLoad = isLoading && <Spinner active={ this.props.register.isLoading } />;
        return (
            <React.Fragment>
                <br /><br />
                <div className="container">
                    <div className="col s12 m5">
                        <div className="card-panel">
                            <form onSubmit={this.handleSubmit}>
                                <div className="container">
                                    <h1>Register</h1>
                                    <p>Please fill in this form to create an account.</p>
                                    <hr />
                                    <div className="row">
                                        <div className="input-field col s10">
                                            <Field component="input" type="text" name="name" className={'validate'} required />
                                            <label htmlFor="name">Name</label>
                                            <span className={'helper-text'} data-error={'Name Required'}></span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col s10" style={{ marginBottom: 10 }}>
                                            <label>Gender</label>
                                            <Field component="select" name={'gender'} className={'validate'}>
                                                <option value="" disabled>Choose your gender</option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                            </Field>
                                            <span className={'helper-text'} data-error={'Choose Gender'}></span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s10">
                                            <input type="text" name={'dob'} onSelect={this.onChangeState} className="datepicker validate" />
                                            <label htmlFor="dob">Date of Birth</label>
                                            <span className={'helper-text'} data-error={'Select Date of Birth'}></span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s10">
                                            <Field component="input" type="text" name="phoneNo" className={'validate'} required />
                                            <label htmlFor="phoneNo">Mobile Number</label>
                                            <span className={'helper-text'} data-error={'Mobile No Required'}></span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s10">
                                            <Field component="input" type="text" name="emailID" className={'validate'} required />
                                            <label htmlFor="emailID">Email</label>
                                            <span className={'helper-text'} data-error={'Invalid Email'}></span>
                                        </div>
                                    </div>
                                        <div className="row">
                                            <div className="input-field col s10">
                                                <Field component="input" type="password" name="password" className={'validate'} required />
                                                <label htmlFor="password">Password</label>
                                                <span className={'helper-text'} data-error={'Password Required'}></span>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s10">
                                                <Field component="input" type="password" name="pswrepeat" className={'validate'} required />
                                                <label htmlFor="psw-repeat">Repeat Password</label>
                                                <span className={'helper-text'} data-error={'Confirm Password Required'}></span>
                                            </div>
                                        </div>
                                    <p>By creating an account you agree to our <a style={{ color: 'dodgerblue' }}>Terms &amp; Privacy</a>.</p>
                                    <div className="clearfix">
                                        <button type="submit" className="btn waves-effect waves-light">Sign Up<i className="material-icons right">send</i></button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                { isLoad }
            </React.Fragment>
        )
    }
}

const signUpForm = reduxForm({
    form: 'register' // a unique identifier for this form
})(Signup);

const mapToProps = (state, props) => {
    return {
        signUpForm: state.form.register,
        register: state.Register
    }
};

export default connect(mapToProps, { doRegister })(signUpForm);