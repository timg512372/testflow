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
        text: ''
    };

    renderCards = (factories, verified) => {
        return (
            <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row' }}>
                {factories.map(factory => (
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
        const dummyData = {
            no: [
                {
                    name: 'Bad Factory',
                    location: { lat: 40, lng: -100 }
                },
                {
                    name: 'Bad Factory',
                    location: { lat: 40, lng: -100 }
                },
                {
                    name: 'Bad Factory',
                    location: { lat: 40, lng: -100 }
                },
                {
                    name: 'Bad Factory',
                    location: { lat: 40, lng: -100 }
                },
                {
                    name: 'Bad Factory',
                    location: { lat: 40, lng: -100 }
                },
                {
                    name: 'Bad Factory',
                    location: { lat: 40, lng: -100 }
                },
                {
                    name: 'Bad Factory',
                    location: { lat: 40, lng: -100 }
                },
                {
                    name: 'Bad Factory',
                    location: { lat: 40, lng: -100 }
                },
                {
                    name: 'Bad Factory',
                    location: { lat: 40, lng: -100 }
                }
            ],
            yes: [
                {
                    name: 'Good Factory',
                    location: { lat: 40, lng: -100 }
                }
            ]
        };

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

const mapStateToProps = state => {
    const { user, isAuthenticated, error } = state.auth;
    return { user, isAuthenticated, error };
};

export default connect(mapStateToProps, null)(VerifyPage);
