import * as React from 'react';
import { Image, View } from 'react-native';
import { Input, Button, Toggle, CheckBox, Text } from '@ui-kitten/components';
import { LinearGradient } from 'expo-linear-gradient';
import { connect } from 'react-redux';
import {
    widthPercentageToDP as vw,
    heightPercentageToDP as vh
} from 'react-native-responsive-screen';
import axios from 'axios';
import { handleLogin, changeLUserName, changeLPassword } from '../redux/actions';

class LoginScreen extends React.Component {
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
                            value={this.props.auth.lUserName}
                            onChangeText={val => this.props.changeLUserName(val)}
                            style={{ margin: 10, borderRadius: 8 }}
                        />
                        <Input
                            placeholder="Password"
                            value={this.props.auth.lPassword}
                            onChangeText={val => this.props.changeLPassword(val)}
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
                                onPress={() =>
                                    this.props.handleLogin(
                                        this.props.auth.lUserName,
                                        this.props.auth.lPassword,
                                        this.props.navigation
                                    )
                                }
                            >
                                Continue
                            </Button>
                        </View>
                    </View>
                </LinearGradient>
            </View>
        );
    }
}

const mapStateToProps = state => {
    const { auth } = state;
    return { auth };
};

export default connect(
    mapStateToProps,
    { handleLogin, changeLUserName, changeLPassword }
)(LoginScreen);
