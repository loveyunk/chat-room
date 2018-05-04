import React from 'react';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import TextField from 'material-ui/TextField';
import 'rc-color-picker/assets/index.css';
import ColorPicker from 'rc-color-picker';
import styles from './style.less';
import Upload from 'rc-upload';
import PropTypes from 'prop-types';
import axios from 'axios';
import EmojiPicker from 'emoji-picker-react';
import {withStyles} from 'material-ui/styles';
import {getUploadToken} from 'api/user';
import {getRandomNum} from 'utils';
import * as qiniu from 'qiniu-js'

const style = theme => ({
    root: {
        // height: 'auto',
        // background: 'red'
    }
});

class MessageInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            message: '',
            color: '',
            emoji: null
        };
    }

    handleMessage = (img = '') => {
        const {message} = this.state;

        if (message || img) {
            const messageObj = {
                uid: this.props.uid,
                username: this.props.username,
                content: message,
                sex: this.props.sex,
                time: this.getTime(),
                color: this.state.color,
                img
            };

            if (this.props.env === 3) {
                this.props.updateRobotMessages(messageObj);

                axios.post('/api/openapi/api', {
                    key: "4393e0bac1fd45e78d0992ce45ee0624",
                    info: message
                }).then(res => {
                    this.props.updateRobotMessages({uid: '001', content: res.data.text, sex: '女', username: 'Cally'});
                });

                this.setState({
                    message: ''
                });
                return;
            } else {
                const pathname = this.props.router.location.pathname;

                pathname === '/' ? this.props.socket.emit('updateMessages', messageObj)
                    :
                    this.props.socket.emit('privateMessage', this.props.uid, pathname.slice(9), messageObj);

                this.setState({
                    message: ''
                });
            }
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

        const {classes} = this.props;

        let _this = this;

        const uploaderProps = {

            customRequest({file}) {

                getUploadToken().then(res => {
                    let token = res.data.token;
                    let config = {
                        useCdnDomain: true,
                        region: qiniu.region.z0
                    };

                    let putExtra = {};
                    let observable = qiniu.upload(file, getRandomNum(), token, putExtra, config);

                    let observer = {
                        next(res) {
                            // console.log(1);
                            // console.log(res);
                        },
                        error(err) {
                            // console.log(2);
                            // console.log(err);
                        },
                        complete(res) {
                            // console.log(3);
                            console.log(res);
                            // res.key
                            // http://p87jndy6j.bkt.clouddn.com/61713800
                            _this.handleMessage(`http://p87jndy6j.bkt.clouddn.com/${res.key}`);
                        }
                    };

                    let subscription = observable.subscribe(observer);// 上传开始
                });
            }
        };

        return (
            <div className={styles.container}>
                <div className={styles.toolsWrapper}>
                    <ColorPicker
                        color={this.state.color}
                        onChange={this.changeHandler}
                    />
                    <div className={styles.upload}>
                        <Upload {...uploaderProps}><Icon className={styles.imageIcon}>image</Icon></Upload>
                    </div>
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
                    placeholder="your message..."
                    fullWidth
                    onKeyPress={this.handleKeyPress}
                    value={this.state.message}
                    onChange={this.handleChange('message')}
                />
            </div>
        );
    }
}

// MessageInput.propTypes = {
//     username: PropTypes.String
// };

export default withStyles(style)(MessageInput);
