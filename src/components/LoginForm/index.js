import React from 'react';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
// import {LinearProgress} from 'material-ui/Progress';
import {login} from 'api/user';
import io from 'socket.io-client';

import styles from './style.less';

class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            usernameError: false
        };
    }

    handleLogin() {
        // $('form').submit(function(){
        //     socket.emit('chat message', $('#m').val());
        //     $('#m').val('');
        //     return false;
        // });
        // socket.on('chat message', function(msg){
        //     $('#messages').append($('<li>').text(msg));
        // });
        // io.emit('chat message', '');
        var socket = io('http://localhost:3000/');
        // login({username: 'tom', password: '123'}).then(res => {
        //     console.log(res);
        // });
        // if (this.state.username) {
        //
        //     const userObj = {
        //         username: this.state.username
        //     };
        //
        //     this.props.actions.setUserInfo(userObj);
        // } else {
        //     this.setState({
        //         usernameError: true
        //     });
        // }
    }

    handleChange = value => event => {
        this.setState({
            [value]: event.target.value,
            usernameError: false
        });
    };

    render() {

        const {usernameError} = this.state;

        return (
            <div className={styles.container}>
                <Paper className={styles.paper} elevation={4}>
                    {/*<LinearProgress />*/}
                    <Typography variant="title" color="inherit">
                        Chat Room
                    </Typography>
                    <TextField
                        className={styles.textField}
                        error={usernameError}
                        label="请输入您的用户名"
                        onChange={this.handleChange('username')}
                        fullWidth={true}/>
                    <TextField
                        className={styles.textField}
                        error={usernameError}
                        label="请输入您密码"
                        onChange={this.handleChange('password')}
                        fullWidth={true}/>
                    <div className={'mt30'}/>
                    <div className={styles.buttonWrapper}>
                        <Button variant="raised"
                                color={"primary"}
                                onClick={this.handleLogin.bind(this)}
                                fullWidth={false}
                                className={'button'}>
                            登录
                        </Button>
                        <Button variant="raised"
                                color={"primary"}
                                // onClick={this.handleLogin.bind(this)}
                                fullWidth={false}
                                className={'button'}>
                            注册
                        </Button>
                    </div>
                </Paper>
            </div>
        );
    }
}

export default LoginForm;
