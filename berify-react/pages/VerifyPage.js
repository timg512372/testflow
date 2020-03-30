import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChatBox from '../components/ChatBox';
import axios from 'axios';
import { Card, Badge } from 'antd';
import * as types from '../redux/types';
import { CheckSquareOutlined, CloseSquareOutlined, DownCircleFilled } from '@ant-design/icons';
import GoogleMapReact from 'google-map-react';

class VerifyPage extends Component {
    static async getInitialProps({ store }) {
        store.dispatch({ type: types.CHANGE_PAGE, payload: 'v' });
        console.log('getInitialProps');
    }

    state = {
        text: '',
        loaded: false,
        factories: ''
    };

    locationData = {};

    async componentDidMount() {
        this.setState({ loaded: false });
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
        let { data } = await axios.get(`${process.env.SERVER_URL}/api/test/manufacturers`);

        let promises = data.manufacturers.map(async factory => {
            let response = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
                    factory.location
                )}&key=${process.env.GOOGLE_MAPS_API_KEY}`
            );
            let json = await response.json();
            factory.location = json.results[0]
                ? json.results[0].geometry.location
                : { lat: 0, lng: 0 };
            return factory;
        });

        let factories = await Promise.all(promises);
        console.log(factories);
        this.setState({ factories, loaded: true });
    }

    verify = async factory => {
        await axios.post(`${process.env.SERVER_URL}/api/test/certify`, {
            factory: factory.address
        });
        this.componentDidMount();
    };

    renderCards = (factories, verified) => {
        if (!this.state.loaded) {
            return <h3> Loading </h3>;
        }
        return (
            <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row' }}>
                {factories
                    .filter(factory => factory.certification == verified)
                    .map((factory, index) => (
                        <Card
                            style={{
                                width: '20vw',
                                margin: '1vw',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}
                            actions={[
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                    onClick={!verified ? () => this.verify(factory) : null}
                                >
                                    {!verified ? (
                                        <>
                                            <CheckSquareOutlined />
                                            &ensp;Verify
                                        </>
                                    ) : (
                                        <>
                                            <CloseSquareOutlined />
                                            &ensp;Remove Verification
                                        </>
                                    )}
                                </div>
                            ]}
                        >
                            <h1 style={{ textAlign: 'center' }}>{factory.institution}</h1>
                            <div
                                style={{
                                    width: '18vw',
                                    height: '11vw'
                                }}
                            >
                                <GoogleMapReact
                                    bootstrapURLKeys={{ key: process.env.GOOGLE_MAPS_API_KEY }}
                                    defaultCenter={factory.location}
                                    defaultZoom={6}
                                >
                                    <Badge
                                        lat={factory.location.lat}
                                        lng={factory.location.lng}
                                        count={
                                            <DownCircleFilled
                                                style={{
                                                    color: '#425eac'
                                                }}
                                            />
                                        }
                                    />
                                </GoogleMapReact>
                            </div>
                        </Card>
                    ))}
            </div>
        );
    };

    render() {
        return (
            <div
                style={{
                    width: '94vw',
                    margin: '3vw',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <h1>Verify Test Kit Manufacturers</h1>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        width: '100%',
                        marginTop: '2vh'
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                            alignItems: 'center'
                        }}
                    >
                        <h2>Not Approved Manufacturers</h2>
                        {this.renderCards(this.state.factories, false)}
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                            alignItems: 'center'
                        }}
                    >
                        <h2>Approved Manufacturers</h2>
                        {this.renderCards(this.state.factories, true)}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { user, isAuthenticated, error } = state.auth;
    return { user, isAuthenticated, error };
};

export default connect(mapStateToProps, null)(VerifyPage);
