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
        this.state = {
            show: false
        };
    }

    handleLinkClick = () => {
        this.setState((prevState) => ({
            show: !prevState.show
        }));
    };


    render() {

        const {show} = this.state;

        const {children} = this.props;

        return (
            <div className={styles.container}>
                <Paper className={styles.paper} elevation={6}>
                    {show ?
                        <Link to="/login/register" onClick={this.handleLinkClick}>
                            <Button variant="fab" color="secondary" aria-label="add" className={styles.add}>
                                <AddIcon/>
                            </Button>
                        </Link> :
                        <Link to="/login" onClick={this.handleLinkClick}>
                            <Button variant="fab" color="secondary" aria-label="add" className={styles.add}>
                                <ReplyIcon/>
                            </Button>
                        </Link>
                    }
                    {children}
                </Paper>
            </div>
        );
    }
}

export default LoginForm;
