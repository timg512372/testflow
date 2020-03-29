import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChatBox from '../components/ChatBox';
import axios from 'axios';
import { Badge, Popover } from 'antd';
import * as types from '../redux/types';
import GoogleMapReact from 'google-map-react';

class TrackerPage extends Component {
    static async getInitialProps({ store }) {
        store.dispatch({ type: types.CHANGE_PAGE, payload: 't' });
        console.log('getInitialProps');
    }

    state = {
        text: ''
    };

    renderNumbers = () => {
        const data = [
            { text: 'Number Tested', num: 20000 },
            { text: 'Nationwide Stock of Tests', num: 800 },
            { text: 'Hospitals Facing Shortages', num: 400 }
        ];

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    width: '100%'
                }}
            >
                {data.map(point => (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ fontSize: '300%', color: '#425eac' }}>{point.num}</div>
                        <div>{point.text}</div>
                    </div>
                ))}
            </div>
        );
    };

    handleApiLoaded = (map, maps) => {
        let marker = maps.Marker({
            position: {
                lat: 40,
                lng: -96
            },
            map: map
        });
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
                <h1>Updated COVID-19 Test Statistics</h1>
                {this.renderNumbers()}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        width: '100%',
                        marginTop: '2vh'
                    }}
                >
                    <div style={{ height: '70vh', width: '100%' }}>
                        <GoogleMapReact
                            bootstrapURLKeys={{ key: process.env.GOOGLE_MAPS_API_KEY }}
                            defaultCenter={{
                                lat: 40,
                                lng: -96
                            }}
                            defaultZoom={4}
                            // yesIWantToUseGoogleMapApiInternals
                            // onGoogleApiLoaded={({ map, maps }) => this.handleApiLoaded(map, maps)}
                        >
                            <Popover
                                title={<div style={{ textAlign: 'center' }}>Hoag Irvine</div>}
                                lat={40}
                                lng={-96}
                                placement="top"
                                content={
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            flexDirection: 'column'
                                        }}
                                    >
                                        <h5> Inventory: 400 Tests </h5>
                                        <h5> Shipped: 200 Tests </h5>
                                    </div>
                                }
                            >
                                <Badge count={400} overflowCount={1000000} color="blue" />
                            </Popover>
                        </GoogleMapReact>
                    </div>

                    <div
                        style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            flexDirection: 'column'
                        }}
                    >
                        help
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

export default connect(mapStateToProps, null)(TrackerPage);
