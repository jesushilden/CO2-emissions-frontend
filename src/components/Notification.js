import React from 'react'
import '../styles/notification.css'

const Notification = ({ notification }) => {
    if (notification === null) {
        return null
    }
    return (
        <div className={'notification ' + notification.messageClass}>
            {notification.message}
        </div>
    )
}

export default Notification