import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChatBox from '../components/ChatBox';
import axios from 'axios';
import { Tabs, Radio, Button, Select, Input, Modal } from 'antd';
import * as types from '../redux/types';
import { Router } from '../routes';
//comment
class TrackerPage extends Component {
    static async getInitialProps({ store }) {
        store.dispatch({ type: types.CHANGE_PAGE, payload: 'g' });
        console.log('getInitialProps');
    }

    state = {
        text: ''
    };

    render() {
        return (
            <div style={{ width: '90vw', margin: '3vw' }}>
                <h2>Please Input the Number of QR Codes Required</h2>
                    <Input type="basicusage" style={{width: '90%', margin: '0px 10px 0px 0px'}}></Input>
                    <Button type="primary">Submit</Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { user, isAuthenticated, error } = state.auth;
    return { user, isAuthenticated, error };
};

export default connect(mapStateToProps, null)(TrackerPage);
