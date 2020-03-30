import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Button, Select, Input, Modal, Card } from 'antd';
import * as types from '../redux/types';

class ResultPage extends React.Component {
    static async getInitialProps({ store }) {
        store.dispatch({ type: types.CHANGE_PAGE, payload: 'r' });
    }

    state = {
        testId: '',
        test: {}
    };

    check = async () => {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
        const { data } = await axios.post(`${process.env.SERVER_URL}/api/test/defaultCheck`, {
            testId: this.state.testId
        });
        this.setState({ test: data.test });

        console.log(data.test);
    };

    render() {
        return (
            <div
                style={{
                    width: '94vw',
                    margin: '3vw',
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <h1 style={{ textAlign: 'center' }}>Please Enter Your Code For Your Results</h1>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}
                >
                    <Input
                        onChange={event => this.setState({ testId: event.target.value })}
                        style={{ width: '70vw' }}
                    ></Input>
                    <Button type="primary" onClick={this.check} style={{ marginLeft: '20px' }}>
                        Submit
                    </Button>
                </div>

                {this.state.test.result ? (
                    <Card style={{ marginTop: '20px' }}>
                        <h2>Factory</h2>
                        <h3>{this.state.test.factory}</h3>

                        <h2>Authority</h2>
                        <h3>{this.state.test.authority}</h3>

                        <h2>Date</h2>
                        <h3>{this.state.test.date}</h3>

                        <h2>Result</h2>
                        <h3>{this.state.test.result ? 'Positive' : 'Negative'}</h3>
                    </Card>
                ) : null}
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { user, isAuthenticated } = state.auth;
    return { user, isAuthenticated };
};

export default connect(
    mapStateToProps,
    null
)(ResultPage);
