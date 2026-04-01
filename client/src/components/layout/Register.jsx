import React, { useState } from 'react'
import '../css/Register.css'
import axios from 'axios'
import { connect } from 'react-redux'
import { setAlert } from '../actions/alerst'
import PropTypes from 'prop-types'
import { register } from '../actions/auth';
import { Navigate } from 'react-router-dom';


const Register = ({ setAlert, register, isAuthenticated }) => {
    const [formDate, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });


    const { name, email, password, confirmPassword } = formDate;

    const onChange = (e) => {
        setFormData({ ...formDate, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            props.setAlert("Password do not match", "danger");
        }else{
            register({ name, email, password });
        }
    }

    if(isAuthenticated){
        return <Navigate to="/dashboard" />
    }

    return (
        <form className="register-form" onSubmit={e => onSubmit(e)}>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={e => onChange(e)}
                    placeholder="Enter your name"
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={e => onChange(e)}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={e => onChange(e)}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={e => onChange(e)}
                    required
                />
            </div>

            <button type="submit" className="submit-btn">
                Register
            </button>
        </form>
    )
}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
}

const mapSateToProps  = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapSateToProps, { setAlert, register })(Register);