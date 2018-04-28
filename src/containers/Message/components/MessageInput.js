import React from 'react';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import TextField from 'material-ui/TextField';
import 'rc-color-picker/assets/index.css';
import ColorPicker from 'rc-color-picker';
import styles from './MessageInput.less';
import io from 'socket.io-client';

const socket = io();

class MessageInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            message: '',
            color: '#00acff'
        };
    }

    handleMessage = () => {
        const {message} = this.state;

        if (message) {
            const messageObj = {
                uid: this.props.uid,
                username: this.props.username,
                content: message,
                sex: this.props.sex,
                time: this.getTime(),
                color: this.state.color
            };

            socket.emit('updateMessages', messageObj);

            this.setState({
                message: ''
            });
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

    send = () => {
        this.handleMessage();
    };

    handleEmoji = (val, a, b) => {
        // console.log(val);
        // console.log(a);
        // console.log(b);
        this.setState({
            message: val
        });
    };

    changeHandler = (color) => {
        this.setState({
            color: color.color
        });
    };

    render() {
        return (
            <div className={styles.container}>

                <div className={styles.colorPickerWrapper}>
                    <ColorPicker
                        color={this.state.color}
                        onChange={this.changeHandler}
                    />
                </div>
                <Button className={styles.send} onClick={this.send} variant="fab" color="primary">
                    <Icon>send</Icon>
                </Button>
                <div className={styles.emojiPicker}>
                </div>
                <TextField
                    multiline
                    rows={5}
                    rowsMax={60}
                    placeholder="Type your message..."
                    fullWidth
                    className={styles.textField}
                    onKeyPress={this.handleKeyPress}
                    value={this.state.message}
                    onChange={this.handleChange('message')}
                />
            </div>
        );
    }
}

export default MessageInput;
