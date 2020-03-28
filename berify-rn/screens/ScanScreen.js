import * as React from 'react';
import { View, Image, Alert } from 'react-native';
import { Text, Icon, Button, Toggle, CheckBox } from '@ui-kitten/components';
import {
    widthPercentageToDP as vw,
    heightPercentageToDP as vh
} from 'react-native-responsive-screen';

import QRScanner from '../components/QRScanner';

class ScanScreen extends React.Component {
    state = {
        number: 0,
        scanning: true
    };

    codes = [];

    onBarCodeScanned = ({ type, data }) => {
        this.setState({ scanning: false });
        if (type !== 'org.iso.QRCode') {
            Alert.alert('Error!', 'Not a QR Code', [
                { text: 'OK', onPress: () => this.setState({ scanning: true }) }
            ]);
        } else if (this.codes.includes(data)) {
            Alert.alert('Error!', 'Duplicate Scan', [
                { text: 'OK', onPress: () => this.setState({ scanning: true }) }
            ]);
        } else {
            Alert.alert('Success!', `Test Kit ${data} Scanned`, [
                {
                    text: 'OK',
                    onPress: () => {
                        console.log('ok');
                        this.setState({ scanning: true, number: this.state.number + 1 });
                        this.codes.push(data);
                    }
                },
                {
                    text: 'Undo',
                    onPress: () => this.setState({ scanning: true })
                },
                { cancelable: false }
            ]);
        }
    };

    onButtonPress = () => {
        // Different actions depending on the parameter that's passed in
    };

    render() {
        console.log(this.state.scanning);
        console.log(this.codes);
        return (
            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                <QRScanner onBarCodeScanned={this.state.scanning ? this.onBarCodeScanned : null} />

                <View style={{ top: 40, left: 20, position: 'absolute' }}>
                    <Button
                        onPress={() => this.props.navigation.goBack()}
                        appearance="ghost"
                        size="giant"
                        icon={style => (
                            <Icon
                                style={{ ...style, marginRight: -10, marginLeft: -15 }}
                                width={50}
                                height={50}
                                fill="#FFFFFF"
                                name="arrow-left-outline"
                            />
                        )}
                        textStyle={{ fontSize: 25, color: 'white' }}
                    >
                        {' '}
                        Back
                    </Button>
                </View>

                <View style={{ top: vh(80), left: vw(10), width: vw(80), position: 'absolute' }}>
                    <Text style={{ color: 'white', textAlign: 'center' }} category="h6">
                        Scan QR Code On Boxes
                    </Text>
                    <Text style={{ color: 'white', textAlign: 'center', margin: 10 }} category="h6">
                        {this.props.route.params.text}
                    </Text>
                    <Button onPress={this.onButtonPress}>Submit {this.state.number} Scans</Button>
                </View>
            </View>
        );
    }
}

export default ScanScreen;
