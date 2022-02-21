import React, {ComponentType} from "react"
import {Redirect} from "react-router-dom"
import {connect} from "react-redux"
import {AppStateType} from "../Redux/ReduxStore"

let mapStateToPropsForRedirect = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
} as MapPropsType)

type MapPropsType = {
    isAuth: boolean
}

export function withAuthRedirect<WCP>(WrappedComponent: ComponentType) {

    const RedirectComponent: React.FC<MapPropsType> = (props) => {
        if (!props.isAuth) return <Redirect to={"/login"}/>

        return <WrappedComponent {...props} />
    }


    let ConnectedAuthRedirectComponent = connect<MapPropsType, {} , WCP, AppStateType>(
        mapStateToPropsForRedirect)(RedirectComponent)

    return ConnectedAuthRedirectComponent

}
