import * as React from 'react';
import { View, Image, Alert, AsyncStorage } from 'react-native';
import {
    Text,
    Icon,
    Button,
    Modal,
    Radio,
    RadioGroup,
    ButtonGroup,
    Spinner
} from '@ui-kitten/components';
import { connect } from 'react-redux';
import {
    widthPercentageToDP as vw,
    heightPercentageToDP as vh
} from 'react-native-responsive-screen';
import axios from 'axios';
import { SERVER_URL } from '../dotenv.json';
import { isNullOrUndefined } from 'util';
import QRScanner from '../components/QRScanner';

class ScanScreen extends React.Component {
    state = {
        number: 0,
        scanning: true,
        showModal: '',
        test: '',
        result: '',
        loading: false,
        submitLoading: false,
        selectedTest: {},
        error: ''
    };

    codes = [];

    onBarCodeScanned = async ({ type, data }) => {
        this.setState({ scanning: false });
        if (type !== 'org.iso.QRCode') {
            Alert.alert('Error!', 'Not a QR Code', [
                { text: 'OK', onPress: () => this.setState({ scanning: true }) }
            ]);
        } else {
            this.setState({ showModal: 'r', test: data, loading: true });
            try {
                const token = await AsyncStorage.getItem('jwtToken');
                axios.defaults.headers.common['Authorization'] = token;

                const result = await axios.post(`${SERVER_URL}/api/test/check`, {
                    test: data
                });
                this.setState({ loading: false, selectedTest: result.data.test });
            } catch (e) {
                console.log(e);
                this.setState({ loading: false, error: e.message });
            }
        }
    };

    onButtonPress = async () => {
        this.setState({ submitLoading: true });

        let route = '';

        if (this.props.route.params.action == 'fl') {
            route = 'hospitalTransfer';
        }

        if (this.props.route.params.action == 'ha') {
            route = 'hospitalObtain';
        }

        if (this.props.route.params.action == 'hl') {
            route = 'labTransfer';
        }

        if (this.props.route.params.action == 'la') {
            route = 'labObtain';
        }

        try {
            const token = await AsyncStorage.getItem('jwtToken');
            axios.defaults.headers.common['Authorization'] = token;

            let result = '';

            if (this.state.result == 0) {
                result = 'positive';
            } else if (this.state.result == 1) {
                result = 'negative';
            } else {
                result = 'inconclusive';
            }

            if (this.props.route.params.action == 'lr') {
                await axios.post(`${SERVER_URL}/api/test/update`, {
                    test: this.state.test,
                    result
                });
            } else {
                await axios.post(`${SERVER_URL}/api/test/${route}`, {
                    test: this.state.test
                });
            }

            this.setState({ submitLoading: false, showModal: '' });
            console.log('success');
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

    parseStatus = () => {
        const { inTransit, role, result, tested } = this.state.selectedTest;
        let status = '';
        if (role == 'factory') {
            if (!inTransit) {
                status = 'In Factory, Awaiting Shipment';
            } else {
                if (this.props.route.params.action[0] == 'f') {
                    status = 'Already Shipped';
                } else {
                    status = 'Shipped from Factory';
                }
            }
        } else if (role == 'hospital') {
            if (inTransit) {
                if (this.props.route.params.action[0] == 'l') {
                    status = 'Shipped from Hospital';
                } else {
                    status = 'Already Shipped';
                }
            } else {
                status = 'In Hospital, Awaiting Shipment';
            }
        } else if (role == 'lab' && this.props.route.params.action != 'lr') {
            if (!tested) {
                status = 'Awaiting Results';
            } else {
                status = 'Result Uploaded';
            }
        }
        return status;
    };

    renderInModal() {
        let content = null;
        if (this.state.loading || false) {
            content = (
                <Text category="h5" style={{ textAlign: 'center' }}>
                    Getting Information
                </Text>
            );
        } else {
            content = (
                <>
                    <Text category="h5" style={{ textAlign: 'center' }}>
                        Status: {this.parseStatus()}
                    </Text>
                    {this.props.route.params.action == 'lr' &&
                    this.state.selectedTest.role == 'lab' ? (
                        <>
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
                                    text="positive"
                                    textStyle={{ fontSize: 20 }}
                                    status="danger"
                                />
                                <Radio
                                    style={{ marginVertical: 5 }}
                                    text="negative"
                                    textStyle={{ fontSize: 20 }}
                                    status="success"
                                />
                                <Radio
                                    style={{ marginVertical: 5 }}
                                    text="inconclusive"
                                    textStyle={{ fontSize: 20 }}
                                    status="info"
                                />
                            </RadioGroup>
                        </>
                    ) : null}
                </>
            );
        }
        return content;
    }

    renderButtonGroup() {
        let buttons = (
            <ButtonGroup
                style={{
                    margin: 10
                }}
                appearance="outline"
                status="primary"
            >
                <Button onPress={() => this.setState({ scanning: true, showModal: '' })}>
                    Cancel
                </Button>
                <Button onPress={this.onButtonPress}>
                    {this.state.submitLoading ? 'Processing' : 'Submit'}
                </Button>
            </ButtonGroup>
        );

        return buttons;
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
                        </View>

                        {this.state.loading || this.state.submitLoading ? <Spinner /> : null}
                        {this.renderButtonGroup()}
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
