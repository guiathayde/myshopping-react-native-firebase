import 'react-native-gesture-handler';
import '@react-native-firebase/app';

import { registerRootComponent } from 'expo';

// Firebase emulator, need to run local Firebase emulation 
/*
if (__DEV__) {
  firestore()
    .terminate()
    .then(() => {
      firestore()
        .clearPersistence()
        .then(() => {
          firestore().useEmulator('192.168.1.100', 8080);
        })
        .catch((error) =>
          console.log('Firestore - Clear persistence error:', error)
        );
    })
    .catch((error) => console.log('Firestore - Terminate error:', error));
}

firestore();
*/

import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
