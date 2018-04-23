import React from 'react';
import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import ImageIcon from '@material-ui/icons/Image';

import styles from './UserList.less';

class UserList extends React.Component {

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
                <ListItem button key={uid}>
                    <Avatar>
                        <ImageIcon/>
                    </Avatar>
                    <ListItemText primary="Photos"/>
                </ListItem>);
        }

        return (
            <div className={styles.container}>
                <div>
                    {userNums}
                </div>
                <List component="nav">
                    {/*{userListElement}*/}
                    <ListItem button>
                        <Avatar>
                            <ImageIcon/>
                        </Avatar>
                        <ListItemText primary="Photos"/>
                    </ListItem>
                </List>
            </div>
        );
    }
}

export default UserList;
