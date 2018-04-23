import React from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

import styles from './Guest.less';

class Guest extends React.Component {

    render() {
        return (
            <div className={styles.container}>
                {/*<Typography variant="display1" gutterBottom>*/}
                {/*游客登录*/}
                {/*</Typography>*/}
                <TextField
                    // className={styles.textField}
                    label="用户名"
                    // onChange={this.handleChange('username')}
                    // error={usernameError}
                    // onKeyPress={this.handleKeyPress}
                    fullWidth={true}/>
                <div className={styles.buttonWrapper}>
                    <Button variant="raised"
                            color={"primary"}
                        // onClick={this.handleLogin}
                            className={styles.loginButton}>
                        ENTER
                    </Button>
                </div>
            </div>
        );
    }
}

export default Guest;
