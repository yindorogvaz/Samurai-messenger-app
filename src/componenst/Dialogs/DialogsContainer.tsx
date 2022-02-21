import React, {ComponentType} from "react"
import {connect} from "react-redux"
import {withAuthRedirect} from "../../hoc/withAuthRedirect"
import Dialogs from "./Dialogs"
import {compose} from "redux"
import {actions} from "../../Redux/AppReducer"
import {AppStateType} from "../../Redux/ReduxStore"

let mapStateToProps = (state: AppStateType) => {
    return {
        dialogsPage: state.dialogsPage
    }
}

export default compose<ComponentType>(
    connect(mapStateToProps, {...actions}),
    withAuthRedirect
)(Dialogs)