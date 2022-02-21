import React from "react"
import style from "./MyPosts.module.css"
import Post from "./Post"
import AddPostForm, {AddPostFormValuesType} from "../AddPostForm/AddPostForm"
import {PostsType} from "../../../../types/types"

export type MapPropsType = {
    posts: Array<PostsType>
}

export type DispatchPropsType = {
    addPost: (newPostText: string) => void
}

const MyPosts: React.FC<MapPropsType & DispatchPropsType> = (props) => {

    let postsElements =
        [...props.posts].map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount}/>)

    let onAddPost = (values: AddPostFormValuesType) => {
        props.addPost(values.newPostText)
    }

    return (
        <div className={style.postsBlock}>
            <h3>My posts</h3>
            <AddPostForm onSubmit={onAddPost} />
            <div className={style.posts}>
                {postsElements}
            </div>
        </div>
    )

}

const MyPostsMemorized = React.memo(MyPosts)

export default MyPostsMemorized