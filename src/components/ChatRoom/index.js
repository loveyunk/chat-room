import React from 'react';
import {withStyles} from 'material-ui/styles';

const styles = theme => ({
    container: {
        // background: 'red'
        width: '100%',
        height: '500px'
    },
    svg: {
        height: '100%'
    }
});

class ChatRoom extends React.Component {

    render () {

        const {classes} = this.props;

        return (
            <div className={classes.container}>

            </div>
        );
    }
}

export default withStyles(styles)(ChatRoom);
