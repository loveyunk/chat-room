import React from 'react';
import {hashHistory, Link} from 'react-router';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles';
import lightBlue from 'material-ui/colors/cyan';
import {connect} from 'react-redux';
import * as userActions from 'actions/user';
import {bindActionCreators} from 'redux';
import Sidebar from 'components/Sidebar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu, {MenuItem} from 'material-ui/Menu';
import {withStyles} from 'material-ui/styles';
import styles from './style.less';
import {cookie} from 'utils';
import store from 'store2';
import io from 'socket.io-client';

const socket = io();

const {removeToken} = cookie;

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

const style = {};

class ChatRoom extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null
        };
    }

    componentDidMount() {
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

    handleMenu = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = () => {
        this.setState({anchorEl: null});
    };

    logout = () => {
        this.handleClose();
        removeToken();
        // store.remove('uid');
        store.clearAll();
        hashHistory.push('/login');
    };

    render() {

        const {anchorEl} = this.state;

        const {classes, username} = this.props;

        const open = Boolean(anchorEl);

        const sidebarProps = {
            username
        };

        return (
            <div className={styles.container}>
                <MuiThemeProvider theme={theme}>
                    <AppBar
                        className={styles.appBar}
                        position="absolute"
                    >
                        <Toolbar className={styles.toolBar} disableGutters={!this.state.open}>
                            <div>
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
                            </div>
                            <div>
                                <IconButton
                                    aria-owns={open ? 'menu-appbar' : null}
                                    aria-haspopup="true"
                                    onClick={this.handleMenu}
                                    color="inherit"
                                >
                                    <AccountCircle/>
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={open}
                                    onClose={this.handleClose}
                                >
                                    <MenuItem onClick={this.handleClose}>Homepage</MenuItem>
                                    <MenuItem onClick={this.handleClose}><Link to="/">Message</Link></MenuItem>
                                    <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                                    <MenuItem onClick={this.logout}>Logout</MenuItem>
                                </Menu>
                            </div>
                        </Toolbar>
                    </AppBar>
                </MuiThemeProvider>
                <div className={styles.content}>
                    {this.props.location.pathname !== '/profile' && <Sidebar {...sidebarProps}/>}
                    {this.props.children}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        username: state.userInfo.username,
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(ChatRoom));
