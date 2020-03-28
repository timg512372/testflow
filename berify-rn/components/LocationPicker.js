import React, { Component } from 'react';
import { View } from 'react-native';
import { Text, Button } from '@ui-kitten/components';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

class LocationPicker extends Component {
    state = {
        permission: 'undetermined',
        location: ''
    };

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.LOCATION);
        this.setState({ permission: status });
        console.log(status);
    }

    onPress = async () => {
        if (this.state.permission == 'granted') {
            let location = await Location.getCurrentPositionAsync({});
            this.setState({ location });
            this.props.getLocation(location);
            console.log(location);
        }
    };

    render() {
        let content = <Text style={{ height: 50, textAlign: 'center' }}>Permission Denied</Text>;
        if (this.state.permission == 'undetermined') {
            content = (
                <Text style={{ height: 50, textAlign: 'center' }}>Waiting for Permissions</Text>
            );
        } else {
            content = null;
        }

        return (
            <View style={{ margin: 10, marginTop: 5 }}>
                <Button
                    size="small"
                    style={{ borderRadius: 8 }}
                    onPress={this.onPress}
                    disabled={!!this.state.location}
                >
                    {!this.state.location ? 'Attach Location' : 'Location Attached'}
                </Button>
                {content}
            </View>
        );
    }
}

export default LocationPicker;
