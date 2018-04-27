import React from 'react';
import CssBaseline from 'material-ui/CssBaseline';

import {connect} from 'react-redux';
import * as userActions from 'actions/user';
import {bindActionCreators} from 'redux';
import {cookie} from 'utils';
import {getUserInfo} from 'api/user';
import {config} from 'utils';
import store from 'store2';

const {ERR_OK} = config;

class App extends React.Component {

    componentDidMount() {
        const uid = store.get('uid');
        uid && getUserInfo({uid})
            .then(res => {
                if (res.data.error === ERR_OK) {
                    this.props.setUserInfo(res.data.data);
                }
            });
    }

    render() {
        const {children} = this.props;

        return (
            <React.Fragment>
                <CssBaseline/>
                {children}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        username: state.userInfo.username
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(userActions, dispatch),
        setUserInfo: bindActionCreators(userActions.setUserInfo, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App)
