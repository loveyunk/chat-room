import React from 'react';
import BottomNavigation, {BottomNavigationAction} from 'material-ui/BottomNavigation';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import UserList from './components/UserList';
import MessageInput from './components/MessageInput';
import {connect} from 'react-redux';
import * as userActions from 'actions/user';
import {bindActionCreators} from 'redux';
import styles from './style.less';

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
                <div className={styles.content}>
                    <div className={styles.left}>
                        <UserList userList={this.props.userList}/>
                        <BottomNavigation
                            value={value}
                            onChange={this.handleChange}
                            showLabels
                            className={styles.bottomNavigation}
                        >
                            <BottomNavigationAction label="Recents" icon={<RestoreIcon/>}/>
                            <BottomNavigationAction label="Favorites" icon={<FavoriteIcon/>}/>
                            <BottomNavigationAction label="Nearby" icon={<LocationOnIcon/>}/>
                        </BottomNavigation>
                    </div>
                    <div className={styles.right}>
                        <MessageInput {...this.props} />
                    </div>
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
