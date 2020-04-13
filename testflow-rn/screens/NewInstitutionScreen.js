import * as React from 'react';
import { Image, View, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import { Text, Input, Button, Select, Spinner } from '@ui-kitten/components';
import { LinearGradient } from 'expo-linear-gradient';
import {
    widthPercentageToDP as vw,
    heightPercentageToDP as vh,
} from 'react-native-responsive-screen';
import {
    changeUserName,
    changeInstitution,
    changePassword,
    changePasswordConfirm,
    changeLocation,
    changeRole,
    handleRegister,
    clearErrors,
} from '../redux/actions';

class NewInstitutionScreen extends React.Component {
    componentDidMount() {
        this.props.clearErrors();
    }

    render() {
        return (
            <KeyboardAvoidingView
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                behavior="padding"
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
                            height: vh(80),
                            backgroundColor: 'white',
                            borderRadius: vw(4),
                        }}
                    >
                        <Text
                            status="primary"
                            category="h1"
                            style={{ marginTop: vh(13), marginLeft: 20, fontWeight: '700' }}
                        >
                            Create Institution
                        </Text>
                        <Input
                            placeholder="Institution Name"
                            value={this.props.auth.institution}
                            onChangeText={(val) => this.props.changeInstitution(val)}
                            style={{ margin: 10, borderRadius: 8 }}
                        />
                        <Select
                            placeholder="Institution Type"
                            data={[{ text: 'Factory' }, { text: 'Hospital' }, { text: 'Lab' }]}
                            selectedOption={{
                                text: this.props.auth.role
                                    ? this.props.auth.role.text.charAt(0).toUpperCase() +
                                      this.props.auth.role.text.slice(1)
                                    : '',
                            }}
                            onSelect={(val) =>
                                this.props.changeRole({ text: val.text.toLowerCase() })
                            }
                            style={{ margin: 10, marginTop: 0, borderRadius: 8 }}
                        />
                        <Input
                            placeholder="Username"
                            value={this.props.auth.userName}
                            onChangeText={(val) => this.props.changeUserName(val)}
                            style={{ margin: 10, borderRadius: 8, marginTop: 0 }}
                        />
                        <Input
                            placeholder="Password"
                            value={this.props.auth.password}
                            onChangeText={(val) => this.props.changePassword(val)}
                            style={{ margin: 10, borderRadius: 8, marginTop: 0 }}
                            secureTextEntry={true}
                        />

                        <Input
                            placeholder="Confirm Password"
                            value={this.props.auth.password_confirm}
                            onChangeText={(val) => this.props.changePasswordConfirm(val)}
                            style={{ margin: 10, borderRadius: 8, marginTop: 0 }}
                            secureTextEntry={true}
                        />

                        <Input
                            placeholder="Location"
                            value={this.props.auth.location}
                            onChangeText={(val) => this.props.changeLocation(val)}
                            style={{ margin: 10, borderRadius: 8, marginTop: 0 }}
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
                                    this.props.handleRegister(
                                        this.props.auth.institution,
                                        this.props.auth.userName,
                                        this.props.auth.password,
                                        this.props.auth.password_confirm,
                                        this.props.auth.role.text,
                                        this.props.auth.location,
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
                        {this.props.auth.error ? (
                            <Text status="danger" style={{ textAlign: 'center', marginTop: 5 }}>
                                Error: {this.props.auth.error}
                            </Text>
                        ) : null}
                    </View>
                </LinearGradient>
            </KeyboardAvoidingView>
        );
    }
}

const mapStateToProps = (state) => {
    const { auth } = state;
    return { auth };
};

export default connect(mapStateToProps, {
    changeUserName,
    changeInstitution,
    changePassword,
    changePasswordConfirm,
    changeLocation,
    changeRole,
    handleRegister,
    clearErrors,
})(NewInstitutionScreen);
