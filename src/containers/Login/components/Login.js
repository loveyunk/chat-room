import React from 'react';
import {Link, withRouter} from "react-router-dom";
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Avatar from 'material-ui/Avatar';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {connect} from 'react-redux';
import * as userActions from 'actions/user';
import {bindActionCreators} from 'redux';
import {login} from 'api/user';
import styles from './Login.less';
import {config, cookie} from 'utils';

const {ERR_OK} = config;
const {setToken} = cookie;

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            usernameError: false,
            passwordError: false,
            open: false,
            message: ''
        };
    }

    handleLogin = () => {
        const socket = this.props.socket;
        const {username, password} = this.state;

        const _this = this;

        if (username && password) {
            login({username, password}).then(res => {
                if (res.data.error === ERR_OK) {
                    setToken(res.data.token);
                    const {username} = res.data.data;
                    const userObj = {
                        username
                    };
                    socket.on('uid', function (uid) {
                        _this.props.setUserId(uid);
                    });

                    socket.emit('enter', userObj);
                    this.props.setUserInfo(userObj);
                    this.props.history.push("/chatroom");
                } else {
                    this.setState({
                        open: true,
                        message: res.data.message
                    })
                }
            });
        } else {
            username ?
                this.setState({
                    passwordError: true
                }) :
                this.setState({
                    usernameError: true
                });
        }
    };

    handleChange = value => event => {
        if (value === 'username') {
            this.setState({
                [value]: event.target.value,
                usernameError: false
            });
        } else if (value === 'password') {
            this.setState({
                [value]: event.target.value,
                passwordError: false
            });
        }
    };

    handleKeyPress = e => {
        if (e.key === 'Enter') {
            this.handleLogin();
        }
    };

    handleClose = () => {
        this.setState({open: false});
    };

    render() {

        const {usernameError, passwordError} = this.state;

        return (
            <div className={styles.container}>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    open={this.state.open}
                    autoHideDuration={3000}
                    onClose={this.handleClose}
                    message={this.state.message}
                    action={[
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            onClick={this.handleClose}
                        >
                            <CloseIcon/>
                        </IconButton>
                    ]}
                />
                <Avatar src={config.logo} className={styles.avatar}/>
                <TextField
                    className={styles.textField}
                    label="用户名"
                    onChange={this.handleChange('username')}
                    error={usernameError}
                    onKeyPress={this.handleKeyPress}
                    fullWidth={true}/>
                <TextField
                    className={styles.textField}
                    label="密码"
                    onChange={this.handleChange('password')}
                    error={passwordError}
                    type={'password'}
                    onKeyPress={this.handleKeyPress}
                    fullWidth={true}/>
                <Button variant="raised"
                        color={"primary"}
                        onClick={this.handleLogin}
                        className={styles.loginButton}
                        fullWidth={true}>
                    登录
                </Button>
                <div className={styles.divider}>
                    <Typography variant="caption" className={styles.or}>
                        OR
                    </Typography>
                </div>
                <Link to="/guest">
                    <Button fullWidth>游客登录</Button>
                </Link>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        username: state.userInfo.username,
        socket: state.userInfo.socket
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setUserId: bindActionCreators(userActions.setUserId, dispatch),
        setUserInfo: bindActionCreators(userActions.setUserInfo, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
