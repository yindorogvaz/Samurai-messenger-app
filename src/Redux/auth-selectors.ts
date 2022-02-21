import {AppStateType} from "./ReduxStore"


export const selectIsAuth = (state: AppStateType) => {
    return state.auth.isAuth
}

export const currentLogin = (state: AppStateType) => {
    return state.auth.login
}
