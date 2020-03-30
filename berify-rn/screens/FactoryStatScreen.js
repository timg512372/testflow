import * as React from 'react';
import { Image, View, AsyncStorage } from 'react-native';
import {
    widthPercentageToDP as vw,
    heightPercentageToDP as vh
} from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import { Text, Input, Button, Toggle, CheckBox } from '@ui-kitten/components';
import { SERVER_URL } from '../dotenv.json';

import { logoutUser } from '../redux/actions';
import { TOP } from '../assets/images';

import axios from 'axios';

class FactoryStatScreen extends React.Component {
    componentDidMount = async () => {
        const token = await AsyncStorage.getItem('jwtToken');
        axios.defaults.headers.common['Authorization'] = token;

        const { data } = await axios.get(`${SERVER_URL}/api/test/factoryExports`);
        this.setState({ exports: data.exports });
    };

    state = {
        exports: []
    };

    renderData = () => {
        console.log(this.state.exports);
        const bubbles = this.state.exports.map((item, index) => {
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
                    key={index}
                >
                    <Text style={{ color: `#656565` }} category="c1">
                        {item.date}
                    </Text>
                    <Text style={{ color: `#2B4899` }} category="h3">
                        {this.state.exports.length} Test Kits Exported
                    </Text>
                </View>
            );
        });

        if (bubbles.length == 0) {
            bubbles[0] = (
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
                    key={'blank'}
                >
                    <Text style={{ color: `#656565` }} category="c1">
                        {'No Date'}
                    </Text>
                    <Text style={{ color: `#2B4899` }} category="h3">
                        No Data Reported
                    </Text>
                </View>
            );
        }

        const trimmedBubbles = [bubbles[0]];
        trimmedBubbles.push(
            <>
                <Button
                    style={{
                        width: '100%',
                        marginBottom: 10
                    }}
                    key="button"
                    size="giant"
                    appearance="outline"
                    onPress={() =>
                        this.props.navigation.push('Scan', {
                            action: 'fl',
                            text: 'Scanning Boxes Leaving Factory'
                        })
                    }
                >
                    Export More Kits
                </Button>
                <Button
                    style={{
                        width: '100%'
                    }}
                    key="something"
                    size="giant"
                    appearance="outline"
                    status="danger"
                    onPress={() => this.props.logoutUser(this.props.navigation)}
                >
                    Log Out
                </Button>
            </>
        );

        return trimmedBubbles;
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
                    {this.props.auth.user.institution} Dashboard
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
    const { auth } = state;
    return { auth };
};

export default connect(
    mapStateToProps,
    { logoutUser }
)(FactoryStatScreen);
