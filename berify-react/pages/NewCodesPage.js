import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChatBox from '../components/ChatBox';
import axios from 'axios';
import { Tabs, Radio, Button, Select, InputNumber, Modal, Card } from 'antd';
import * as types from '../redux/types';
import { Router } from '../routes';

class TrackerPage extends Component {
    static async getInitialProps({ store }) {
        store.dispatch({ type: types.CHANGE_PAGE, payload: 'g' });
    }

    componentDidMount = async () => {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
        const { data } = await axios.get(`${process.env.SERVER_URL}/api/test/batches`);
        this.setState({ batches: data.batches });

        console.log(data.batches);
    };

    state = {
        quantity: 0,
        downloadLoading: '',
        batches: [],
        loading: ''
    };

    downloadFile = async (codes, index) => {
        this.setState({ downloadLoading: index });
        await codes.forEach((element, index) => {
            fetch('https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=' + element)
                .then(response => response.blob())
                .then(blob => {
                    // 2. Create blob link to download
                    const url = window.URL.createObjectURL(new Blob([blob]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', `sample${index}.jpg`);
                    // 3. Append to html page
                    document.body.appendChild(link);
                    // 4. Force download
                    link.click();
                    // 5. Clean up and remove the link
                    link.parentNode.removeChild(link);
                    this.setState({ downloadLoading: '' });
                });
        });
    };

    renderCards = () => {
        return this.state.batches.map((batch, index) => {
            return (
                <Card title={batch.date} style={{ width: 300 }}>
                    <h3>{batch.QRs.length} Codes</h3>
                    <Button
                        loading={this.state.downloadLoading === index}
                        onClick={() => this.downloadFile(batch.QRs, index)}
                    >
                        Download
                    </Button>
                </Card>
            );
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
                <h1 style={{ textAlign: 'center' }}>
                    Please Input the Number of QR Codes Required
                </h1>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-around'
                    }}
                >
                    <InputNumber
                        onChange={quantity => this.setState({ quantity })}
                        style={{ width: '70vw', margin: '0px 10px 0px 0px' }}
                        value={this.state.quantity}
                    ></InputNumber>
                    <Button
                        type="primary"
                        loading={this.state.loading}
                        onClick={async () => {
                            this.setState({ loading: true });
                            axios.defaults.headers.common['Authorization'] = localStorage.getItem(
                                'jwtToken'
                            );

                            await axios.post(`${process.env.SERVER_URL}/api/test/new`, {
                                quantity: this.state.quantity
                            });

                            const { data } = await axios.get(
                                `${process.env.SERVER_URL}/api/test/batches`
                            );
                            this.setState({ batches: data.batches, quantity: 0, loading: false });
                        }}
                    >
                        Submit
                    </Button>
                </div>
                <h1 style={{ textAlign: 'center', marginTop: '20px' }}>Past QR Code Requests</h1>
                <div
                    style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap'
                    }}
                >
                    {this.renderCards()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { user, isAuthenticated, error } = state.auth;
    return { user, isAuthenticated, error };
};

export default connect(
    mapStateToProps,
    null
)(TrackerPage);
