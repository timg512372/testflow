import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChatBox from '../components/ChatBox';
import axios from 'axios';
import { Tabs, Radio, Button, Select, Input, Modal } from 'antd';
import * as types from '../redux/types';
import { Router } from '../routes';

class TrackerPage extends Component {
    static async getInitialProps({ store }) {
        store.dispatch({ type: types.CHANGE_PAGE, payload: 't' });
        console.log('getInitialProps');
    }

    state = {
        text: ''
    };

    render() {
        return (
            <div style={{ width: '90vw', margin: '3vw' }}>
                <h2>FDA Tracker Page (Don't edit for now, I'm still working through it)</h2>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { user, isAuthenticated, error } = state.auth;
    return { user, isAuthenticated, error };
};

export default connect(mapStateToProps, null)(TrackerPage);
