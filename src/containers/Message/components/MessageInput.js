import React from 'react';
import TextField from 'material-ui/TextField';

import styles from './MessageInput.less';

class MessageInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            message: ''
        };
    }

    handleMessage = () => {
        const {message} = this.state;

        if (message) {
            const messageObj = {
                uid: this.props.uid,
                username: this.props.username,
                content: message,
                time: this.getTime()
            };

            this.props.socket.emit('updateMessages', messageObj);
        }
    };

    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.handleMessage();
        }
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    getTime() {
        const date = new Date();
        let [hour, minute] = [date.getHours(), date.getMinutes()];
        hour = hour < 10 ? '0' + hour : hour;
        minute = minute < 10 ? '0' + minute : minute;

        return hour + ':' + minute
    }

    render() {
        return (
            <div className={styles.container}>
                <TextField
                    // label="Multiline"
                    multiline
                    rows={5}
                    rowsMax={60}
                    fullWidth
                    onKeyPress={this.handleKeyPress}
                    // value={this.state.multiline}
                    onChange={this.handleChange('message')}
                />
            </div>
        );
    }
}

export default MessageInput;
