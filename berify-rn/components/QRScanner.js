import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';

class QRScanner extends Component {
    state = {
        permission: 'undetermined'
    };

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ permission: status });
        console.log(status);
    }

    render() {
        let content = <Text style={{ height: 50, textAlign: 'center' }}>Permission Denied</Text>;
        if (this.state.permission == 'undetermined') {
            content = (
                <Text style={{ height: 50, textAlign: 'center' }}>Waiting for Permissions</Text>
            );
        } else if (this.state.permission == 'granted') {
            content = (
                <View>
                    <Text style={{ textAlign: 'center' }}>Scan below please</Text>
                    <BarCodeScanner
                        style={{ height: 400 }}
                        onBarCodeScanned={({ type, data }) => console.log(data)}
                    />
                </View>
            );
        }

        return (
            <View
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    alignItems: 'stretch',
                    padding: '5%',
                    backgroundColor: 'pink'
                }}
            >
                {content}
            </View>
        );
    }
}

export default QRScanner;
