import React from "react"
import MyPosts, {DispatchPropsType, MapPropsType} from "./MyPosts"
import {connect} from "react-redux"
import {actions} from "../../../../Redux/ProfileReducer"
import {AppStateType} from "../../../../Redux/ReduxStore"


const mapStateToProps = (state: AppStateType) => {
    return {
        posts: state.profilePage.posts
    }
}

const MyPostsContainer = connect<MapPropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps, {
    addPost: actions.addPostActionCreator
})(MyPosts)

export default MyPostsContainer