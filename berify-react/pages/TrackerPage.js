import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChatBox from '../components/ChatBox';
import axios from 'axios';
import { Badge, Popover } from 'antd';
import * as types from '../redux/types';
import GoogleMapReact from 'google-map-react';
import {
    LineChart,
    CartesianGrid,
    Line,
    Tooltip,
    Legend,
    XAxis,
    YAxis,
    PieChart,
    Pie
} from 'recharts';

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
            { text: 'Hospitals Facing Shortages', num: 400 },
            { text: 'In Transit', num: 330 }
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
                            // yesIWantToUsedGoogleMapApiInternals
                            // onGoogleApiLoaded={({ map, maps }) => this.handleApiLoaded(map, maps)}
                        >
                            <Popover
                                title={<div style={{ textAlign: 'center' }}>Hoag "Irvine"</div>}
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
                        <h2> Test Kit Distribution over Time </h2>
                        <LineChart
                            width={730}
                            height={250}
                            data={data}
                            margin={{ top: 5, right: 30, left: 20, bottom: 30 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="Produced" stroke="#8884d8" />
                            <Line type="monotone" dataKey="Used" stroke="#82ca9d" />
                            <Line type="monotone" dataKey="Processed" stroke="#000000" />
                        </LineChart>

                        <h2> Testing Center Inventory </h2>

                        <PieChart width={730} height={250}>
                            <Pie
                                data={data02}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                fill="#8884d8"
                                label={props => {
                                    console.log(props);
                                    return `${props.name}: ${props.value} centers`;
                                }}
                                legendType="line"
                            />
                        </PieChart>
                    </div>
                </div>
            </div>
        );
    }
}

const data02 = [
    {
        name: 'None',
        value: 2400
    },
    {
        name: 'Critically Low',
        value: 3908
    },
    {
        name: 'Low',
        value: 4567
    },
    {
        name: 'Adequate',
        value: 1398
    },
    {
        name: 'Above Average',
        value: 1398
    },
    {
        name: 'High',
        value: 9800
    }
];

const data = [
    {
        name: '3/3/20',
        Used: 4000,
        Produced: 2400,
        Processed: 2400
    },
    {
        name: '3/4/20',
        Used: 3000,
        Produced: 1398,
        Processed: 2210
    },
    {
        name: '3/5/20',
        Used: 2000,
        Produced: 9800,
        Processed: 2290
    },
    {
        name: '3/6/20',
        Used: 2780,
        Produced: 3908,
        Processed: 2000
    },
    {
        name: '3/7/20',
        Used: 1890,
        Produced: 4800,
        Processed: 2181
    },
    {
        name: '3/8/20',
        Used: 2390,
        Produced: 3800,
        Processed: 2500
    },
    {
        name: '3/9/20',
        Used: 3490,
        Produced: 4300,
        Processed: 2100
    }
];

const mapStateToProps = state => {
    const { user, isAuthenticated, error } = state.auth;
    return { user, isAuthenticated, error };
};

export default connect(mapStateToProps, null)(TrackerPage);
