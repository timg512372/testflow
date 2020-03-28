import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import QRScanner from '../components/QRScanner';

class ScanScreen extends React.Component {
    render() {
        return (
            <View>
                <Text>Hello!</Text>
                <QRScanner />
            </View>
        );
    }
}

export default ScanScreen;
