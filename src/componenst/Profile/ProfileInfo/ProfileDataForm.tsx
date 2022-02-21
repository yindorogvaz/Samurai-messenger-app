import React from "react"
import {createField, GetStringCase, Input, Textarea} from "../../Common/FormsControls/FormControls"
import {InjectedFormProps, reduxForm} from "redux-form"
import style from "./ProfileInfo.module.css"
import styles from "../../Common/FormsControls/FormsControls.module.css"
import {ProfileType} from "../../../types/types"

type PropsType = {
    profile: ProfileType
}
type ProfileTypeKeys = GetStringCase<ProfileType>


const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = (
    {handleSubmit, profile, error}) => {
    return <form onSubmit={handleSubmit}>
            <div><button>save</button></div>
            {error && <div className={styles.formSummaryError}>
                {error}
            </div>
            }
            <div>
                <b>Full name</b>: {createField<ProfileTypeKeys>("Full name", "fullName", [], Input)}
            </div>
            <div>
                <b>Looking for a job</b>: {createField<ProfileTypeKeys>("", "lookingForAJob", [],
                Input, {type: "checkbox"})}
            </div>
            <div>
                <b>My professional skills</b>:
                {createField("My professional skills", "lookingForAJobDescription",
                    [], Textarea,)}
            </div>
            <div>
                <b>About me</b>:
                {createField("About me", "aboutMe", [], Textarea,)}
            </div>
            <div>
                <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
                return <div key={key} className={style.contact}>
                    <b>{key}: {createField(key,"contacts" + key, [], Input)}</b>
                </div>
            })}
            </div>

        </form>

}

const ProfileDataFormReduxForm = reduxForm<ProfileType, PropsType>({form: "edit-profile"})(ProfileDataForm)

export default ProfileDataFormReduxForm