import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutUser, loginUser } from '../redux/actions/auth_actions';
import { LogoutOutlined } from '@ant-design/icons';
import { Divider, Icon, Button, Input } from 'antd';
import { Router } from '../routes';

class PlayerInfo extends Component {
    state = {
        userName: '',
        password: ''
    };

    submit = async () => {
        const user = {
            userName: this.state.userName,
            password: this.state.password
        };

        this.props.loginUser(user);
    };

    renderNotLoggedIn() {
        return (
            <div
                style={{
                    padding: '10px',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        textAlign: 'center'
                    }}
                >
                    <h2> Log In </h2>
                    <Input
                        style={{ marginBottom: '10px' }}
                        placeholder="Username"
                        onChange={event =>
                            this.setState({
                                userName: event.target.value
                            })
                        }
                    />
                    <Input
                        placeholder="Password"
                        type="password"
                        onChange={event =>
                            this.setState({
                                password: event.target.value
                            })
                        }
                    />
                    <Button
                        type="primary"
                        style={{ margin: '20px 20px 0px 20px' }}
                        onClick={this.submit}
                    >
                        Log In
                    </Button>

                    {this.props.error ? (
                        <h3
                            style={{
                                textAlign: 'center',
                                color: 'red',
                                margin: '10px 0px -10px 0px'
                            }}
                        >
                            Login Error!
                        </h3>
                    ) : null}
                </div>
                <hr style={{ margin: '10px 0 10px 0' }} />
                <Button
                    style={{ margin: '0px 20px 0 20px' }}
                    onClick={() => Router.push('/register')}
                >
                    Register
                </Button>
            </div>
        );
    }

    renderLoggedIn() {
        const full = (
            <div
                style={{
                    padding: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    <span style={{ fontSize: '120%' }}> Signed in as </span>
                    <span
                        style={{
                            fontSize: '150%',
                            color: '#10004e',
                            fontWeight: '600'
                        }}
                    >
                        {this.props.user.userName}
                    </span>
                </div>

                <Divider />

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        textAlign: 'center'
                    }}
                >
                    <div style={{ marginBottom: '20px' }}>
                        <span style={{ fontWeight: '600' }}> Address:&ensp;&nbsp;</span>
                        <br />
                        <span style={{ fontSize: '90% ' }}>{this.props.user.address}</span>
                    </div>
                </div>

                <Button
                    icon={<LogoutOutlined />}
                    onClick={() => this.props.logoutUser(() => Router.push('/'))}
                    type="danger"
                    style={{ width: '220px' }}
                >
                    Logout
                </Button>
            </div>
        );

        return full;
    }

    render() {
        return this.props.isAuthenticated ? this.renderLoggedIn() : this.renderNotLoggedIn();
    }
}

const mapStateToProps = state => {
    const { user, isAuthenticated, error } = state.auth;
    return { user, isAuthenticated, error };
};

export default connect(
    mapStateToProps,
    { loginUser, logoutUser }
)(PlayerInfo);
