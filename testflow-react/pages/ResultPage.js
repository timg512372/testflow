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
        test: {},
        loading: false,
        error: ''
    };

    check = async () => {
        this.setState({ loading: true });
        try {
            const { data } = await axios.post(`${process.env.SERVER_URL}/api/test/defaultCheck`, {
                testId: this.state.testId
            });
            console.log(data.test);
            this.setState({ test: data.test, loading: false });
        } catch (e) {
            console.log(e);
            this.setState({ loading: false, error: e.message });
        }
    };

    renderInstructions = result => {
        if (result == 'positive') {
            return (
                <ul>
                    <li>
                        Seek medical treatment (make sure to call your hospital beforehand if you
                        plan on going).
                    </li>
                    <li>Practice social distancing.</li>
                    <li>Take precautions as not to infect others (wearing a mask).</li>
                </ul>
            );
        }

        if (result == 'negative') {
            return (
                <ul>
                    <li>Practice social distancing.</li>
                    <li>Support local businesses.</li>
                    <li>Find ways of helping out hospitals.</li>
                </ul>
            );
        }

        if (result == 'inconclusive') {
            return (
                <ul>
                    <li>Practice social distancing.</li>
                    <li>Support local businesses.</li>
                    <li>Find ways of helping out hospitals.</li>
                </ul>
            );
        }
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
                    <Button
                        type="primary"
                        onClick={this.check}
                        style={{ marginLeft: '20px' }}
                        loading={this.state.loading}
                    >
                        Submit
                    </Button>
                </div>

                {this.state.test.result ? (
                    <Card style={{ marginTop: '20px' }}>
                        <h2 style={{ fontWeight: 'bold' }}>Which factory made this?</h2>
                        <h3>
                            {this.state.test.factoryUser.institution} ({this.state.test.factory})
                        </h3>

                        <h2 style={{ fontWeight: 'bold' }}>Where is the test now?</h2>
                        <h3>
                            {this.state.test.authorityUser.institution} ({this.state.test.authority}
                            )
                        </h3>

                        <h2 style={{ fontWeight: 'bold' }}>When was this test produced?</h2>
                        <h3>
                            {new Date(Number(this.state.test.date) * 1000).toLocaleDateString(
                                'en-US'
                            )}
                        </h3>

                        <h2 style={{ fontWeight: 'bold' }}>Is this test certified?</h2>
                        <h3>{this.state.test.certified ? 'Yes' : 'No'}</h3>

                        <h2 style={{ fontWeight: 'bold' }}>What is the result of this test?</h2>
                        <h3>
                            {this.state.test.tested ? this.state.test.result : 'Awaiting Results'}
                        </h3>

                        {this.state.test.tested ? (
                            <div>
                                <h2 style={{ fontWeight: 'bold' }}>What should I do now?</h2>
                                {this.renderInstructions(this.state.test.result)}
                            </div>
                        ) : null}
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

export default connect(mapStateToProps, null)(ResultPage);
