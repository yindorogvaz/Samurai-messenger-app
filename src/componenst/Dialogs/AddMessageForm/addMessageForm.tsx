import React from "react"
import {maxLengthCreator, required} from "../../../utils/validators/validators"
import {InjectedFormProps, reduxForm} from "redux-form"
import {createField, Textarea} from "../../Common/FormsControls/FormControls"
import {NewMessageFormValuesType} from "../Dialogs"


const maxLength50 = maxLengthCreator(50)
type PropsType = {}

type NewMessageValuesKeysType = Extract<keyof NewMessageFormValuesType, string>

const AddMessageForm: React.FC<InjectedFormProps<NewMessageFormValuesType, PropsType> & PropsType>
    = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField<NewMessageValuesKeysType>("Enter your message", "newMessageBody",
                    [required, maxLength50], Textarea)}
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

export default reduxForm<NewMessageFormValuesType>({form: "dialogs-add-message-form"}) (AddMessageForm)