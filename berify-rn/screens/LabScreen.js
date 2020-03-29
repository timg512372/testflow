import * as React from 'react';
import { Image, View } from 'react-native';
import {
    widthPercentageToDP as vw,
    heightPercentageToDP as vh
} from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import { Text, Input, Button, Toggle, CheckBox } from '@ui-kitten/components';

import { logoutUser } from '../redux/actions';
import { TOP } from '../assets/images';

class LabScreen extends React.Component {
    renderData = () => {
        const categories = [
            { text: 'Test Kits to Process', num: 189 },
            { text: 'Test Kits Processed', num: 76 }
        ];

        const bubbles = categories.map(point => {
            return (
                <View
                    style={{
                        borderWidth: 3,
                        borderRadius: 8,
                        borderStyle: 'solid',
                        borderColor: '#F2F2F2',
                        marginBottom: 5,
                        width: '100%',
                        padding: 5
                    }}
                    key={point.text}
                >
                    <Text style={{ color: `#2B4899` }} category="h3">
                        {point.num} {point.text}
                    </Text>
                </View>
            );
        });

        bubbles.push(
            <>
                <Button
                    style={{
                        width: '100%',
                        marginBottom: 5
                    }}
                    key="button"
                    size="giant"
                    appearance="outline"
                    onPress={() =>
                        this.props.navigation.push('Scan', {
                            action: '',
                            text: 'Scanning kits arriving at the lab'
                        })
                    }
                >
                    Process Arriving Kits
                </Button>
                <Button
                    style={{
                        width: '100%'
                    }}
                    key="stuff"
                    size="giant"
                    appearance="outline"
                    onPress={() =>
                        this.props.navigation.push('Scan', {
                            action: 'r',
                            text: 'Scanning kits to record results'
                        })
                    }
                >
                    Upload Results
                </Button>
                <Button
                    style={{
                        width: '100%',
                        marginBottom: 10
                    }}
                    key="logout"
                    size="giant"
                    appearance="outline"
                    status="danger"
                    onPress={() => this.props.logoutUser(this.props.navigation)}
                >
                    Log Out
                </Button>
            </>
        );

        return bubbles;
    };

    render() {
        return (
            <View
                style={{
                    backgroundColor: 'white',
                    height: vh(100),
                    flex: 0,
                    alignItems: 'left'
                }}
            >
                <Image source={TOP} style={{ width: vw(100), height: (vw(100) * 602) / 1080 }} />
                <Text
                    style={{
                        marginTop: -vh(18),
                        marginBottom: vh(18),
                        marginLeft: 20,
                        color: 'white',
                        textAlign: 'left',
                        fontWeight: '700'
                    }}
                    category="h1"
                >
                    Generic Lab Dashboard
                </Text>
                <View
                    style={{
                        width: vw(100),
                        flex: 1,
                        alignItems: 'stretch',
                        padding: 10
                    }}
                >
                    {this.renderData()}
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {};
};

export default connect(mapStateToProps, { logoutUser })(LabScreen);
