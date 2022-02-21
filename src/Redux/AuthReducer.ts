import {ResultCodes, ResultCodesForCaptcha} from "../api/api"
import {FormAction, stopSubmit} from "redux-form"
import {authAPI} from "../api/auth-api"
import {securityAPI} from "../api/security-api"
import {BaseThunkType, InferActionsTypes} from "./ReduxStore"

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null //if null, then captcha is not required
}
export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>

const authReducer = (state = initialState, action: ActionsType):InitialStateType => {
    switch (action.type) {
        case "SN/auth/SET_USER_DATA":
        case "SN/auth/GET_CAPTCHA_URL_SUCCESS":
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state
    }
}

export const actions = {
    setAuthUserData:  (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: "SN/auth/SET_USER_DATA", payload: {userId, email, login, isAuth}} as const),
    getCaptchaUrlSuccess: (captchaUrl: string) => ({
        type: "SN/auth/GET_CAPTCHA_URL_SUCCESS", payload: {captchaUrl}} as const)
}

export const getAuthUserData = (): ThunkType => async (
    dispatch) => {
    let meData = await authAPI.me()
    if (meData.resultCode === ResultCodes.Success) {
        let {id, login, email} = meData.data
        dispatch(actions.setAuthUserData(id, email, login, true))
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: any): ThunkType => async (
    dispatch) => {

    let loginData = await authAPI.login(email, password, rememberMe, captcha)
    if (loginData.resultCode === ResultCodes.Success) {
        dispatch(getAuthUserData())
    } else {
        if (loginData.resultCode === ResultCodesForCaptcha.CaptchaIsRequired) {
            dispatch(getCaptchaUrl())
        }

        let message = loginData.messages.length > 0 ? loginData.messages[0] : "Some error"
        dispatch(stopSubmit('login', {_error: message}))
    }
}

export const getCaptchaUrl = (): BaseThunkType => async (dispatch) => {
    const data = await securityAPI.getCaptchaUrl()
    const captchaUrl = data.url
    dispatch(actions.getCaptchaUrlSuccess(captchaUrl))
}

export const logout = (): BaseThunkType => async (dispatch) => {
    let response = await authAPI.logout()
    if (response.data.resultCode === ResultCodes.Success) {
        dispatch(actions.setAuthUserData(null, null, null, false))
    }
}

export default authReducer
