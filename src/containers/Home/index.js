import React from 'react';
import {hashHistory, Link} from 'react-router';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles';
import lightBlue from 'material-ui/colors/cyan';
import {connect} from 'react-redux';
import * as userActions from 'actions/user';
import * as commonActions from 'actions/common';
import {bindActionCreators} from 'redux';
import ForwardIcon from '@material-ui/icons/Forward';
import Sidebar from 'components/Sidebar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu, {MenuItem} from 'material-ui/Menu';
import {withStyles} from 'material-ui/styles';
import styles from './style.less';
import {cookie, config} from 'utils';
import store from 'store2';

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

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            open: false,
            privateUserList: {},
            privateFrom: '',
            message: ''
        };
    }

    componentDidMount() {

        const {socket} = this.props;

        // 提醒有用户加入
        socket.on('enterUser', enterInfo => {
            this.props.updateMessages(enterInfo);
        });

        // 更新在线用户列表
        socket.on('updateUserList', userList => {
            this.props.updateUserList(userList);
        });

        // 更新消息列表
        socket.on('updateMessages', messages => {
            this.props.updateMessages(messages);
        });

        // 有用户退出
        socket.on('leaveUser', leaveInfo => {
            this.props.updateMessages(leaveInfo);
        });

        // 更新私聊用户列表
        socket.on('updatePrivateList', (from, username, userList) => {
            // alert('有人向你发起了私聊');
            this.setState({
                open: true,
                message: `${username} 向你发起了私聊`
            });

            this.setState({
                privateUserList: userList,
                privateFrom: from
            });
            // this.privateUserList = userList;
            // this.privateFrom = from;

            // if (!this.state.open) {
            //     this.props.setPrivateList(userList);
            //     hashHistory.push(`/private/${from}`);
            // }
        });

        // 私聊信息
        socket.on('updatePrivateMessage', (to, messages) => {
            let msg;
            let tml = this.props.privateMessages[to] || [];
            msg = Object.assign({}, this.props.privateMessages, {[to]: [...tml, messages]});
            this.props.updatePrivateMessages(msg);
        });
    }

    handlePrivate = () => {
        this.props.setPrivateList(this.state.privateUserList);
        hashHistory.push(`/private/${this.state.privateFrom}`);
        this.handleModalClose();
    };

    handleMenu = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = () => {
        this.setState({anchorEl: null});
    };

    logout = () => {
        this.props.socket.emit('leave', this.props.uid);
        this.handleClose();
        removeToken();
        this.props.setIdentity(0);
        store.clearAll();
        hashHistory.push('/login');
        window.location.reload();
    };

    toggleSidebar = () => {
        this.props.sidebarVisible ?
            this.props.hideSidebar()
            :
            this.props.showSidebar();
    };

    handleModalClose = () => {
        this.setState({open: false});
    };

    render() {

        const {anchorEl} = this.state;

        const {classes, username, sex, privateList, avatar} = this.props;

        const open = Boolean(anchorEl);

        const sidebarProps = {
            username,
            privateList,
            // avatarSrc: sex === '男' ? config.avatarBoy : config.avatarGirl,
            sex,
            avatar,
            ...this.props
        };

        return (
            <div className={styles.container}>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    open={this.state.open}
                    onClose={this.handleModalClose}
                    message={this.state.message}
                    action={[
                        <IconButton
                            key="forward"
                            aria-label="Close"
                            color="inherit"
                            onClick={this.handlePrivate}
                        >
                            <ForwardIcon/>
                        </IconButton>
                    ]}
                />
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
                                    onClick={this.toggleSidebar}
                                    // className={classNames(classes.menuButton, this.state.open && classes.hide)}
                                >
                                    <MenuIcon/>
                                </IconButton>
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
                                    {/*<MenuItem onClick={this.handleClose}>Homepage</MenuItem>*/}
                                    {/*<MenuItem onClick={this.handleClose}><Link to="/">Message</Link></MenuItem>*/}
                                    {/*<MenuItem onClick={this.handleClose}>Profile</MenuItem>*/}
                                    <MenuItem onClick={this.logout}>Logout</MenuItem>
                                </Menu>
                            </div>
                        </Toolbar>
                    </AppBar>
                </MuiThemeProvider>
                <div className={styles.content}>
                    {(this.props.identity === 0 && this.props.location.pathname !== '/profile') &&
                    <Sidebar {...sidebarProps}/>}
                    {this.props.children}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        username: state.userInfo.username,
        sex: state.userInfo.sex,
        uid: state.userInfo.uid,
        userList: state.userInfo.userList,
        identity: state.userInfo.identity,
        socket: state.userInfo.socket,
        sidebarVisible: state.sidebarVisible,
        privateMessages: state.userInfo.privateMessages,
        privateList: state.userInfo.privateList,
        avatar: state.userInfo.avatar
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateMessages: bindActionCreators(userActions.updateMessages, dispatch),
        updateUserList: bindActionCreators(userActions.updateUserList, dispatch),
        setIdentity: bindActionCreators(userActions.setIdentity, dispatch),
        showSidebar: bindActionCreators(commonActions.showSidebar, dispatch),
        hideSidebar: bindActionCreators(commonActions.hideSidebar, dispatch),
        setPrivateList: bindActionCreators(userActions.setPrivateList, dispatch),
        updatePrivateMessages: bindActionCreators(userActions.updatePrivateMessages, dispatch),
        updateAvatar: bindActionCreators(userActions.updateAvatar, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Home));
