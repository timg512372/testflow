import * as React from 'react';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { setCustomText } from 'react-native-global-props';

import { mapping } from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

import { myTheme } from './theme';
import { default as customMapping } from './custom-mapping.json'; // <-- Import custom mapping
import { store } from './redux/store';

import LandingScreen from './screens/LandingScreen';
import LoginScreen from './screens/LoginScreen';
import ScanScreen from './screens/ScanScreen';
import NewInstitutionScreen from './screens/NewInstitutionScreen';
import FactoryStatScreen from './screens/FactoryStatScreen';
import HospitalScreen from './screens/HospitalScreen';
import LabScreen from './screens/LabScreen';

const Stack = createStackNavigator();

function Hospital() {
    return (
        <Stack.Navigator headerMode="none">
            <Stack.Screen name="Hospital" component={HospitalScreen} />
            <Stack.Screen name="Scan" component={ScanScreen} />
        </Stack.Navigator>
    );
}

function Factory() {
    return (
        <Stack.Navigator headerMode="none">
            <Stack.Screen name="FactoryStat" component={FactoryStatScreen} />
            <Stack.Screen name="Scan" component={ScanScreen} />
        </Stack.Navigator>
    );
}

function Lab() {
    return (
        <Stack.Navigator headerMode="none">
            <Stack.Screen name="Lab" component={LabScreen} />
            <Stack.Screen name="Scan" component={ScanScreen} />
        </Stack.Navigator>
    );
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoadingComplete: false
        };
        setCustomText({ style: { fontFamily: 'Lato' } });
    }

    async componentDidMount() {
        try {
            SplashScreen.preventAutoHide();

            // Load fonts
            await Font.loadAsync({
                ...Ionicons.font,
                Lato: require('./assets/fonts/Lato-Regular.ttf')
            });
        } catch (e) {
            // We might want to provide this error information to an error reporting service
            console.warn(e);
        } finally {
            this.setState({ isLoadingComplete: true });
            SplashScreen.hide();
        }
    }

    render() {
        if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
            return <ApplicationProvider mapping={mapping} theme={myTheme}></ApplicationProvider>;
        } else {
            return (
                <Provider store={store}>
                    <IconRegistry icons={EvaIconsPack} />
                    <ApplicationProvider
                        mapping={mapping}
                        theme={myTheme}
                        customMapping={customMapping}
                    >
                        <NavigationContainer>
                            <Stack.Navigator headerMode={null}>
                                <Stack.Screen name="Landing" component={LandingScreen} />
                                <Stack.Screen name="Login" component={LoginScreen} />
                                <Stack.Screen
                                    name="NewInstitution"
                                    component={NewInstitutionScreen}
                                />
                                <Stack.Screen name="HospitalMain" component={Hospital} />
                                <Stack.Screen name="FactoryMain" component={Factory} />
                                <Stack.Screen name="LabMain" component={Lab} />
                            </Stack.Navigator>
                        </NavigationContainer>
                    </ApplicationProvider>
                </Provider>
            );
        }
    }
}

export default App;
