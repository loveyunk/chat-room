import React from 'react';
import CssBaseline from 'material-ui/CssBaseline';

import {connect} from 'react-redux';
import * as actionCreators from 'actions/actionCreators';
import {bindActionCreators} from 'redux';

import LoginForm from 'components/LoginForm';
import ChatRoom from 'components/ChatRoom';

class App extends React.Component {

    render() {

        const renderDom = this.props.username ? <ChatRoom /> : <LoginForm {...this.props}/>;

        return (
            <React.Fragment>
                <CssBaseline/>
                {renderDom}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        username: state.commonReducer.username
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App)
