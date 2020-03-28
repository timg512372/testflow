import * as React from 'react';
import { Image, View } from 'react-native';

import { Text, Input, Button, Toggle, CheckBox } from '@ui-kitten/components';
import { LinearGradient } from 'expo-linear-gradient';

import { LANDING } from '../assets/images';
import {
    widthPercentageToDP as vw,
    heightPercentageToDP as vh
} from 'react-native-responsive-screen';

class LoginScreen extends React.Component {
    state = {
        username: '',
        password: '',
        error: ''
    };

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <LinearGradient
                    colors={['#617DCC', '#2F4B98']}
                    style={{
                        width: vw(100),
                        height: vh(100),
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <View
                        style={{
                            width: vw(80),
                            height: vh(60),
                            backgroundColor: 'white',
                            borderRadius: vw(4)
                        }}
                    >
                        <Text
                            status="primary"
                            category="h1"
                            style={{ marginTop: vh(13), marginLeft: 20, fontWeight: '700' }}
                        >
                            Log In
                        </Text>
                        <Input
                            placeholder="Username"
                            value={this.state.username}
                            onChangeText={val => this.setState({ username: val })}
                            style={{ margin: 10, borderRadius: 8 }}
                        />
                        <Input
                            placeholder="Password"
                            value={this.state.password}
                            onChangeText={val => this.setState({ password: val })}
                            style={{ margin: 10, borderRadius: 8, marginTop: 0 }}
                            secureTextEntry={true}
                        />
                        <View
                            style={{
                                view: 1,
                                flexDirection: 'row',
                                justifyContent: 'space-around'
                            }}
                        >
                            <Button
                                size="small"
                                style={{ borderRadius: 8 }}
                                onPress={() => console.log('logging in')}
                            >
                                Continue
                            </Button>
                            <Button
                                size="small"
                                appearance="ghost"
                                onPress={() => this.props.navigation.push('SignUp')}
                            >
                                Create an Account
                            </Button>
                        </View>
                        <Text status="warning">{this.state.error}</Text>
                    </View>
                </LinearGradient>
            </View>
        );
    }
}

export default LoginScreen;
