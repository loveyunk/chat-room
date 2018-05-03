import React from 'react';
import {connect} from 'react-redux';
import * as userActions from 'actions/user';
import {bindActionCreators} from 'redux';
import {MessageInput, UserList, Messages} from 'components';
import styles from './style.less';

class ChatRoom extends React.Component {

    getPrivateMessage = (obj) => {
        let path = this.props.router.params.uid;

        if (JSON.stringify(obj) === '{}') {
            return [];
        }
        for (let p in obj) {
            if (p === path) {
                return obj[p];
            }
        }
    };

    render() {

        const pathname = this.props.router.location.pathname;

        const {userList, uid, socket, username, sex, privateList, onlineNums, setIgnoreList, messages, ignoreList, setOnlineNums, setPrivateList, clearMessages} = this.props;

        const userListProps = {
            userList,
            uid,
            socket,
            username,
            sex,
            privateList,
            setPrivateList,
            setIgnoreList,
            setOnlineNums
        };

        const privateUserListProps = {
            userList: privateList,
            uid,
            socket,
            username,
            sex,
            privateList,
            setPrivateList,
            setIgnoreList,
            setOnlineNums
        };

        const messagesProps = {
            messages,
            uid,
            ignoreList,
            onlineNums,
            clearMessages
        };

        const privateMessagesProps = {
            messages: (() => this.getPrivateMessage(this.props.privateMessages))(),
            uid,
            ignoreList,
            onlineNums,
            clearMessages
        };

        return (
            <div className={styles.container}>
                {
                    pathname === '/' ?
                        <React.Fragment>
                            <UserList {...userListProps} />
                            <div className={styles.content}>
                                <Messages {...messagesProps} />
                                <MessageInput {...this.props}/>
                            </div>
                        </React.Fragment>
                        :
                        <React.Fragment>
                            <UserList {...privateUserListProps} />
                            <div className={styles.content}>
                                <Messages {...privateMessagesProps} />
                                <MessageInput {...this.props}/>
                            </div>
                        </React.Fragment>
                }
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
        privateList: state.userInfo.privateList,
        privateMessages: state.userInfo.privateMessages,
        socket: state.userInfo.socket
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(userActions, dispatch),
        setIgnoreList: bindActionCreators(userActions.setIgnoreList, dispatch),
        updateMessages: bindActionCreators(userActions.updateMessages, dispatch),
        updateUserList: bindActionCreators(userActions.updateUserList, dispatch),
        clearMessages: bindActionCreators(userActions.clearMessages, dispatch),
        setOnlineNums: bindActionCreators(userActions.setOnlineNums, dispatch),
        setPrivateList: bindActionCreators(userActions.setPrivateList, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom)
