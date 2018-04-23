import React from 'react';
import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import ImageIcon from '@material-ui/icons/Image';

import styles from './style.less';

class UserList extends React.Component {

    render() {

        const userlistElement = [];
        const userlist = this.props.userlist;
        const usernums = Object.keys(userlist).length;

        for (let uid in userlist) {
            const [username, sex] = [userlist[uid].username, userlist[uid].sex];
            const listbkColor = sex === 'boy' ? '#99BBFF' : '#FF88C2';
            const avatarbkColor = sex === 'boy' ? '#CCDDFF' : '#FFB7DD';

            userlistElement.push(<ListItem style={{backgroundColor: listbkColor}} key={uid}
                                           leftAvatar={<Avatar backgroundColor={avatarbkColor}> {username[0]} </Avatar>}
                                           primaryText={username}/>)
        }

        return (
            <div className={styles.container}>
                <List component="nav">
                    <ListItem button>
                        <Avatar>
                            <ImageIcon/>
                        </Avatar>
                        <ListItemText primary="Photos"/>
                    </ListItem>
                    <Divider inset/>
                    <ListItem button>
                        <Avatar>
                            <ImageIcon/>
                        </Avatar>
                        <ListItemText primary="Photos"/>
                    </ListItem>
                    <Divider inset/>
                    <ListItem button>
                        <Avatar>
                            <ImageIcon/>
                        </Avatar>
                        <ListItemText primary="Photos"/>
                    </ListItem>
                    <Divider inset/>
                </List>
            </div>
        );
    }
}

export default UserList;
