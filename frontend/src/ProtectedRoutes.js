import React from 'react';
import {Route , Redirect} from 'react-router-dom'

export const SignedInRoutes = ({Component, path,  isAuth, exact, name}) => {
    if(!isAuth) {
        return <Redirect to="/login"/>
    }
    return  <Route 
    path={path} 
    name={name}
    exact={exact} 
    render={props => <Component {...props}/>} /> 
}

export const SignedOutRoutes = ({component, path,  isAuth, exact}) => {
    if(isAuth) {
        return <Redirect to={`/`}/>
    }
    return <Route path={path} component={component} exact={exact}/>
}