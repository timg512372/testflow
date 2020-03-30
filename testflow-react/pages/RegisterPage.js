import React, { Component } from 'react';
import { Button, Input } from 'antd';
import { connect } from 'react-redux';
import { NextSeo } from 'next-seo';
import * as types from '../redux/types';
import { registerUser } from '../redux/actions';

class Register extends Component {
    static getInitialProps({ store, query }) {
        store.dispatch({ type: types.CHANGE_PAGE, payload: '~' });
        return { admin: query.type === 'admin' };
    }

    state = {
        institution: '',
        userName: '',
        password: '',
        password_confirm: '',
        location: ''
    };

    handleRegister = async () => {
        const user = {
            institution: this.state.institution,
            userName: this.state.userName,
            password: this.state.password,
            password_confirm: this.state.password_confirm,
            location: this.state.location,
            role: 'factory'
        };

        this.props.registerUser(user);
    };

    render() {
        return (
            <>
                <div
                    style={{
                        width: '60vw',
                        margin: '0 20vw 0 20vw',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <h1 style={{ textAlign: 'center', margin: '1vw 0 1vw 0' }}>
                        Register for TestFlow as an Manufacturer
                    </h1>

                    <div style={styles.inputdiv}>
                        <h3 style={styles.prompt}> Institution Name: </h3>
                        <Input
                            onChange={event => this.setState({ institution: event.target.value })}
                            style={styles.input}
                            value={this.state.Institution}
                        />
                    </div>

                    <div style={styles.inputdiv}>
                        <h3 style={styles.prompt}> Username: </h3>
                        <Input
                            onChange={event => this.setState({ userName: event.target.value })}
                            style={styles.input}
                            value={this.state.userName}
                        />
                    </div>
                    <div style={styles.inputdiv}>
                        <h3 style={styles.prompt}> Password: </h3>
                        <Input.Password
                            onChange={event => this.setState({ password: event.target.value })}
                            placeholder=""
                            style={styles.input}
                            value={this.state.password}
                        />
                    </div>
                    <div style={styles.inputdiv}>
                        <h3 style={styles.prompt}> Confirm Password: </h3>
                        <Input.Password
                            onChange={event =>
                                this.setState({ password_confirm: event.target.value })
                            }
                            placeholder=""
                            style={styles.input}
                            value={this.state.password_confirm}
                        />
                    </div>
                    <div style={styles.inputdiv}>
                        <h3 style={styles.prompt}> Location: </h3>
                        <Input
                            onChange={event => this.setState({ location: event.target.value })}
                            style={styles.input}
                            value={this.state.location}
                        />
                    </div>

                    {this.state.error1 ? (
                        <div style={{ color: 'red', textAlign: 'center' }}>
                            {this.state.error1}{' '}
                        </div>
                    ) : null}
                    <div
                        style={{
                            width: '60vw',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-around'
                        }}
                    >
                        <Button type="dashed" href="/">
                            Back
                        </Button>
                        <Button type="primary" onClick={this.handleRegister}>
                            Register
                        </Button>
                    </div>
                </div>
            </>
        );
    }
}

const styles = {
    inputdiv: {
        width: '60vw',
        margin: '1vw',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'start'
    },
    prompt: {
        width: '10vw'
    }
};

const mapStateToProps = state => {
    const { loading, error } = state.auth;
    return { loading, error };
};

export default connect(
    mapStateToProps,
    { registerUser }
)(Register);
