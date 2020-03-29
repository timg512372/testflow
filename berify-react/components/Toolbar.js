import React, { Component } from 'react';
import Link from 'next/link';
import { Router } from '../routes';
import { connect } from 'react-redux';
import { Popover, Icon } from 'antd';
import UserInfo from './UserInfo';
import axios from 'axios';
import {
    QuestionCircleOutlined,
    DashboardOutlined,
    UserOutlined,
    CheckCircleOutlined,
    QrcodeOutlined,
    ProjectOutlined
} from '@ant-design/icons';
import '../styles.less';

const MUST_LOG_IN = [''];

class Toolbar extends Component {
    componentDidMount() {
        console.log(this.props.user);
        if (!this.props.isAuthenticated && MUST_LOG_IN.includes(this.props.page)) {
            Router.push('/notloggedin');
        }
    }

    renderLink(name, page, icon, href, onClick, noMargin) {
        return (
            <React.Fragment>
                <li
                    className="nav-item"
                    style={{ margin: `${noMargin ? '3px 0px' : '6px 25px'} 0px 0px` }}
                >
                    <Link href={href} passHref>
                        <a
                            className={this.props.page === page ? 'active' : 'inactive'}
                            onClick={onClick}
                            href={href}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                            >
                                {icon}
                                <div style={{ width: '5px' }}></div>
                                {name}
                            </div>
                        </a>
                    </Link>
                </li>
                <style jsx>{`
                    a {
                        color: #000000;
                    }
                    a:hover {
                        color: #425eac;
                        text-decoration: none;
                    }
                    .active {
                        color: #425eac;
                        text-decoration: none;
                    }
                    ul {
                        list-style-type: none;
                    }
                `}</style>
            </React.Fragment>
        );
    }

    render() {
        return (
            <div>
                <React.Fragment>
                    {/* Render Toolbar */}
                    <nav
                        className="navbar navbar-expand-lg navbar-light bg-light"
                        style={styles.navBar}
                    >
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}
                        >
                            <a
                                className="navbar-brand"
                                style={{
                                    fontSize: '30px',
                                    margin: 0,
                                    color: '#569ab1',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}
                                href="/"
                            >
                                <img
                                    src="/static/logo.png"
                                    style={{ height: '4vh', marginTop: '0vh' }}
                                />
                            </a>
                        </div>

                        <div
                            className="form-inline my-2 my-lg-0"
                            style={{
                                fontWeight: 'bold',
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginTop: '0.5vh'
                            }}
                        >
                            <ul
                                className="navbar-nav mr-auto"
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row'
                                }}
                            >
                                {this.props.user.role == 'fda' ? (
                                    <>
                                        {this.renderLink(
                                            'Test Kit Tracker',
                                            't',
                                            <DashboardOutlined />,
                                            '/tracker'
                                        )}
                                        {this.renderLink(
                                            'Verify Manufacturers',
                                            'v',
                                            <CheckCircleOutlined />,
                                            '/verify'
                                        )}
                                    </>
                                ) : null}

                                {this.renderLink(
                                    'Test Results',
                                    'r',
                                    <ProjectOutlined />,
                                    '/results'
                                )}

                                {this.props.user.role === 'factory'
                                    ? this.renderLink(
                                          'Generate New Codes',
                                          'g',
                                          <QrcodeOutlined />,
                                          '/newcode'
                                      )
                                    : null}

                                {this.renderLink('FAQ', 'q', <QuestionCircleOutlined />, '/faq')}

                                <Popover
                                    content={<UserInfo />}
                                    placement="bottomRight"
                                    trigger="click"
                                    //onVisibleChange={this.updateUsers}
                                >
                                    <li
                                        className="nav-item"
                                        style={{
                                            margin: '6px 25px 0px 0px'
                                        }}
                                    >
                                        <a
                                            style={{
                                                fontWeight: 'regular',
                                                display: 'flex',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <UserOutlined
                                                size={20}
                                                style={{
                                                    marginRight: '5px'
                                                }}
                                            />
                                            Profile
                                        </a>
                                    </li>
                                </Popover>
                            </ul>
                        </div>
                    </nav>

                    {/* Legit CSS more powerful than inline react styles?? */}
                    <style jsx>{`
                        a {
                            color: #000000;
                        }
                        a:hover {
                            color: #425eac;
                            text-decoration: none;
                        }
                        .active {
                            color: #425eac;
                            text-decoration: none;
                        }
                        ul {
                            list-style-type: none;
                        }
                    `}</style>
                </React.Fragment>
            </div>
        );
    }
}

const styles = {
    navlink: {
        margin: '6px 25px 0px 0px'
    },
    navBar: {
        borderWidth: '0px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: '10px',
        backgroundColor: '#FFFFFF'
    }
};

function mapStateToProps(state) {
    const { page, isAuthenticated, user } = state.auth;
    return { page, isAuthenticated, user };
}

export default connect(mapStateToProps, null)(Toolbar);
