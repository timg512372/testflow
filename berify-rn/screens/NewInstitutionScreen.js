import * as React from 'react';
import { Image, View } from 'react-native';
import { connect } from 'react-redux';
import { Text, Input, Button, Select } from '@ui-kitten/components';
import { LinearGradient } from 'expo-linear-gradient';
import {
    widthPercentageToDP as vw,
    heightPercentageToDP as vh
} from 'react-native-responsive-screen';

import { LANDING } from '../assets/images';
import LocationPicker from '../components/LocationPicker';

class NewInstitutionScreen extends React.Component {
    state = {
        name: '',
        type: '',
        code: '',
        error: '',
        location: '',
        username: '',
        password: '',
        pconfirm: ''
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
                            height: vh(80),
                            backgroundColor: 'white',
                            borderRadius: vw(4)
                        }}
                    >
                        <Text
                            status="primary"
                            category="h1"
                            style={{ marginTop: vh(13), marginLeft: 20, fontWeight: '700' }}
                        >
                            Create New Institution
                        </Text>
                        <Input
                            placeholder="Institution Name"
                            value={this.state.username}
                            onChangeText={val => this.setState({ name: val })}
                            style={{ margin: 10, borderRadius: 8 }}
                        />
                        <Input
                            placeholder="Username"
                            value={this.state.password}
                            onChangeText={val => this.setState({ username: val })}
                            style={{ margin: 10, borderRadius: 8, marginTop: 0 }}
                        />
                        <Input
                            placeholder="Password"
                            value={this.state.password}
                            onChangeText={val => this.setState({ password: val })}
                            style={{ margin: 10, borderRadius: 8, marginTop: 0 }}
                            secureTextEntry={true}
                        />
                        <Input
                            placeholder="Confirm Password"
                            value={this.state.pconfirm}
                            onChangeText={val => this.setState({ pconfirm: val })}
                            style={{ margin: 10, borderRadius: 8, marginTop: 0 }}
                            secureTextEntry={true}
                        />

                        <Select
                            data={[
                                { text: 'Producer' },
                                { text: 'Tester' },
                                { text: 'Laboratory' }
                            ]}
                            selectedOption={this.state.type}
                            onSelect={val => this.setState({ type: val })}
                            style={{ margin: 10, marginTop: 0, borderRadius: 8 }}
                        />

                        <LocationPicker getLocation={location => this.setState({ location })} />

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
                                onPress={() => this.props.navigation.goBack()}
                            >
                                Back
                            </Button>
                        </View>
                        <Text status="warning">{this.state.error}</Text>
                    </View>
                </LinearGradient>
            </View>
        );
    }
}

export default connect()(NewInstitutionScreen);
