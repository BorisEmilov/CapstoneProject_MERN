import React, { Fragment } from 'react'
import '../css/Navbar.css'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logout } from '../actions/auth';

const Navbar = ({ logout, auth: { isAuthenticated, loading } }) => {

  const authLinks = (
    <ul className='list-container'>
        <li><Link to="/dashboard">Dashboard</Link></li>
    </ul>
  );

  const guestLinks = (
    <ul className='list-container'>
        <li><Link to="/">HOME</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/login">Login</Link></li>
    </ul>
  );

  return (
    <nav className='nav-container'>
      {
        !loading && (<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>)
      }
    </nav>
  )
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapSateToProps = state => ({
  auth: state.auth,
})

export default connect(mapSateToProps, { logout })(Navbar)