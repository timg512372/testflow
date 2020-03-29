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
        loaded: false
    };

    locationData = {};

    async componentDidMount() {
        let noLocationData = dummyData.no.map(async factory => {
            let { data } = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
                params: {
                    address: factory.location,
                    key: process.env.GOOGLE_MAPS_API_KEY
                }
            });
            if (data.results[0]) {
                return data.results[0].geometry.location;
            } else return { lat: 0, lng: 0 };
        });

        let yesLocationData = dummyData.yes.map(async factory => {
            let { data } = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
                params: {
                    address: factory.location,
                    key: process.env.GOOGLE_MAPS_API_KEY
                }
            });
            if (data.results[0]) {
                return data.results[0].geometry.location;
            } else return { lat: 0, lng: 0 };
        });

        this.locationData.no = await Promise.all(noLocationData);
        this.locationData.yes = await Promise.all(yesLocationData);

        this.setState({ loaded: true });
        console.log(this.locationData);
    }

    renderCards = (factories, verified) => {
        return (
            <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row' }}>
                {factories.map((factory, index) => (
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
                        <h1 style={{ textAlign: 'center' }}>{factory.name}</h1>
                        <div
                            style={{
                                width: '18vw',
                                height: '11vw'
                            }}
                        >
                            {this.state.loaded ? (
                                <GoogleMapReact
                                    bootstrapURLKeys={{ key: process.env.GOOGLE_MAPS_API_KEY }}
                                    defaultCenter={
                                        this.locationData[verified ? 'yes' : 'no'][index]
                                    }
                                    defaultZoom={6}
                                >
                                    <Badge
                                        lat={this.locationData[verified ? 'yes' : 'no'][index].lat}
                                        lng={this.locationData[verified ? 'yes' : 'no'][index].lng}
                                        count={
                                            <DownCircleFilled
                                                style={{
                                                    color: '#425eac'
                                                }}
                                            />
                                        }
                                    />
                                </GoogleMapReact>
                            ) : (
                                'Loading Map...'
                            )}
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
                        {this.renderCards(dummyData.no, false)}
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
                        {this.renderCards(dummyData.yes, true)}
                    </div>
                </div>
            </div>
        );
    }
}

const dummyData = {
    no: [
        {
            name: 'Bad Factory',
            location: 'Baltimore, MD'
        },
        {
            name: 'Bad Factory',
            location: 'Washington, DC'
        },
        {
            name: 'Bad Factory',
            location: 'Irvine, CA'
        },
        {
            name: 'Bad Factory',
            location: 'New York, NY'
        },
        {
            name: 'Bad Factory',
            location: 'Seattle, WA'
        },
        {
            name: 'Bad Factory',
            location: 'Chicago, IL'
        }
    ],
    yes: [
        {
            name: 'Good Factory',
            location: 'San Francisco, CA'
        }
    ]
};

const mapStateToProps = state => {
    const { user, isAuthenticated, error } = state.auth;
    return { user, isAuthenticated, error };
};

export default connect(mapStateToProps, null)(VerifyPage);
