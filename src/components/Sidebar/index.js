import React from 'react';
import {Link} from "react-router";
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';
import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';
import Icon from 'material-ui/Icon';
import styles from './style.less';
import classnames from 'classnames';
import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles';
import teal from 'material-ui/colors/teal';
import green from 'material-ui/colors/cyan';
import purple from 'material-ui/colors/indigo';
import { withStyles } from 'material-ui/styles';
import {config, getRandomNum} from 'utils';
import {getUploadToken} from 'api/user';
import * as qiniu from 'qiniu-js';
import Upload from 'rc-upload';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: teal[500]
        },
        secondary: {
            main: purple[500]
        },
        error: {
            main: green[500]
        }
    }
});

const style = theme => ({
    colorAction: {
        color: 'red'
    }
});


class Sidebar extends React.Component {

    changeAvatar = () => {
        console.log(1);
    };

    render() {

        const {classes,username, sex, privateList} = this.props;

        let privateUrl = '/private/';

        for (let p in privateList) {
            if (p) {
                privateUrl += p;
            }
            break;
        }



        const uploaderProps = {

            customRequest({file}) {

                getUploadToken().then(res => {
                    let token = res.data.token;
                    let config = {
                        useCdnDomain: true,
                        region: qiniu.region.z0
                    };

                    let putExtra = {};
                    let observable = qiniu.upload(file, getRandomNum(), token, putExtra, config);

                    let observer = {
                        next(res) {
                            // console.log(1);
                            // console.log(res);
                        },
                        error(err) {
                            // console.log(2);
                            // console.log(err);
                        },
                        complete(res) {
                            // console.log(3);
                            console.log(res);
                            // res.key
                            // http://p87jndy6j.bkt.clouddn.com/61713800
                            // _this.handleMessage(`http://p87jndy6j.bkt.clouddn.com/${res.key}`);
                        }
                    };

                    let subscription = observable.subscribe(observer);// 上传开始
                });
            }
        };

        return (
            <MuiThemeProvider theme={theme}>
                <div className={classnames(styles.container)}
                     style={{display: this.props.sidebarVisible ? '' : 'none'}}>
                    <Upload {...uploaderProps}>
                        <Avatar
                            alt="avatar"
                            src={sex === '男' ? config.avatarBoy : config.avatarGirl}
                            className={styles.avatar}
                            onClick={this.changeAvatar}
                        />
                    </Upload>
                    <Typography variant="headline" gutterBottom>
                        {username}
                    </Typography>
                    <Typography variant="subheading" gutterBottom>
                        {/*Subheading*/}
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
                        <Link to={privateUrl}>
                            <ListItem button>
                                <ListItemIcon>
                                    <Icon color="primary">
                                        chat
                                    </Icon>
                                </ListItemIcon>
                                <ListItemText primary="私聊"/>
                            </ListItem>
                        </Link>
                        <Link to="/robot">
                            <ListItem button>
                                <ListItemIcon>
                                    <Icon color="error">
                                        android
                                    </Icon>
                                </ListItemIcon>
                                <ListItemText primary="聊天机器人"/>
                            </ListItem>
                        </Link>
                        {/*<Link to="/profile">*/}
                            {/*<ListItem button>*/}
                                {/*<ListItemIcon>*/}
                                    {/*<Icon color="action" className={classes.colorAction}>*/}
                                        {/*account_circle*/}
                                    {/*</Icon>*/}
                                {/*</ListItemIcon>*/}
                                {/*<ListItemText primary="个人中心"/>*/}
                            {/*</ListItem>*/}
                        {/*</Link>*/}
                    </List>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default withStyles(style)(Sidebar);
