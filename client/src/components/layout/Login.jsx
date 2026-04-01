import React, { useState } from 'react'
import '../css/Register.css'
import axios from 'axios'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { login } from '../actions/auth';
import { Navigate } from 'react-router-dom';

const Login = ({ login, isAuthenticated }) => {
  const [formDate, setFormData] = useState({
    email: '',
    password: '',
  });


  const { email, password } = formDate;

  const onChange = (e) => {
    setFormData({ ...formDate, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  }


  if(isAuthenticated){
    return <Navigate to="/dashboard" />
  }

  return (
    <form className="register-form" onSubmit={e => onSubmit(e)}>

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

      <button type="submit" className="submit-btn">
        LogIn
      </button>
    </form>
  )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
}

const mapSateToProps  = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapSateToProps, { login })(Login);