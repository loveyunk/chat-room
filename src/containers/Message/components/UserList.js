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
            anchorEl: null
        };
    }

    handleClick = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = () => {
        this.setState({anchorEl: null});
    };

    render() {

        const userListElement = [];
        const userList = this.props.userList;
        const userNums = Object.keys(userList).length;

        this.props.setOnlineNums(userNums);

        for (let uid in userList) {
            const {username, sex} = userList[uid];

            // const listbkColor = sex === 'boy' ? '#99BBFF' : '#FF88C2';
            // const avatarbkColor = sex === 'boy' ? '#CCDDFF' : '#FFB7DD';

            // userlistElement.push(<ListItem style={{backgroundColor: listbkColor}} key={uid}
            //                                leftAvatar={<Avatar backgroundColor={avatarbkColor}> {username[0]} </Avatar>}
            //                                primaryText={username}/>)
            userListElement.push(
                <div key={uid}>
                    <ListItem button>
                        <Avatar src={sex === '男' ? config.avatarBoy : config.avatarGirl} onClick={this.handleClick}/>
                        <ListItemText primary={username} secondary=""/>
                    </ListItem>
                    <Divider/>
                </div>);
        }

        let foo = [];
        for (let i = 0; i < 15; i++) {
            foo.push(
                <div key={i}>
                    <ListItem button>
                        <Avatar src="/default_avatar.png" onClick={this.handleClick}/>
                        <ListItemText primary="远方" secondary="生活不只眼前的苟且"/>
                    </ListItem>
                    <Divider/>
                </div>
            );
        }

        const {anchorEl} = this.state;

        return (
            <div className={styles.container}>

                {/*<TextField fullWidth id="input-with-icon-grid" label="With a grid" />*/}
                {/*<Divider/>*/}
                <List>
                    {/*<ListItem button>*/}
                    {/*<Avatar src="/default_avatar.png" onClick={this.handleClick}/>*/}
                    {/*<ListItemText primary="Search"/>*/}
                    {/*</ListItem>*/}
                    {userListElement}
                    {/*{foo}*/}
                </List>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                >
                    <MenuItem onClick={this.handleClose}>添加好友</MenuItem>
                    <MenuItem onClick={this.handleClose}>忽略此人</MenuItem>
                    <MenuItem onClick={this.handleClose}>私聊</MenuItem>
                </Menu>
            </div>
        );
    }
}

export default UserList;
