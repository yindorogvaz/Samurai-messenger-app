import React from "react"
import {InjectedFormProps, reduxForm} from "redux-form"
import {createField, GetStringCase, Input} from "../../../Common/FormsControls/FormControls"
import {required} from "../../../../utils/validators/validators"


export type AddPostFormValuesType = {
    newPostText: string
}

type AddPostFormValuesTypeKeys = GetStringCase<AddPostFormValuesType>

const AddNewPostForm: React.FC<InjectedFormProps<AddPostFormValuesType>> = (
    props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField<AddPostFormValuesTypeKeys>("Your post", "newPostText",
                    [required], Input)}
            </div>
            <div>
                <button>add post</button>
            </div>
        </form>
    )
}

export default reduxForm<AddPostFormValuesType>({form: "profile-add-post"})(AddNewPostForm)