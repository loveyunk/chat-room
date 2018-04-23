import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import App from './containers/App';
import {Provider} from 'react-redux';
import store from './store';
import registerServiceWorker from './registerServiceWorker';
import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles';
import blue from 'material-ui/colors/blue';
// import './styles/index.less';

const theme = createMuiTheme({
    palette: {
        primary: blue
    }
});

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider theme={theme}>
            <App/>
        </MuiThemeProvider>
    </Provider>, document.getElementById('root'));
registerServiceWorker();
