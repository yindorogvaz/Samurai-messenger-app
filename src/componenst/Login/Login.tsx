import React from "react"
import {createField, GetStringCase, Input} from "../Common/FormsControls/FormControls"
import {required} from "../../utils/validators/validators"
import {login} from "../../Redux/AuthReducer"
import style from "../../componenst/Common/FormsControls/FormsControls.module.css"
import {InjectedFormProps, reduxForm} from "redux-form"
import {Redirect} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {AppStateType} from "../../Redux/ReduxStore"

type LoginFormOwnProps = {
    captchaUrl: string | null
}

export const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps>
    & LoginFormOwnProps> = ({handleSubmit,
                                                 error, captchaUrl}) => {
    return (

        <form onSubmit={handleSubmit}>
            {createField<LoginFormValuesTypeKeys>("Email", "email", [required], Input)}
            {createField<LoginFormValuesTypeKeys>("Password", "password",
                [required], Input, {type: "password"})}
            {createField<LoginFormValuesTypeKeys>(undefined, "rememberMe",
                [], Input, {type: "checkbox"}, "remember me")}

            {captchaUrl && <img src={captchaUrl}/>}
            {captchaUrl && createField<LoginFormValuesTypeKeys>("Symbols from image", "captcha",
                [required], Input, {})}

            {error && <div className={style.formSummaryError}>
                {error}
            </div>
            }
            <div>
                <button>Login</button>
            </div>
        </form>

    )
}

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({form: "login"})(LoginForm)


export type LoginFormValuesType = {
    captcha: string
    email: string
    password: string
    rememberMe: boolean
}

type LoginFormValuesTypeKeys = GetStringCase<LoginFormValuesType>


export const LoginPage: React.FC = () => {

    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl)
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)

    const dispatch = useDispatch()

    const onSubmit = (formData: LoginFormValuesType) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha))
    }

    if (isAuth) {
        return <Redirect to={"/profile"}/>
    }

    return <div>
        <h1>LOGIN</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
    </div>
}