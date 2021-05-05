import React, {useContext} from 'react'
import {Route, Redirect} from 'react-router-dom'
import {AuthContext} from '../../contexts/AuthContext'
import Spinner from 'react-bootstrap/Spinner'
import NavBarMenu from '../layout/NavBarMenu'
const ProtectedRoute = ({component: Component, ...rest}) => {
    const {authState: {authLoading, isAuthenticated}} = useContext(AuthContext);
    if(authLoading){
        return (
            <div className="spinner-container">
                <Spinner animation='border' variant='info'/>
            </div>
        )
    }

    return (
        <Route {...rest} render={props => isAuthenticated ? (<>
            <NavBarMenu />
            <Component {...rest} {...props}/>
        </>) : (<Redirect to='/signin'/>)} />
    )
}

export default ProtectedRoute
