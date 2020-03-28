import React, { Component } from 'react';
import { View } from 'react-native';
import { Text } from '@ui-kitten/components';
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
                <BarCodeScanner
                    style={{ flex: 1 }}
                    onBarCodeScanned={this.props.onBarCodeScanned}
                />
            );
        }

        return (
            <View
                style={{
                    flexDirection: 'column',
                    alignItems: 'stretch',
                    flex: 1
                }}
            >
                {content}
            </View>
        );
    }
}

export default QRScanner;
