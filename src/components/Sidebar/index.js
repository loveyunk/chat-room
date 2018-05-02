import React from 'react';
import {Link} from "react-router";
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';
import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';
import InboxIcon from '@material-ui/icons/Inbox';
import Icon from 'material-ui/Icon';
import styles from './style.less';

class Sidebar extends React.Component {

    render() {

        const {username, avatarSrc} = this.props;

        return (
            <div className={styles.container}>
                <Avatar
                    alt="avatar"
                    src={avatarSrc}
                    className={styles.avatar}
                />
                <Typography variant="headline" gutterBottom>
                    {username}
                </Typography>
                <Typography variant="subheading" gutterBottom>
                    Subheading
                </Typography>
                <List component="nav" className={styles.list}>
                    <Link to="/">
                        <ListItem button>
                            <ListItemIcon>
                                <Icon color="secondary">
                                    question_answer
                                </Icon>
                            </ListItemIcon>
                            <ListItemText primary="聊天室"/>
                        </ListItem>
                    </Link>
                    <ListItem button>
                        <ListItemIcon>
                            <Icon color="primary">
                                brightness_high
                            </Icon>
                        </ListItemIcon>
                        <ListItemText primary="私聊"/>
                    </ListItem>
                </List>
            </div>
        );
    }
}

export default Sidebar;
