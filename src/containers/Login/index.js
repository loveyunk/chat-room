import React from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import AddIcon from '@material-ui/icons/Add';
import ReplyIcon from '@material-ui/icons/Reply';
import {login} from 'api/user';
import styles from './style.less';
import {config, cookie} from 'utils';
import Register from './components/Register';
import Login from './components/Login';
import Guest from './components/Guest';

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

        return (
            <div className={styles.container}>
                <Router>
                    <Paper className={styles.paper} elevation={6}>
                        {show ?
                            <Link to="/register" onClick={this.handleLinkClick}>
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
                        <Route path="/login" component={Login}/>
                        <Route path="/register" component={Register}/>
                        <Route path="/guest" component={Guest}/>
                    </Paper>
                </Router>
            </div>
        );
    }
}

export default LoginForm;
