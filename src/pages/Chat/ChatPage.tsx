import React, {useEffect, useRef, useState} from "react"
import {ChatMessageAPIType} from "../../api/chat-api";
import {useDispatch, useSelector} from "react-redux";
import {sendMessage, startMessagesListening} from "../../Redux/chat-reducer";
import {AppStateType} from "../../Redux/ReduxStore";


const ChatPage: React.FC = () => {
    return (
        <div>
            <Chat/>
        </div>
    )
}


const Chat: React.FC = () => {

    const dispatch = useDispatch()

    const status = useSelector((state: AppStateType) => state.chat.status)

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(startMessagesListening())
        }
    }, [])


    return (
        <div>
            {status === 'error' && <div>Some error occured. Please refresh the page </div> }

                    <Messages/>
                    <AddMessageForm/>
        </div>
    )
}

const Messages: React.FC = () => {
    const messages = useSelector((state: AppStateType) => state.chat.messages)
    const messagesAnchorRef = useRef<HTMLDivElement>(null)
    const [isAutoScroll,setIsAutoScroll] = useState(false)


    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget

        if(Math.abs( (element.scrollHeight - element.scrollTop) - element.clientHeight) < 300) {
            !isAutoScroll && setIsAutoScroll(true)
        } else {
            isAutoScroll && setIsAutoScroll(false)
        }
    }

    useEffect( () => {
        if (isAutoScroll) {
            messagesAnchorRef.current?.scrollIntoView({behavior: "smooth"})
        }
    },[messages])


    return (
        <div style={{height: '500px', overflow: 'auto'}} onScroll={scrollHandler}>
            {messages.map((m, index) => <Message key={m.id} message={m}/>)}
            <div ref={messagesAnchorRef}></div>
        </div>
    )
}


const Message: React.FC<{ message: ChatMessageAPIType }> = React.memo( ({message}) => {

    return (
        <div>
            <img src={message.photo}/>
            {message.userName}
            {message.message}
            <hr/>
        </div>
    )
})


const AddMessageForm: React.FC = () => {
    const [message, setMessage] = useState('')
    const dispatch = useDispatch()

    const status = useSelector((state: AppStateType) => state.chat.status)

    const sendMessageHandler = () => {
        if (!message) {
            return
        }
        dispatch(sendMessage(message))
        setMessage('')
    }

    return (
        <div>
            <div>
                <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
            </div>
            <div>
                <button disabled={status !== 'ready'} onClick={sendMessageHandler}>SEND</button>
            </div>
        </div>
    )
}


export default ChatPage