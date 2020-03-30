import * as React from 'react';
import { View, Image, Alert, AsyncStorage } from 'react-native';
import { Text, Icon, Button, Modal, Radio, RadioGroup, ButtonGroup } from '@ui-kitten/components';
import { connect } from 'react-redux';
import {
    widthPercentageToDP as vw,
    heightPercentageToDP as vh
} from 'react-native-responsive-screen';
import axios from 'axios';
import { SERVER_URL } from '../dotenv.json';

import QRScanner from '../components/QRScanner';

class ScanScreen extends React.Component {
    state = {
        number: 0,
        scanning: true,
        showModal: '',
        test: '',
        result: '',
        loading: false,
        status: '',
        error: ''
    };

    codes = [];

    onBarCodeScanned = ({ type, data }) => {
        this.setState({ scanning: false });
        if (type !== 'org.iso.QRCode') {
            Alert.alert('Error!', 'Not a QR Code', [
                { text: 'OK', onPress: () => this.setState({ scanning: true }) }
            ]);
        } else if (this.props.route.params.action == 'lr' && false) {
            this.setState({ showModal: 'r', test: data });
        } else {
            // Alert.alert('Success!', `Test Kit ${data} Scanned`, [
            //     {
            //         text: 'OK',
            //         onPress: () => {
            //             this.setState({ scanning: true, number: this.state.number + 1 });
            //             this.codes.push(data);
            //         }
            //     },
            //     {
            //         text: 'Undo',
            //         onPress: () => this.setState({ scanning: true })
            //     },
            //     { cancelable: false }
            // ]);
            this.getStatus(data);
            this.setState({ showModal: 'r', test: data, loading: true });
        }
    };

    getStatus = async data => {
        this.setState({ loading: false, status: 'hospital' });
    };

    onButtonPress = async () => {
        console.log('pressed button');
        this.setState({ submitLoading: true });

        try {
            const token = await AsyncStorage.getItem('jwtToken');
            axios.defaults.headers.common['Authorization'] = token;
            await axios.post(`${SERVER_URL}/api/test/hospitalTransfer`, {
                QRs: [this.state.test]
            });
            this.setState({ submitLoading: false, showModal: '' });
            this.goBack();
        } catch (e) {
            this.setState({ submitLoading: false, error: e.message });
        }
    };

    goBack = () => {
        let url = 'FactoryStat';
        if (
            this.props.route.params.action == 'ha' ||
            this.props.route.params.action == 'hl' ||
            this.props.route.params.action == 'hs'
        ) {
            url = 'Hospital';
        } else if (
            this.props.route.params.action == 'la' ||
            this.props.route.params.action == 'lr'
        ) {
            url = 'Lab';
        }

        this.props.navigation.push(url);
    };

    renderInModal() {
        let content = null;
        if (this.state.loading) {
            content = (
                <Text category="h5" style={{ textAlign: 'center' }}>
                    Getting Information
                </Text>
            );
        } else if (true) {
            content = (
                <>
                    <Text category="h5" style={{ textAlign: 'center' }}>
                        Status: {this.props.status}
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
                        <Radio
                            style={{ marginVertical: 5 }}
                            text="Inconclusive"
                            textStyle={{ fontSize: 20 }}
                            status="info"
                        />
                    </RadioGroup>
                </>
            );
        }
        return content;
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                <QRScanner onBarCodeScanned={this.state.scanning ? this.onBarCodeScanned : null} />

                <View style={{ top: 40, left: 20, position: 'absolute' }}>
                    <Button
                        onPress={this.goBack}
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
                    {this.props.route.params.action == 'lr' && true ? null : (
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
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >
                        <View>
                            <Text category="h3" status="primary" style={{ textAlign: 'center' }}>
                                Success!
                            </Text>
                            <Text category="h6" style={{ textAlign: 'center' }}>
                                Scanned Test {this.state.test}
                            </Text>
                            {this.renderInModal()}
                            <Text category="h6" status="danger" style={{ textAlign: 'center' }}>
                                {this.state.error}
                            </Text>
                        </View>

                        <ButtonGroup
                            style={{
                                margin: 10
                            }}
                            appearance="outline"
                            status="primary"
                        >
                            <Button
                                onPress={() => this.setState({ scanning: true, showModal: '' })}
                            >
                                Cancel
                            </Button>
                            <Button onPress={this.onButtonPress}>
                                {this.state.submitLoading ? 'Processing' : 'Submit'}
                            </Button>
                        </ButtonGroup>
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
