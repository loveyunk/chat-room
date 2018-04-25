import React from 'react';
import Card, {CardActions, CardContent, CardMedia} from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Avatar from 'material-ui/Avatar';
import { withStyles } from 'material-ui/styles';
import style from './style.less';

const styles = {
    card: {
        maxWidth: 750,
    },
    media: {
        height: 170,
        // paddingTop: '56.25%', // 16:9
    },
    avatar: {
        width: 120,
        height: 120,
        position: 'absolute'
    }
};


class Profile extends React.Component {

    render() {

        const {classes} = this.props;

        return (
            <div className={style.wrapper}>
                <div className={style.top}/>
                <div className={style.container}>
                    <Card className={classes.card}>
                        <CardMedia
                            className={classes.media}
                            image="/login_bg.png"
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Avatar src="/login_bg.png" className={classes.avatar} />
                            <Typography gutterBottom variant="headline" component="h2">
                                Lizard
                            </Typography>
                            <Typography component="p">
                                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                across all continents except Antarctica
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Profile);
