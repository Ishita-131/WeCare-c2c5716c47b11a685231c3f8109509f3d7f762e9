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
        <MeetingProvider
        config={{
            meetingId: "qysl-v0hs-s8ul",
            micEnabled: true,
            webcamEnabled: true,
            name: "Adam's Org",
        }}
        token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiIwMDdhNjIzOC01Y2JiLTQ4ZjItYWEzZC0yNTRhMzMyZmEwZjIiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcxMjU2MTUwMywiZXhwIjoxNzEyNjQ3OTAzfQ.IYgGdWi_OvDMRLLYHcJWqahEUVynmjhR9Cn3KXRq_mI"
        >
        <AcceptProvider>
            <App />
        </AcceptProvider>
        </MeetingProvider>
    );
}

AppRegistry.registerComponent('App', () => App);