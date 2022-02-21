import {InferActionsTypes} from "./ReduxStore"

export type DialogsType = {
    id: number
    name: string
}

export type MessagesType = {
    id: number
    message: string
}

let initialState = {
    dialogs: [
        {id: 1, name: "Artem"},
        {id: 2, name: "Vlad"},
        {id: 3, name: "Alex"},
        {id: 4, name: "Denis"},
        {id: 5, name: "JuiceX"}
    ] as Array<DialogsType>,
    messages: [
        {id: 1, message: "Hi"},
        {id: 2, message: "yo bro"},
        {id: 3, message: "hahahaha"},
        {id: 4, message: "OMG"},
        {id: 5, message: "Beats"}
    ] as Array<MessagesType>
}

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>

const dialogsReducer = (state = initialState, action: ActionsType):InitialStateType => {
    switch (action.type) {
        case "SN/DIALOGS/SEND_MESSAGE":
            let body = action.newMessageBody
            return {
                ...state,
                messages: [...state.messages, {id: 6, message: body}]
            }
        default:
            return state
    }
}

export const actions = {
    sendMessage: (newMessageBody: string) => ({type: "SN/DIALOGS/SEND_MESSAGE", newMessageBody} as const)
}


export default dialogsReducer