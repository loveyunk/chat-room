import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import {hashHistory} from 'react-router';
import {Provider} from 'react-redux';
import store from './store';
import registerServiceWorker from './registerServiceWorker';
import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles';
import blue from 'material-ui/colors/blue';
// import './styles/index.less';
import RouteMap from './router/routeMap';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: blue[500]
        }
    }
});


ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider theme={theme}>
            <RouteMap history={hashHistory}/>
        </MuiThemeProvider>
    </Provider>, document.getElementById('root'));
registerServiceWorker();
