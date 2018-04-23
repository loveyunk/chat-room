import React from 'react';
import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import Menu, {MenuItem} from 'material-ui/Menu';
import ImageIcon from '@material-ui/icons/Image';
import Button from 'material-ui/Button';

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

        for (let uid in userList) {
            const [username] = [userList[uid].username];
            // const listbkColor = sex === 'boy' ? '#99BBFF' : '#FF88C2';
            // const avatarbkColor = sex === 'boy' ? '#CCDDFF' : '#FFB7DD';

            // userlistElement.push(<ListItem style={{backgroundColor: listbkColor}} key={uid}
            //                                leftAvatar={<Avatar backgroundColor={avatarbkColor}> {username[0]} </Avatar>}
            //                                primaryText={username}/>)
            userListElement.push(
                <div key={uid}>
                    <ListItem button>
                        <Avatar src="/logo.jpg">
                            <ImageIcon/>
                        </Avatar>
                        <ListItemText primary="远方" secondary="生活不只眼前的苟且"/>
                    </ListItem>
                    <Divider/>
                </div>);
        }

        let foo = [];
        for (let i = 0; i < 15; i++) {
            foo.push(
                <div key={i}>
                    <ListItem button>
                        <Avatar onClick={this.handleClick}>
                            <ImageIcon/>
                        </Avatar>
                        <ListItemText primary="远方" secondary="生活不只眼前的苟且"/>
                    </ListItem>
                    <Divider/>
                </div>
            );
        }

        const {anchorEl} = this.state;

        return (
            <div className={styles.container}>
                <div>
                    {/*{userNums}*/}
                </div>
                <List>
                    {/*{userListElement}*/}
                    {foo}
                </List>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                >
                    <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                    <MenuItem onClick={this.handleClose}>My account</MenuItem>
                    <MenuItem onClick={this.handleClose}>Logout</MenuItem>
                </Menu>
            </div>
        );
    }
}

export default UserList;
