import React from 'react';
import {hashHistory} from 'react-router';
import List, {ListItem, ListItemText} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import Menu, {MenuItem} from 'material-ui/Menu';
import {config, oneOf} from 'utils';

import style from './style.less';

class UserList extends React.Component {

    constructor(props) {
        super(props);
        this.privateInfo = {};
        this.state = {
            anchorEl: null,
            ignoreList: [],
        };
    }

    openMenu = userInfo => event => {
        this.privateInfo = userInfo;
        if (userInfo.uid !== this.props.uid && this.props.env === 1) {
            this.setState({anchorEl: event.currentTarget});
        }
    };

    handleClose = () => {
        this.setState({anchorEl: null});
    };

    handlePrivateChat = () => {
        this.props.setPrivateList(Object.assign({}, this.props.privateList, {[this.privateInfo.uid]: this.privateInfo}));
        this.props.socket.emit('privateList', this.props.uid, this.privateInfo.uid, this.props.username, {
            username: this.props.username,
            uid: this.props.uid,
            sex: this.props.sex,
            avatar: this.props.avatar
        });
        this.handleClose();
        hashHistory.push(`private/${this.privateInfo.uid}`);
    };

    handleIgnore = () => {
        this.setState({
            ignoreList: [...this.state.ignoreList, this.privateInfo.uid]
        });
        this.props.setIgnoreList(this.privateInfo.uid);
        this.handleClose();
    };

    // goPrivateChat = (uid) => {
    //     // alert(uid);
    //     alert(1);
    // };

    goPrivateChat(uid) {
        if (this.props.env === 2) {
            hashHistory.push(`/private/${uid}`);
        }
    }

    render() {

        const userListElement = [];
        const userList = this.props.userList;
        const userNums = Object.keys(userList).length;

        this.props.setOnlineNums(userNums);

        for (let uid in userList) {
            const {username, sex, avatar} = userList[uid];

            userListElement.push(
                <div key={uid} className={uid === this.props.uid ? style.self : ''}
                     onClick={this.goPrivateChat.bind(this, uid)}>
                    <ListItem button>
                        {
                            this.props.env === 3 ?
                                <Avatar src={config.logo}
                                        onClick={this.openMenu(userList[uid])}/>
                                :
                                <Avatar src={avatar || (sex === '男' ? config.avatarBoy : config.avatarGirl)}
                                        onClick={this.openMenu(userList[uid])}/>
                        }
                        {/*<Avatar src={sex === '男' ? config.avatarBoy : config.avatarGirl}*/}
                        {/*onClick={this.openMenu(userList[uid])}/>*/}
                        <ListItemText primary={username} secondary=""/>
                        {oneOf(uid, this.state.ignoreList) ? '' : <div className={style.dot}/>}
                    </ListItem>
                    <Divider/>
                </div>);
        }

        // const foo = (
        //     <div className={style.self}>
        //         <ListItem button>
        //             <Avatar src={config.avatarBoy}/>
        //             <ListItemText secondary=""/>
        //             <div className={style.dot}/>
        //         </ListItem>
        //         <Divider/>
        //     </div>
        // );

        const {anchorEl} = this.state;

        return (
            <div className={style.container}>
                <List>
                    {userListElement}
                </List>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                >
                    <MenuItem onClick={this.handlePrivateChat}>私聊</MenuItem>
                    <MenuItem
                        onClick={this.handleIgnore}>忽略此人</MenuItem>
                </Menu>
            </div>
        );
    }
}

UserList.propTypes = {};

export default UserList;
