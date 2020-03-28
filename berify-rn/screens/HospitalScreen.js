import * as React from 'react';
import { Image, View } from 'react-native';
import {
    widthPercentageToDP as vw,
    heightPercentageToDP as vh
} from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import { Text, Input, Button, Toggle, CheckBox } from '@ui-kitten/components';

import { TOP } from '../assets/images';

class HospitalScreen extends React.Component {
    renderData = () => {
        return (
            <>
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
                    key="inv"
                >
                    <Text style={{ color: `#2B4899` }} category="h3">
                        {120} Kits in Inventory
                    </Text>
                </View>
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
                    key="send"
                >
                    <Text style={{ color: `#2B4899` }} category="h3">
                        {80} Kits to Send to Labs
                    </Text>
                </View>
                <Button
                    style={{
                        width: '100%',
                        marginBottom: 10
                    }}
                    key="arrive"
                    size="giant"
                    appearance="outline"
                    onPress={() =>
                        this.props.navigation.push('Scan', {
                            action: '',
                            text: 'Scanning kits arriving at hospital'
                        })
                    }
                >
                    Process Arriving Kits
                </Button>
                <Button
                    style={{
                        width: '100%',
                        marginBottom: 10
                    }}
                    key="middle"
                    size="giant"
                    appearance="outline"
                    onPress={() =>
                        this.props.navigation.push('Scan', {
                            action: '',
                            text: 'Scanning kits that just received samples'
                        })
                    }
                >
                    Use Kits
                </Button>
                <Button
                    style={{
                        width: '100%',
                        marginBottom: 10
                    }}
                    key="leave"
                    size="giant"
                    appearance="outline"
                    onPress={() =>
                        this.props.navigation.push('Scan', {
                            action: '',
                            text: 'Scanning kits leaving the hospital'
                        })
                    }
                >
                    Send Kits To Lab
                </Button>
            </>
        );
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
                    Hoag Irvine Dashboard
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

export default connect(mapStateToProps)(HospitalScreen);
