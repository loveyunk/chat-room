import React from 'react';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Fade from 'material-ui/transitions/Fade';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Radio, {RadioGroup} from 'material-ui/Radio';
import {withStyles} from 'material-ui/styles';
import {FormControl, FormControlLabel} from 'material-ui/Form';

import styles from './Register.less';
import {register} from 'api/user';

import {config} from 'utils';

const {ERR_OK} = config;

const style = theme => ({
    group: {
        flexDirection: 'row'
    }
});

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            usernameError: false,
            passwordError: false,
            open: false,
            sex: '男'
        };
    }

    handleRegister = () => {
        const {username, password, sex} = this.state;
        if (username && password) {
            register({username, password, sex}).then(res => {
                if (res.data.error === ERR_OK) {
                    this.setState({
                        open: true,
                        username: '',
                        password: ''
                    });
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
        this.setState({
            [value]: event.target.value
        });
        if (value === 'username') {
            this.setState({
                usernameError: false
            });
        } else if (value === 'password') {
            this.setState({
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

        const {classes} = this.props;

        return (
            <Fade className={styles.container} in>
                <div>
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        open={this.state.open}
                        autoHideDuration={3000}
                        onClose={this.handleClose}
                        message={'注册成功'}
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
                    <Typography variant="display1" gutterBottom>
                        {/*创建帐户*/}
                    </Typography>
                    <FormControl component="fieldset" required>
                        <RadioGroup
                            aria-label="sex"
                            name="sex"
                            className={classes.group}
                            value={this.state.sex}
                            onChange={this.handleChange('sex')}
                        >
                            <FormControlLabel value="男" control={<Radio/>} label="男"/>
                            <FormControlLabel value="女" control={<Radio/>} label="女"/>
                        </RadioGroup>
                    </FormControl>
                    <TextField
                        className={styles.textField}
                        label="用户名"
                        onChange={this.handleChange('username')}
                        error={this.state.usernameError}
                        onKeyPress={this.handleKeyPress}
                        fullWidth={true}/>
                    <TextField
                        className={styles.textField}
                        label="密码"
                        onChange={this.handleChange('password')}
                        error={this.state.passwordError}
                        type={'password'}
                        onKeyPress={this.handleKeyPress}
                        fullWidth={true}/>
                    <Button variant="raised"
                            color={"primary"}
                            onClick={this.handleRegister}
                            className={styles.registerButton}
                            fullWidth>
                        注册
                    </Button>
                </div>
            </Fade>
        );
    }
}

export default withStyles(style)(Register);
