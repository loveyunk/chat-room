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
                <UserList userList={this.props.userList} setOnlineNums = {this.props.setOnlineNums}/>
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
        socket: state.userInfo.socket,
        uid: state.userInfo.uid,
        userList: state.userInfo.userList,
        messages: state.userInfo.messages,
        onlineNums: state.userInfo.onlineNums
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateMessages: bindActionCreators(userActions.updateMessages, dispatch),
        updateUserList: bindActionCreators(userActions.updateUserList, dispatch),
        clearMessages: bindActionCreators(userActions.clearMessages, dispatch),
        setOnlineNums: bindActionCreators(userActions.setOnlineNums, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Message)
