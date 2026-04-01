import React from 'react'
import '../css/Landing.css'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const Landing = ({ isAuthenticated}) => {
  if(isAuthenticated){
    return <Navigate to="/dashboard" />
  }

  return (
    <section>
        <div className='landing-container'>
            <div className='landing-inner'>
                <h1>Developer Page</h1>
                <p>Create developer profile</p>
                <ul className='button-container'>
                    <li><Link to="/login">Sign in</Link></li>
                    <li><Link to="/register">Log in</Link></li>
                </ul>
            </div>
        </div>
    </section>
  )
}

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
})


export default connect(mapStateToProps)(Landing)