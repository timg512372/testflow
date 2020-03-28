import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChatBox from '../components/ChatBox';
import axios from 'axios';
import { Tabs, Radio, Button, Select, Input, Modal } from 'antd';
import * as types from '../redux/types';
import { Router } from '../routes';

class TrackerPage extends Component {
    static async getInitialProps({ store }) {
        store.dispatch({ type: types.CHANGE_PAGE, payload: 'r' });
        console.log('getInitialProps');
    }

    state = {
        text: ''
    };

    render() {
        return (
            <div style={{ width: '90vw', margin: '3vw' }}>
                <h2>Results Page (Tyler)</h2>
                <h2>
                    {' '}
                    Need to be able to enter a code, press a button, and show whether the test
                    result is positive or negative, or that the test hasn't been tested yet{' '}
                </h2>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { user, isAuthenticated, error } = state.auth;
    return { user, isAuthenticated, error };
};

export default connect(mapStateToProps, null)(TrackerPage);
