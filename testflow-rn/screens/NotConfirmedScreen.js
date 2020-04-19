import * as React from 'react';
import { View } from 'react-native';
import { Input, Button, Text, Spinner } from '@ui-kitten/components';
import { LinearGradient } from 'expo-linear-gradient';
import { connect } from 'react-redux';
import {
    widthPercentageToDP as vw,
    heightPercentageToDP as vh,
} from 'react-native-responsive-screen';
import { handleLogin, changeLUserName, changeLPassword, clearErrors } from '../redux/actions';

class LoginScreen extends React.Component {
    componentDidMount() {
        this.props.clearErrors();
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <LinearGradient
                    colors={['#617DCC', '#2F4B98']}
                    style={{
                        width: vw(100),
                        height: vh(100),
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <View
                        style={{
                            width: vw(80),
                            height: vh(60),
                            backgroundColor: 'white',
                            borderRadius: vw(4),
                        }}
                    >
                        <Text
                            status="primary"
                            category="h2"
                            style={{ marginTop: vh(13), textAlign: 'center' }}
                        >
                            Account email not confirmed!
                        </Text>
                        <Text category="h5" style={{ marginTop: vh(4), textAlign: 'center' }}>
                            Please check your email for a confirmation link.
                        </Text>
                        <Button
                            appearance="ghost"
                            size="giant"
                            status="basic"
                            textStyle={{ fontWeight: '300', fontSize: 25 }}
                            onPress={() => this.props.navigation.goBack()}
                        >
                            Back
                        </Button>
                    </View>
                </LinearGradient>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const { auth } = state;
    return { auth };
};

export default connect(mapStateToProps, {
    handleLogin,
    changeLUserName,
    changeLPassword,
    clearErrors,
})(LoginScreen);
