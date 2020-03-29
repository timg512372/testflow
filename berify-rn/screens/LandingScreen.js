import * as React from 'react';
import { Image, View, AsyncStorage } from 'react-native';
import {
    widthPercentageToDP as vw,
    heightPercentageToDP as vh
} from 'react-native-responsive-screen';
import { Text, Input, Button, Toggle, CheckBox } from '@ui-kitten/components';
import jwt_decode from 'jwt-decode';
import { logoutUser, setCurrentUser } from '../redux/actions';
import { LANDING } from '../assets/images';
import { connect } from 'react-redux';

class LandingScreen extends React.Component {
    async componentDidMount() {
        try {
            const token = await AsyncStorage.getItem('jwtToken');
            const decoded = jwt_decode(token);
            const currentTime = Date.now() / 1000;

            if (decoded.exp < currentTime) {
                this.props.logoutUser();
            } else {
                this.props.setCurrentUser(decoded);

                if (decoded.role == 'hospital') {
                    this.props.navigation.navigate('HospitalMain');
                }

                if (decoded.role == 'lab') {
                    this.props.navigation.navigate('LabMain');
                }

                if (decoded.role == 'factory') {
                    this.props.navigation.navigate('FactoryMain');
                }
            }
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        return (
            <View
                style={{
                    backgroundColor: 'white',
                    height: vh(100),
                    flex: 0,
                    alignItems: 'center'
                }}
            >
                <Image
                    source={LANDING}
                    style={{ width: vw(100), height: (vw(100) * 1338) / 1080 }}
                />
                <Button
                    style={{ marginTop: vh(7), marginBottom: vh(1) }}
                    size="giant"
                    appearance="ghost"
                    status="basic"
                    textStyle={{ fontWeight: '300', fontSize: 25 }}
                    onPress={() => this.props.navigation.push('Login')}
                >
                    Log In
                </Button>
                <Button
                    appearance="ghost"
                    size="giant"
                    status="basic"
                    textStyle={{ fontWeight: '300', fontSize: 25 }}
                    onPress={() => this.props.navigation.push('NewInstitution')}
                >
                    Register
                </Button>
            </View>
        );
    }
}

export default connect(
    null,
    { logoutUser, setCurrentUser }
)(LandingScreen);
