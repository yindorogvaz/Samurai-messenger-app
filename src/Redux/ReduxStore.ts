import {Action, applyMiddleware, combineReducers, createStore} from "redux"
import profileReducer from "./ProfileReducer"
import sidebarReducer from "./SidebarReducer"
import dialogsReducer from "./DialogReducer"
import usersReducer from "./UsersReducer"
import authReducer from "./AuthReducer"
import thunkMiddleware, {ThunkAction} from "redux-thunk"
import { reducer as formReducer } from "redux-form"
import appReducer from "./AppReducer"
import chatReducer from "./chat-reducer";


let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer,
    chat: chatReducer

})

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>


export type InferActionsTypes<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never

export type BaseThunkType<A extends  Action = Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

let store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

// @ts-ignore
window.store = store

export default store