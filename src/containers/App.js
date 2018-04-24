import React from 'react';
import CssBaseline from 'material-ui/CssBaseline';

import {connect} from 'react-redux';
import * as userActions from 'actions/user';
import {bindActionCreators} from 'redux';
import {cookie} from 'utils';

class App extends React.Component {
    render() {

        // const renderDom = getToken() ? <ChatRoom/> : <Login {...this.props}/>;

        const {children} = this.props;

        return (
            <React.Fragment>
                <CssBaseline/>
                {children}
                {/*{renderDom}*/}
                {/*<Router>*/}
                    {/*<div>*/}
                        {/*<Route path="/login"*/}
                               {/*render={() =>*/}
                                   {/*getToken() ? (*/}
                                       {/*<Redirect*/}
                                           {/*to={{*/}
                                               {/*pathname: "/chatroom"*/}
                                           {/*}}*/}
                                       {/*/>*/}
                                   {/*) : (*/}
                                       {/*<Login/>*/}
                                   {/*)*/}
                               {/*}/>*/}
                        {/*<Route path="/chatroom"*/}
                               {/*render={() =>*/}
                                   {/*getToken() ? (*/}
                                       {/*<ChatRoom/>*/}
                                   {/*) : (*/}
                                       {/*<Redirect*/}
                                           {/*to={{*/}
                                               {/*pathname: "/login"*/}
                                           {/*}}*/}
                                       {/*/>*/}
                                   {/*)*/}
                               {/*}/>*/}
                    {/*</div>*/}
                {/*</Router>*/}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        username: state.userInfo.username,
        socket: state.userInfo.socket
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(userActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App)
