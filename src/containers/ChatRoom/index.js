import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Link} from "react-router-dom";
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Message from 'containers/Message';
import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles';
import lightBlue from 'material-ui/colors/cyan';
import {connect} from 'react-redux';
import * as userActions from 'actions/user';
import {bindActionCreators} from 'redux';
import Sidebar from 'components/Sidebar';
import styles from './style.less';

const theme = createMuiTheme({
    palette: {
        primary: {
            // light: lightBlue[50],
            main: lightBlue[400],
            // dark: lightBlue[50],
            contrastText: lightBlue[50]
        }
    }
});

class ChatRoom extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 0
        };
    }

    componentDidMount() {
        const socket = this.props.socket;

        // 提醒有用户加入
        socket.on('enterUser', username => {
            this.props.updateMessages(username);
        });

        // 更新在线用户列表
        socket.on('updateUserList', userList => {
            this.props.updateUserList(userList);
        });

        // 更新消息列表
        socket.on('updateMessages', messages => {
            this.props.updateMessages(messages);
        });
    }

    handleChange = (event, value) => {
        this.setState({value});
    };

    render() {

        const {value} = this.state;

        return (
            <div className={styles.container}>
                <MuiThemeProvider theme={theme}>
                    <AppBar
                        className={styles.appBar}
                        position="absolute"
                    >
                        <Toolbar disableGutters={!this.state.open}>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                // onClick={this.handleDrawerOpen}
                                // className={classNames(classes.menuButton, this.state.open && classes.hide)}
                            >
                                <MenuIcon/>
                            </IconButton>
                            <Typography variant="title" color="inherit" noWrap>
                                {/*Chat*/}
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </MuiThemeProvider>
                <div className={styles.content}>
                    <Sidebar/>
                    <Router>
                        <React.Fragment>
                            <Route path="/" component={Message}/>
                        </React.Fragment>
                    </Router>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        username: state.userInfo.username,
        socket: state.userInfo.socket,
        uid: state.userInfo.uid,
        userList: state.userInfo.userList
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateMessages: bindActionCreators(userActions.updateMessages, dispatch),
        updateUserList: bindActionCreators(userActions.updateUserList, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom)
