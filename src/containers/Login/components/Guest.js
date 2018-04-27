import React from 'react';
import {hashHistory} from 'react-router';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Radio, {RadioGroup} from 'material-ui/Radio';
import {FormControl, FormControlLabel} from 'material-ui/Form';
import {connect} from 'react-redux';
import * as userActions from 'actions/user';
import {bindActionCreators} from 'redux';
import styles from './Guest.less';

import io from 'socket.io-client';

const socket = io();

class Guest extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            sex: '',
            usernameError: false
        };
    }

    handleGuestLogin = () => {

        const {username} = this.state;

        if (username) {
            this.props.setIdentity(1);

            const _this = this;

            const userObj = {
                username
            };

            socket.emit('enter', userObj);

            socket.on('uid', function (uid) {
                _this.props.setUserId(uid);
            });

            this.props.setUserInfo(userObj);
            hashHistory.push('/');
        } else {
            this.setState({
                usernameError: true
            });
        }
    };

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
                <FormControl component="fieldset" required>
                    <RadioGroup
                        aria-label="sex"
                        name="sex"
                        // className={classes.group}
                        value={this.state.sex}
                        onChange={this.handleChange('sex')}
                    >
                        <FormControlLabel value="男" control={<Radio/>} label="男"/>
                        <FormControlLabel value="女" control={<Radio/>} label="女"/>
                    </RadioGroup>
                </FormControl>
                <TextField
                    label="用户名"
                    onChange={this.handleChange('username')}
                    error={usernameError}
                    // onKeyPress={this.handleKeyPress}
                    fullWidth={true}/>
                <div className={styles.buttonWrapper}>
                    <Button variant="raised"
                            color={"primary"}
                            onClick={this.handleGuestLogin}
                            className={styles.loginButton}>
                        ENTER
                    </Button>
                </div>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {
        setUserId: bindActionCreators(userActions.setUserId, dispatch),
        setUserInfo: bindActionCreators(userActions.setUserInfo, dispatch),
        setIdentity: bindActionCreators(userActions.setIdentity, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Guest);
