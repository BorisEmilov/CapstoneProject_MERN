import React, { Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Login from './components/layout/Login'
import Register from './components/layout/Register'
import { Provider } from 'react-redux'
import store from './store'
import { loadUser } from './components/actions/auth'
import setAuthToken from './utils/setAuthToken'
import Dashboard from './components/dashboard/Dashboard';

if(localStorage.token){
    setAuthToken(localStorage.token);
}

const App = () => {

    useEffect(() => {
        store.dispatch(loadUser());
    }, []);

    return (
        <Provider store={store}>
            <Router>
            <Fragment>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </Fragment>
        </Router>
        </Provider>
        
    )
}

export default App