import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChatBox from '../components/ChatBox';
import axios from 'axios';
import { Badge, Popover, Button } from 'antd';
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
        text: '',
        loading: true,
        data: {},
        factories: [],
        hospitals: [],
        labs: []
    };

    componentDidMount = async () => {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');

        let { data } = await axios.get(`${process.env.SERVER_URL}/api/test/track`);
        console.log(data);

        let factoryPromises = data.factories.map(async factory => {
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

        let hospitalPromises = data.hospitals.map(async factory => {
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

        let labPromises = data.labs.map(async factory => {
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

        let factories = Promise.all(factoryPromises);
        let hospitals = Promise.all(hospitalPromises);
        let labs = Promise.all(labPromises);

        let array = await Promise.all([factories, hospitals, labs]);
        console.log(array);

        this.setState({
            loading: false,
            data,
            factories: array[0],
            hospitals: array[1],
            labs: array[2]
        });
    };

    renderNumbers = () => {
        const data = [
            { text: 'Number Tested', num: this.state.data.tested },
            { text: 'Nationwide Stock of Tests', num: this.state.data.stock },
            {
                text: 'Hospitals Facing Shortages',
                num: this.state.hospitals.filter(hospital => hospital.inStock == 0).length
            },
            { text: 'In Transit', num: this.state.data.inTransit }
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

    renderMarkers() {
        const markers = [];

        markers.push(
            this.state.hospitals.map(hospital => (
                <Popover
                    title={<div style={{ textAlign: 'center' }}>{hospital.institution}</div>}
                    lat={hospital.location.lat}
                    lng={hospital.location.lng}
                    placement="top"
                    key={hospital.institution}
                    content={
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                flexDirection: 'column'
                            }}
                        >
                            <h5> Inventory: {hospital.inStock} Tests </h5>
                            <h5> Shipped: {hospital.shipped} Tests </h5>
                        </div>
                    }
                >
                    <Badge count={400} overflowCount={1000000} color="blue" />
                </Popover>
            ))
        );

        markers.push(
            this.state.labs.map(lab => (
                <Popover
                    title={<div style={{ textAlign: 'center' }}>{lab.institution}</div>}
                    lat={lab.location.lat}
                    lng={lab.location.lng}
                    placement="top"
                    key={lab.institution}
                    content={
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                flexDirection: 'column'
                            }}
                        >
                            <h5> Inventory: {lab.inStock} Tests </h5>
                            <h5> Tested: {lab.tested} Tests </h5>
                        </div>
                    }
                >
                    <Badge count={400} overflowCount={1000000} color="orange" />
                </Popover>
            ))
        );

        markers.push(
            this.state.labs.map(lab => (
                <Popover
                    title={<div style={{ textAlign: 'center' }}>{lab.institution}</div>}
                    lat={lab.location.lat}
                    lng={lab.location.lng}
                    placement="top"
                    key={lab.institution}
                    content={
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                flexDirection: 'column'
                            }}
                        >
                            <h5> Inventory: {lab.inStock} Tests </h5>
                            <h5> Tested: {lab.tested} Tests </h5>
                        </div>
                    }
                >
                    <Badge count={400} overflowCount={1000000} color="orange" />
                </Popover>
            ))
        );

        markers.push(
            this.state.factories.map(factory => (
                <Popover
                    title={<div style={{ textAlign: 'center' }}>{factory.institution}</div>}
                    lat={factory.location.lat}
                    lng={factory.location.lng}
                    placement="top"
                    key={factory.institution}
                    content={
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                flexDirection: 'column'
                            }}
                        >
                            <h5> Produced: {factory.produced} Tests </h5>
                            <h5> Shipped: {factory.shipped} Tests </h5>
                        </div>
                    }
                >
                    <Badge count={400} overflowCount={1000000} color="red" />
                </Popover>
            ))
        );

        return markers;
    }

    getPieData = () => {
        const thresholds = [
            {
                name: 'None',
                value: 0
            },
            {
                name: 'Critically Low',
                value: 1
            },
            {
                name: 'Low',
                value: 2
            },
            {
                name: 'Adequate',
                value: 3
            },
            {
                name: 'Above Average',
                value: 4
            },
            {
                name: 'High',
                value: 5
            }
        ];

        const data = thresholds.map(key => ({ name: key.name, value: 1 }));
        this.state.hospitals.forEach(hospital => {
            data[hospital.inStock].value++;
        });

        return data;
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
                {this.state.loading ? (
                    <h1>Retrieving Data</h1>
                ) : (
                    <>
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
                                >
                                    {this.renderMarkers()}
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
                                <h6> (Hypothetical) </h6>
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

                                <PieChart width={730} height={300}>
                                    <Pie
                                        data={this.getPieData()}
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
                    </>
                )}
            </div>
        );
    }
}

const data = [
    {
        name: '3/3/20',
        Used: 4,
        Produced: 2.4,
        Processed: 2.4
    },
    {
        name: '3/5/20',
        Used: 3,
        Produced: 1.4,
        Processed: 2.2
    },
    {
        name: '3/7/20',
        Used: 2.2,
        Produced: 9,
        Processed: 2.2
    },
    {
        name: '3/9/20',
        Used: 2.7,
        Produced: 3.9,
        Processed: 2
    },
    {
        name: '3/11/20',
        Used: 1.9,
        Produced: 4.8,
        Processed: 2.2
    },
    {
        name: '3/13/20',
        Used: 2.4,
        Produced: 3.8,
        Processed: 2.5
    },
    {
        name: '3/15/20',
        Used: 3.5,
        Produced: 4.3,
        Processed: 2.1
    },
    {
        name: '3/17/20',
        Used: 4,
        Produced: 2.4,
        Processed: 2.4
    },
    {
        name: '3/19/20',
        Used: 5.7,
        Produced: 1.8,
        Processed: 2.2
    },
    {
        name: '3/21/20',
        Used: 3.8,
        Produced: 7,
        Processed: 2.2
    },
    {
        name: '3/23/20',
        Used: 2.7,
        Produced: 3.9,
        Processed: 6.8
    },
    {
        name: '3/25/20',
        Used: 1.9,
        Produced: 1.4,
        Processed: 6.1
    },
    {
        name: '3/27/20',
        Used: 2.4,
        Produced: 3.8,
        Processed: 2.5
    },
    {
        name: '3/29/20',
        Used: 3.5,
        Produced: 4.3,
        Processed: 2.1
    }
];

const mapStateToProps = state => {
    const { user, isAuthenticated, error } = state.auth;
    return { user, isAuthenticated, error };
};

export default connect(mapStateToProps, null)(TrackerPage);
