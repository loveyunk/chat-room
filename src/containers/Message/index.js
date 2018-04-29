import React from 'react';
import {connect} from 'react-redux';
import * as userActions from 'actions/user';
import {bindActionCreators} from 'redux';
import UserList from './components/UserList';
import MessageInput from './components/MessageInput';
import Messages from './components/Messages';
import styles from './style.less';

class Message extends React.Component {

    render() {
        return (
            <div className={styles.container}>
                {/*<UserList userList={this.props.userList} setOnlineNums={this.props.setOnlineNums}/>*/}
                <UserList {...this.props} />
                <div className={styles.content}>
                    <Messages {...this.props} />
                    <MessageInput {...this.props}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        username: state.userInfo.username,
        uid: state.userInfo.uid,
        userList: state.userInfo.userList,
        messages: state.userInfo.messages,
        onlineNums: state.userInfo.onlineNums,
        sex: state.userInfo.sex,
        ignoreList: state.userInfo.ignoreList,
        socket: state.userInfo.socket
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setIgnoreList: bindActionCreators(userActions.setIgnoreList, dispatch),
        updateMessages: bindActionCreators(userActions.updateMessages, dispatch),
        updateUserList: bindActionCreators(userActions.updateUserList, dispatch),
        clearMessages: bindActionCreators(userActions.clearMessages, dispatch),
        setOnlineNums: bindActionCreators(userActions.setOnlineNums, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Message)
