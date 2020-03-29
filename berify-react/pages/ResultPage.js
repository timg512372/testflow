import React, { Component } from 'react';

import { connect } from 'react-redux';

import ChatBox from '../components/ChatBox';

import axios from 'axios';

import { Router } from '../routes';

import { Tabs, Radio, Button, Select, Input, Modal } from 'antd';

import * as types from '../redux/types';

class ResultPage extends React.Component {
    static async getInitialProps({ store }) {
        store.dispatch({ type: types.CHANGE_PAGE, payload: 'r' });
    }

    constructor() {
        super();
        this.state = { text: '', id: '', error: '' };
    }

    positiveOrNegative = () => {
        var posOrNeg = Math.random() * (1 - 0) + 0;

        if (posOrNeg < 0.5) {
            this.setState({ text: 'Positive' });
        } else {
            this.setState({ text: 'Negative' });
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
                        id="text1"
                        onChange={event => this.setState({ id: event.target.value })}
                        style={{ width: '70vw' }}
                    ></Input>
                    <Button
                        type="primary"
                        onClick={this.positiveOrNegative}
                        style={{ marginLeft: '20px' }}
                    >
                        Submit
                    </Button>
                </div>
                <h2 style={{ margin: '20px' }}>{this.state.text}</h2>
                <div style={{ color: 'red' }}>{this.state.error}</div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { user, isAuthenticated, error } = state.auth;
    return { user, isAuthenticated, error };
};

export default connect(mapStateToProps, null)(ResultPage);
