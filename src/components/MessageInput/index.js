import React from 'react';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import TextField from 'material-ui/TextField';
import 'rc-color-picker/assets/index.css';
import ColorPicker from 'rc-color-picker';
import styles from './style.less';
import axios from 'axios';
import EmojiPicker from 'emoji-picker-react';

class MessageInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            message: '',
            color: '',
            emoji: null
        };
    }

    handleMessage = () => {
        const {message} = this.state;

        if (message) {

            axios.post('/api/openapi/api', {
                key: "4393e0bac1fd45e78d0992ce45ee0624",
                info: message
            }).then(res => {
                // console.log(res.data.text);
                this.props.updateMessages({uid: '001', content: res.data.text, sex: '女', username: 'Cally'});
            });

            const messageObj = {
                uid: this.props.uid,
                username: this.props.username,
                content: message,
                sex: this.props.sex,
                time: this.getTime(),
                color: this.state.color
            };

            this.props.socket.emit('updateMessages', messageObj);

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

    changeHandler = (color) => {
        this.setState({
            color: color.color
        });
    };

    myCallback = (val, obj) => {
        console.log(val);
        console.log(obj);
        this.setState({
            emoji: <span className={styles.emoji}>11</span>
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
                <div>
                    {/*<EmojiPicker onEmojiClick={this.myCallback}/>*/}
                </div>
                <Button className={styles.send} onClick={this.send} variant="fab" color="primary">
                    <Icon>send</Icon>
                </Button>
                {/*<div>{this.state.emoji}</div>*/}
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
