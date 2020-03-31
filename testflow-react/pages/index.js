import React, { Component } from 'react';
import { Button } from 'antd';
import * as types from '../redux/types';

class HomePage extends Component {
    static async getInitialProps({ store }) {
        store.dispatch({ type: types.CHANGE_PAGE, payload: '' });
    }

    render() {
        return (
            <div style={{ width: '100%' }}>
                <div
                    style={{
                        backgroundColor: '#2D4A98',
                        width: '100%',
                        paddingLeft: '80px',
                        paddingRight: '40px',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}
                >
                    {/*Welcome Banner*/}
                    <div>
                        <h2
                            style={{
                                color: 'white',
                                fontSize: 80,
                                fontWeight: 'bold',
                                marginBottom: 0,
                                paddingLeft: '40px',
                                lineHeight: '100%'
                            }}
                        >
                            Welcome to TestFlow
                        </h2>
                        <h2
                            style={{
                                color: 'white',
                                fontSize: 20,
                                paddingTop: '40px',
                                paddingLeft: '40px'
                            }}
                        >
                            Securely Track COVID-19 Tests
                        </h2>
                    </div>
                    <img
                        style={{
                            paddingTop: '20px',
                            paddingRight: '40px',
                            width: '45vw',
                            height: '30vw'
                        }}
                        alt="scanQR"
                        src="/static/scanQR.png"
                    />
                </div>
                <img
                    style={{ width: '100%', height: undefined }}
                    alt="waveBanner"
                    src="/static/waveBanner.png"
                />
                <div
                    style={{
                        width: '100%',
                        padding: '2vw',
                        display: 'flex',
                        flexDirection: 'row'
                    }}
                >
                    {/*Description*/}
                    <div
                        style={{
                            width: '100%',
                            textAlign: 'center'
                        }}
                    >
                        <h1
                            style={{
                                fontSize: '50px',
                                color: '#0C1752',
                                marginBottom: '5vw',
                                paddingTop: '5vw'
                            }}
                        >
                            TestFlow tracks test inventory on the blockchain, securing your testing
                            results.
                        </h1>

                        {/*Detail 1*/}
                        <div
                            style={{
                                padding: '5vw',
                                display: 'flex'
                            }}
                        >
                            <img
                                style={{
                                    width: '10vw',
                                    height: '10vw',
                                    display: 'inline',
                                    float: 'left'
                                }}
                                alt="numberOne"
                                src="/static/numberOne.png"
                            />
                            <h2
                                style={{
                                    paddingLeft: '5vw',
                                    textAlign: 'left',
                                    fontSize: '30px',
                                    color: '#00648D',
                                    width: '50vw'
                                }}
                            >
                                A QR code would be assigned to each testing kit upon factory
                                production.
                            </h2>
                            <img
                                style={{
                                    width: '20vw',
                                    height: '10vw',
                                    paddingLeft: '5vw'
                                }}
                                alt="numberOneImage"
                                src="/static/numberOneImage.png"
                            />
                        </div>
                        <img
                            style={{ width: '12vx', height: '3vw' }}
                            alt="lineBreak"
                            src="/static/lineBreak.png"
                        />

                        {/*Detail 2*/}
                        <div
                            style={{
                                padding: '5vw',
                                display: 'flex'
                            }}
                        >
                            <img
                                style={{
                                    width: '10vw',
                                    height: '10vw',
                                    display: 'inline',
                                    float: 'left'
                                }}
                                alt="numberTwo"
                                src="/static/numberTwo.png"
                            />
                            <h2
                                style={{
                                    paddingLeft: '5vw',
                                    textAlign: 'left',
                                    fontSize: '30px',
                                    color: '#00648D',
                                    width: '50vw'
                                }}
                            >
                                Everytime your testing kit is moved, its QR code will be scanned.
                                This prevents your kit from being lost.
                            </h2>
                            <img
                                style={{
                                    width: '20vw',
                                    height: '15vw',
                                    paddingLeft: '5vw'
                                }}
                                alt="numberTwoImage"
                                src="/static/numberTwoImage.png"
                            />
                        </div>
                        <img
                            style={{ width: '12vx', height: '3vw' }}
                            alt="lineBreak"
                            src="/static/lineBreak.png"
                        />

                        {/*Detail 3*/}
                        <div
                            style={{
                                padding: '5vw',
                                display: 'flex'
                            }}
                        >
                            <img
                                style={{
                                    width: '10vw',
                                    height: '10vw',
                                    float: 'left'
                                }}
                                alt="numberThree"
                                src="/static/numberThree.png"
                            />
                            <h2
                                style={{
                                    paddingLeft: '5vw',
                                    textAlign: 'left',
                                    fontSize: '30px',
                                    color: '#00648D',
                                    width: '50vw'
                                }}
                            >
                                Enter a confirmation code in order to check the progress of your
                                test.
                            </h2>
                            <img
                                style={{
                                    width: '20vw',
                                    height: '13vw',
                                    paddingLeft: '5vw'
                                }}
                                alt="numberThreeImage"
                                src="/static/numberThreeImage.png"
                            />
                        </div>
                    </div>
                </div>
                <div
                    style={{
                        backgroundColor: '#f2f2f2',
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        padding: '3vw'
                    }}
                >
                    <p
                        style={{
                            fontSize: '1.5vw',
                            color: '#212121',
                            textAlign: 'center',
                            letterSpacing: 0.5
                        }}
                    >
                        Contact Us
                    </p>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column'
                        }}
                    >
                        <form
                            action="https://formspree.io/timg51237@gmail.com"
                            method="POST"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                flexDirection: 'column'
                            }}
                        >
                            <input
                                style={{
                                    padding: '1vw',
                                    fontWeight: 'lighter',
                                    textAlign: 'center',
                                    width: '35%',
                                    margin: '1vw',
                                    border: 'none',
                                    fontFamily: 'Lato'
                                }}
                                type="text"
                                name="name"
                                placeholder="Name"
                            />
                            <input
                                style={{
                                    padding: '1vw',
                                    fontWeight: 'lighter',
                                    textAlign: 'center',
                                    width: '35%',
                                    margin: '1vw',
                                    border: 'none',
                                    fontFamily: 'Lato'
                                }}
                                type="email"
                                name="Email"
                                placeholder="Email Address"
                            />
                            <textarea
                                style={{
                                    padding: '1vw',
                                    fontWeight: 'lighter',
                                    width: '35%',
                                    margin: '1vw',
                                    height: '60%',
                                    resize: 'none',
                                    border: 'none',
                                    fontFamily: 'Lato'
                                }}
                                type="text"
                                placeholder="Message"
                                name="message"
                                rows={10}
                            />
                            <input
                                style={{
                                    backgroundColor: '#2D4A98',
                                    color: '#ffffff',
                                    border: 'none',
                                    borderRadius: 4,
                                    cursor: 'pointer',
                                    fontWeight: 'lighter',
                                    fontSize: 20,
                                    padding: '10px 20px',
                                    marginTop: 20,
                                    fontFamily: 'Lato'
                                }}
                                type="submit"
                                value="Send"
                            />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default HomePage;
