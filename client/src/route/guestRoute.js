import { Route, Redirect } from 'react-router-dom'
import React from 'react'
import { useSelector } from 'react-redux'


export const GuestRoute = ({ component: Component, ...rest}) => {
    const { loggedIn } = useSelector(state => ({ loggedIn: state.auth.loggedIn }))
    console.log('loggedIn in GuestRoute', loggedIn)

    return(
        <Route
        {...rest}
        render = {props => 
        !loggedIn ? (
            <Component { ...props} />
        ):(<Redirect to={{pathname: "/", state: { from: props.location}}} />)} />
        
    )
}


