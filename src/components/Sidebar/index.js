import React from 'react';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';
import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import green from 'material-ui/colors/green';
import Icon from 'material-ui/Icon';
import styles from './style.less';

class Sidebar extends React.Component {

    render() {
        return (
            <div className={styles.container}>
                <Avatar
                    alt="avatar"
                    src="https://s20.postimg.cc/eosk8cw8t/image.jpg"
                    className={styles.avatar}
                />
                <Typography variant="headline" gutterBottom>
                    Jerrn marray
                </Typography>
                <Typography variant="subheading" gutterBottom>
                    Subheading
                </Typography>
                <List component="nav" className={styles.list}>
                    <ListItem button>
                        <ListItemIcon>
                            <InboxIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Homepage"/>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <Icon color="error">
                                account_circle
                            </Icon>
                        </ListItemIcon>
                        <ListItemText primary="Profile"/>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <Icon color="secondary">
                                question_answer
                            </Icon>
                        </ListItemIcon>
                        <ListItemText primary="Message"/>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <Icon color="primary">
                                brightness_high
                            </Icon>
                        </ListItemIcon>
                        <ListItemText primary="Settings"/>
                    </ListItem>
                </List>
            </div>
        );
    }
}

export default Sidebar;
