import React from "react"
import ProfileInfo from "./ProfileInfo/ProfileInfo"
import MyPostsContainer from "./MyPosts/Post/MyPostsContainer"
import {ProfileType} from "../../types/types"

type PropType = {
    savePhoto: (file: File) => void
    isOwner: boolean
    profile: ProfileType | null
    status: string
    saveProfile: (profile: ProfileType) => Promise<any>
    updateStatus: (status: string) => void
}

const Profile: React.FC<PropType> = (props) => {

    return <div>
        <ProfileInfo savePhoto={props.savePhoto}
                     isOwner={props.isOwner}
                     profile={props.profile}
                     status={props.status}
                     saveProfile={props.saveProfile}
                     updateStatus={props.updateStatus} />
        <MyPostsContainer />
    </div>
}

export default Profile