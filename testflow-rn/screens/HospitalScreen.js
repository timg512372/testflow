import * as React from 'react';
import { Image, View, AsyncStorage } from 'react-native';
import {
    widthPercentageToDP as vw,
    heightPercentageToDP as vh
} from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import { Text, Input, Button, Toggle, CheckBox } from '@ui-kitten/components';

import { logoutUser } from '../redux/actions';
import { TOP } from '../assets/images';
import axios from 'axios';
import { SERVER_URL } from '../dotenv.json';

class HospitalScreen extends React.Component {
    state = {
        imports: []
    };
    componentDidMount = async () => {
        const token = await AsyncStorage.getItem('jwtToken');
        axios.defaults.headers.common['Authorization'] = token;

        const { data } = await axios.get(`${SERVER_URL}/api/test/hospitalImports`);
        this.setState({ imports: data.imports });
    };

    renderData = () => {
        console.log(this.state.imports);
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
                        {this.state.imports
                            ? this.state.imports.length + ' Kits in Inventory'
                            : 'Loading'}
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
                            action: 'ha',
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
                    key="leave"
                    size="giant"
                    appearance="outline"
                    onPress={() =>
                        this.props.navigation.push('Scan', {
                            action: 'hl',
                            text: 'Scanning kits leaving the hospital'
                        })
                    }
                >
                    Send Kits To Lab
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

export default connect(mapStateToProps, { logoutUser })(HospitalScreen);
