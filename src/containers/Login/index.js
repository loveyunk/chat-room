import React from 'react';
import {Link} from 'react-router';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import AddIcon from '@material-ui/icons/Add';
import ReplyIcon from '@material-ui/icons/Reply';
import {login} from 'api/user';
import styles from './style.less';
import {config, cookie} from 'utils';

class LoginForm extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const {children} = this.props;

        const circleLink = (() => {
            const pathname = this.props.location.pathname;
            if (pathname === '/login') {
                return (
                    <Link to="/login/register">
                        <Button variant="fab" color="secondary" aria-label="add" className={styles.add}>
                            <AddIcon/>
                        </Button>
                    </Link>
                );
            } else if (pathname === '/login/register') {
                return (
                    <Link to="/login">
                        <Button variant="fab" color="secondary" aria-label="reply" className={styles.add}>
                            <ReplyIcon/>
                        </Button>
                    </Link>
                );
            } else if (pathname === '/login/guest') {
                return (
                    <Link to="/login">
                        <Button variant="fab" color="secondary" aria-label="reply" className={styles.add}>
                            <ReplyIcon/>
                        </Button>
                    </Link>
                );
            }
        })();

        return (
            <div className={styles.container}>
                <Paper className={styles.paper} elevation={6}>
                    <div className={styles.logoWrapper}>
                        <img src={config.logo} className={styles.logo} alt="logo"/>
                    </div>
                    {circleLink}
                    {children}
                </Paper>
            </div>
        );
    }
}

export default LoginForm;
