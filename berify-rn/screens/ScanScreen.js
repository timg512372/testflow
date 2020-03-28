import * as React from 'react';
import { View, Image, Alert } from 'react-native';
import { Text, Icon, Button, Modal, Radio, RadioGroup, ButtonGroup } from '@ui-kitten/components';
import { connect } from 'react-redux';
import {
    widthPercentageToDP as vw,
    heightPercentageToDP as vh
} from 'react-native-responsive-screen';

import QRScanner from '../components/QRScanner';

class ScanScreen extends React.Component {
    state = {
        number: 0,
        scanning: true,
        showModal: '',
        test: '',
        result: ''
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
        } else if (this.props.route.params.action == 'r') {
            this.setState({ showModal: 'r', test: data });

            // this.setState({ scanning: true, number: this.state.number + 1 });
            // this.codes.push(data);
        } else {
            Alert.alert('Success!', `Test Kit ${data} Scanned`, [
                {
                    text: 'OK',
                    onPress: () => {
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
                    {this.props.route.params.action == 'r' ? null : (
                        <Button onPress={this.onButtonPress}>
                            Submit {this.state.number} Scans
                        </Button>
                    )}
                </View>

                <Modal
                    visible={this.state.showModal === 'r'}
                    onBackdropPress={() => this.setState({ scanning: true, showModal: '' })}
                >
                    <View
                        style={{
                            width: vw(80),
                            height: vh(40),
                            backgroundColor: 'white',
                            borderRadius: 12,
                            padding: 10,
                            alignContent: 'center'
                        }}
                    >
                        <Text category="h3" status="primary" style={{ textAlign: 'center' }}>
                            Test Kit {this.state.test}
                        </Text>
                        <Text category="p1" style={{ textAlign: 'left' }}>
                            Please enter a result
                        </Text>
                        <RadioGroup
                            selectedIndex={this.state.result}
                            onChange={result => this.setState({ result })}
                            style={{ marginTop: 10 }}
                        >
                            <Radio
                                style={{ marginVertical: 5 }}
                                text="Positive"
                                textStyle={{ fontSize: 20 }}
                                status="danger"
                            />
                            <Radio
                                style={{ marginVertical: 5 }}
                                text="Negative"
                                textStyle={{ fontSize: 20 }}
                                status="success"
                            />
                        </RadioGroup>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                                marginTop: 10
                            }}
                        >
                            <Button
                                onPress={() => this.setState({ scanning: true, showModal: '' })}
                                style={{ borderRadius: 5 }}
                                status="danger"
                            >
                                Cancel
                            </Button>
                            <Button style={{ borderRadius: 5 }}>Submit</Button>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {};
};

export default connect(mapStateToProps)(ScanScreen);
