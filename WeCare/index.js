import React, { Component } from 'react';
import App from './App';
import { AppRegistry } from 'react-native';
import { AcceptProvider } from './Components/ViewAppointments/accept';

// Unless you are exporting multiple things from a single file, you should just use this.
// It's more idiomatic than using module.exports = ReactApp;
export default class ReactApp extends Component {
    render() {
        return (
        <AcceptProvider>
            <App />
        </AcceptProvider>
        );
    }
}

AppRegistry.registerComponent('App', () => App);
AppRegistry.registerComponent('ReactApp', () => ReactApp);
