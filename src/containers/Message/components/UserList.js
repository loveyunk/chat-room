import React from 'react';
import List, {ListItem, ListItemText} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import Menu, {MenuItem} from 'material-ui/Menu';
import {config} from 'utils';

import styles from './UserList.less';

class UserList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            //
            privateInfo: null
        };
    }

    openMenu = uid => event => {
        if (uid !== this.props.uid) {
            this.setState({anchorEl: event.currentTarget});
        }
    };

    handleClose = () => {
        this.setState({anchorEl: null});
    };

    handlePrivateChat = () => {
        this.props.socket.emit('privateChat', this.props.username, this.privateInfo.username, '123');
        this.handleClose();
    };

    getPrivateInfo = (info) => {
        this.privateInfo = info;
    };

    handleIgnore = () => {
        this.props.setIgnoreList(this.privateInfo.uid);
        this.handleClose();
    };

    render() {

        const userListElement = [];
        const userList = this.props.userList;
        const userNums = Object.keys(userList).length;

        this.props.setOnlineNums(userNums);

        for (let uid in userList) {
            const {username, sex} = userList[uid];

            userListElement.push(
                <div key={uid} onClick={this.getPrivateInfo(userList[uid])}>
                    <ListItem button>
                        <Avatar src={sex === '男' ? config.avatarBoy : config.avatarGirl} onClick={this.openMenu(uid)}/>
                        <ListItemText primary={username} secondary=""/>
                    </ListItem>
                    <Divider/>
                </div>);
        }

        const {anchorEl} = this.state;

        return (
            <div className={styles.container}>
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
                    <MenuItem onClick={this.handleIgnore}>忽略此人</MenuItem>
                </Menu>
            </div>
        );
    }
}

export default UserList;
