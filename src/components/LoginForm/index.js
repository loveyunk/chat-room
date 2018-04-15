import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

const styles = theme => ({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '55vh'
    },
    content: {
        width: '400px'
        // border: '1px solid #efefef'
    },
    form: {
        marginTop: '20px',
        textAlign: 'center'
    }
});

class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            usernameError: false
        };
    }

    handleLogin() {
        if (this.state.username) {

            const userObj = {
                username: this.state.username
            };

            this.props.actions.setUserInfo(userObj);
        } else {
            this.setState({
                usernameError: true
            });
        }
    }

    handleChange = value => event => {
        this.setState({
            [value]: event.target.value,
            usernameError: false
        });
    };

    render() {

        const {classes} = this.props;

        const {usernameError} = this.state;

        return (
            <div className={classes.container}>
                <div className={classes.content}>
                    <AppBar position="static" color="primary">
                        <Toolbar>
                            <Typography variant="title" color="inherit">
                                Chat Room
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <div className={classes.form}>
                        <TextField
                            error={usernameError}
                            label="Input your username"
                            onChange={this.handleChange('username')}
                            fullWidth={true}/>
                        <div className={'mt20'}/>
                        <Button variant="raised"
                                color={"primary"}
                                onClick={this.handleLogin.bind(this)}
                                fullWidth={false}
                                className={classes.button}>
                            ENTER
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

LoginForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginForm);
