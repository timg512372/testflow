import * as React from 'react';
import { View } from 'react-native';
import { Input, Button, Text, Spinner } from '@ui-kitten/components';
import { LinearGradient } from 'expo-linear-gradient';
import { connect } from 'react-redux';
import {
    widthPercentageToDP as vw,
    heightPercentageToDP as vh,
} from 'react-native-responsive-screen';
import { handleVerify, clearErrors } from '../redux/actions';

class VerifyScreen extends React.Component {
    state = {
        code: '',
    };

    componentDidMount() {
        this.props.clearErrors();
    }

    render() {
        console.log(this.props.route.params);
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
                            style={{ marginTop: vh(5), textAlign: 'center' }}
                        >
                            One More Step
                        </Text>
                        <Text category="h5" style={{ margin: vh(4), textAlign: 'center' }}>
                            Please check your email for a confirmation code. It may be in your junk
                            folder.
                        </Text>
                        <Input
                            placeholder="Enter Confirmation Code"
                            value={this.state.code}
                            onChangeText={(code) => this.setState({ code })}
                            style={{ margin: 10, borderRadius: 8, marginTop: 0 }}
                            secureTextEntry={true}
                        />
                        <View
                            style={{
                                view: 1,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginHorizontal: 30,
                            }}
                        >
                            <Button
                                size="small"
                                style={{ borderRadius: 8 }}
                                onPress={() =>
                                    this.props.handleVerify(
                                        this.state.code,
                                        this.props.route.params,
                                        this.props.navigation
                                    )
                                }
                            >
                                Continue
                            </Button>
                            {this.props.auth.loading ? <Spinner /> : null}
                            <Button
                                size="small"
                                appearance="ghost"
                                onPress={() => this.props.navigation.goBack()}
                            >
                                Back
                            </Button>
                        </View>
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
    clearErrors,
    handleVerify,
})(VerifyScreen);
