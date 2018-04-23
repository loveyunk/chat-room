import React from 'react';

class Messages extends React.Component {

    render() {
        const messages = this.props.messages;
        const messageElement = [];

        for (let [index, message] of messages.entries()) {
            let systemMsg = '';

            if (message.hasOwnProperty('type')) {
                switch (message.type) {
                    case 'ENTER_MESSAGE':
                        systemMsg = 'is coming in the room';
                        break;
                    case 'LEAVE_MESSAGE':
                        systemMsg = 'is leaving out of the room';
                        break;
                    default:
                        break;
                }

                messageElement.push(<div key={index}
                                         className="message system-message"> {`${message.username} ${systemMsg}`} </div>);
            } else {
                if (message.uid === this.props.uid) {
                    messageElement.push(
                        <div key={index} className="message message-right">
                            <div className="message-time"> {message.time} </div>
                            <div className="message-content"> {message.content} </div>
                        </div>
                    );
                } else {
                    messageElement.push(
                        <div key={index} className="message message-left">
                            <div className="message-user"> {`${message.username}:`} </div>
                            <div className="message-content"> {message.content} </div>
                            <div className="message-time"> {message.time} </div>
                        </div>
                    );
                }
            }
        }

        return (
            <div>
                {messageElement}
            </div>
        );
    }
}

export default Messages;
