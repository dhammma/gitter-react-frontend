import React from 'react'

const keyHandler = (sendMessage, roomId) => (event) => {
    if (event.keyCode === 13 && !event.shiftKey) {
        event.preventDefault()
        event.target.value = ''
        sendMessage(roomId)
    }
}

const editHandler= (editMessage, roomId) => (event) => {
    const text = event.target.value
    editMessage(roomId, text)
}

const MessageBox = ({sendMessage, editMessage, roomId, text}) => (
    <div className="message-box">
        <textarea
            className="message-input"
            placeholder="Write a message..."
            onKeyDown={keyHandler(sendMessage, roomId)}
            onChange={editHandler(editMessage, roomId)}
            default={text}
        />
    </div>
)

export default MessageBox