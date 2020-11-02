import { Route, Redirect } from 'react-router-dom'
import React from 'react'
import { useSelector } from 'react-redux'


export const AuthRoute = ({ component: Component, ...rest}) => {
    const { loggedIn } = useSelector(state => ({ loggedIn: state.auth.loggedIn }))
    console.log('loggedIn in AuthRoute', loggedIn)

    return(
        <Route
        {...rest}
        render = {props => 
        loggedIn ? (
            <Component { ...props} />
        ):(<Redirect to={{pathname: "/login", state: { from: props.location}}} />)} />
        
    )
}
