{/** 
import React from 'react';
import App from './App';
import { AppRegistry } from 'react-native';
import { AcceptProvider } from './Components/ViewAppointments/accept';
import { register } from '@videosdk.live/react-native-sdk';

// Unless you are exporting multiple things from a single file, you should just use this.
// It's more idiomatic than using module.exports = ReactApp;
export const Root = () => {
    register();
    return (
    <AcceptProvider>
        <App />
    </AcceptProvider>
    );
}

AppRegistry.registerComponent('App', () => Root);
*/}