import React from "react"
import style from "./../Dialogs.module.css"

type PropsType = {
    message: string
}

const Message: React.FC<PropsType> = (props) => {
    return <div className={style.messages}>{props.message}</div>
}

export default Message