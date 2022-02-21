import React from "react"
import style from "./Post.module.css"

type PropsType = {
    message: string
    likesCount: number
}

const Post: React.FC<PropsType> = (props) => {
    return (
        <div className={style.item}>
            <img src="https://otpusk-v-krimu.ru/uploads/posts/2021-06/ostalos-chetyrnadcat-vakansiy-sport-kryma-1.jpg"/>
            { props.message }
            <div>
            <span>like:</span> { props.likesCount }
            </div>
        </div>
)
}

export default Post