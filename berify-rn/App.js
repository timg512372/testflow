import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { mapping } from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import { Provider } from 'react-redux';

import { store } from './redux/store';
import LandingScreen from './screens/LandingScreen';
import LoginScreen from './screens/LoginScreen';
import ScanScreen from './screens/ScanScreen';
import SignUpScreen from './screens/SignUpScreen';

import { myTheme } from './theme';

class App extends React.Component {
    state = {
        isLoadingComplete: false,
        setLoadingComplete: false
    };

    async componentDidMount() {
        try {
            SplashScreen.preventAutoHide();

            // Load fonts
            await Font.loadAsync({
                ...Ionicons.font,
                'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf')
            });
        } catch (e) {
            // We might want to provide this error information to an error reporting service
            console.warn(e);
        } finally {
            this.setState({ setLoadingComplete: true });
            SplashScreen.hide();
        }
    }

    render() {
        const Stack = createStackNavigator();

        let AuthScreens = (
            <>
                <Stack.Screen name="Landing" component={LandingScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="SignUp" component={SignUpScreen} />
            </>
        );

        let FactoryScreens = (
            <>
                <Stack.Screen name="Scan" component={ScanScreen} />
            </>
        );

        if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
            return <ApplicationProvider mapping={mapping} theme={myTheme}></ApplicationProvider>;
        } else {
            return (
                <Provider store={store}>
                    <ApplicationProvider mapping={mapping} theme={myTheme}>
                        <NavigationContainer>
                            <Stack.Navigator headerMode={null}>{AuthScreens}</Stack.Navigator>
                        </NavigationContainer>
                    </ApplicationProvider>
                </Provider>
            );
        }
    }
}

export default App;

// export default function App(props) {
//     const [isLoadingComplete, setLoadingComplete] = React.useState(false);

//     // Load any resources or data that we need prior to rendering the app
//     React.useEffect(() => {
//         async function loadResourcesAndDataAsync() {
//             try {
//                 SplashScreen.preventAutoHide();

//                 // Load fonts
//                 await Font.loadAsync({
//                     ...Ionicons.font,
//                     'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf')
//                 });
//             } catch (e) {
//                 // We might want to provide this error information to an error reporting service
//                 console.warn(e);
//             } finally {
//                 setLoadingComplete(true);
//                 SplashScreen.hide();
//             }
//         }

//         loadResourcesAndDataAsync();
//     }, []);

//     const Stack = createStackNavigator();

//     let AuthScreens = (
//         <>
//             <Stack.Screen name="Landing" component={LandingScreen} />
//             <Stack.Screen name="Login" component={LoginScreen} />
//             <Stack.Screen name="SignUp" component={SignUpScreen} />
//         </>
//     );

//     let FactoryScreens = (
//         <>
//             <Stack.Screen name="Scan" component={ScanScreen} />
//         </>
//     );

//     if (!isLoadingComplete && !props.skipLoadingScreen) {
//         return <ApplicationProvider mapping={mapping} theme={myTheme}></ApplicationProvider>;
//     } else {
//         return (
//             <Provider store={store}>
//                 <ApplicationProvider mapping={mapping} theme={myTheme}>
//                     <NavigationContainer>
//                         <Stack.Navigator headerMode={null}>{AuthScreens}</Stack.Navigator>
//                     </NavigationContainer>
//                 </ApplicationProvider>
//             </Provider>
//         );
//     }
// }
