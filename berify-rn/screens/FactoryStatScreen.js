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

class FactoryStatScreen extends React.Component {
    renderData = () => {
        const dummyData = [
            { date: 'March 14, 2020', num: 189 },
            { date: 'March 13, 2020', num: 76 },
            { date: 'March 12, 2020', num: 72 },
            { date: 'March 11, 2020', num: 0 }
        ];

        const bubbles = dummyData.map(point => {
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
                    key={point.date}
                >
                    <Text style={{ color: `#656565` }} category="c1">
                        {point.date}
                    </Text>
                    <Text style={{ color: `#2B4899` }} category="h3">
                        {point.num} Test Kits Exported
                    </Text>
                </View>
            );
        });

        bubbles.push(
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
                            action: 'f',
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

        return bubbles;
    };

    render() {
        console.log(this.props.auth);

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

export default connect(mapStateToProps, { logoutUser })(FactoryStatScreen);
