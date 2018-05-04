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
        return [];
    };

    render() {

        const pathname = this.props.router.location.pathname;

        const {userList, uid, socket, username, sex, privateList, onlineNums, setIgnoreList, messages, ignoreList, setOnlineNums, setPrivateList, clearMessages, updateRobotMessages} = this.props;

        const userListProps = {
            env: 1,
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

        const messagesProps = {
            env: 1,
            messages,
            uid,
            ignoreList,
            onlineNums,
            clearMessages
        };

        const privateUserListProps = {
            env: 2,
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

        const privateMessagesProps = {
            messages: (() => this.getPrivateMessage(this.props.privateMessages))(),
            uid,
            ignoreList,
            onlineNums,
            clearMessages
        };

        const robotMessageInputProps = {
            env: 3,
            uid,
            username,
            sex,
            socket,
            updateRobotMessages
        };

        const robotMessagesProps = {
            messages: this.props.robotMessages,
            uid,
            ignoreList,
            onlineNums,
            clearMessages
        };

        const robotUserListProps = {
            env: 3,
            userList: {
                '001': {
                    uid: '001',
                    username: '聊天机器人',
                    sex: '女'
                }
            },
            uid,
            socket,
            username,
            sex,
            privateList,
            setPrivateList,
            setIgnoreList,
            setOnlineNums
        };

        let layout = (() => {
            switch (pathname) {
                case '/':
                    return (
                        <React.Fragment>
                            <UserList {...userListProps} />
                            <div className={styles.content}>
                                <Messages {...messagesProps} />
                                <MessageInput {...this.props}/>
                            </div>
                        </React.Fragment>
                    );
                case '/robot':
                    return (
                        <React.Fragment>
                            <UserList {...robotUserListProps} />
                            <div className={styles.content}>
                                <Messages {...robotMessagesProps} />
                                <MessageInput {...robotMessageInputProps}/>
                            </div>
                        </React.Fragment>
                    );
                default:
                    return (
                        <React.Fragment>
                            <UserList {...privateUserListProps} />
                            <div className={styles.content}>
                                <Messages {...privateMessagesProps} />
                                <MessageInput {...this.props}/>
                            </div>
                        </React.Fragment>
                    );
            }
        })();

        return (
            <div className={styles.container}>
                {
                    layout
                    // pathname === '/' || pathname === '/robot' ?
                    //     <React.Fragment>
                    //         <UserList {...userListProps} />
                    //         <div className={styles.content}>
                    //             <Messages {...messagesProps} />
                    //             <MessageInput {...this.props}/>
                    //         </div>
                    //     </React.Fragment>
                    //     :
                    //     <React.Fragment>
                    //         <UserList {...privateUserListProps} />
                    //         <div className={styles.content}>
                    //             <Messages {...privateMessagesProps} />
                    //             <MessageInput {...this.props}/>
                    //         </div>
                    //     </React.Fragment>
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
        socket: state.userInfo.socket,
        robotMessages: state.userInfo.robotMessages
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
        setPrivateList: bindActionCreators(userActions.setPrivateList, dispatch),
        updateRobotMessages: bindActionCreators(userActions.updateRobotMessages, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom)
