import * as React from 'react';
import { Image, View } from 'react-native';
import {
    widthPercentageToDP as vw,
    heightPercentageToDP as vh
} from 'react-native-responsive-screen';
import { Text, Input, Button, Toggle, CheckBox } from '@ui-kitten/components';

import { LANDING } from '../assets/images';

class LandingScreen extends React.Component {
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
                    Register your Institution
                </Button>
            </View>
        );
    }
}

export default LandingScreen;
