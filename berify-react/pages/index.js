import React, { Component } from 'react';
import { Button } from 'antd';

class HomePage extends Component {
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
                        <h2 style={{ 
                            color: 'white', 
                            fontSize: 20,
                            paddingTop: '40px',
                            paddingLeft: '40px'
                            }}
                        >
                            Securely Track COVID-19 Tests
                        </h2>
                    </div>
                    <img style={{
                                paddingTop: '20px',
                                paddingRight: '40px',
                                width: '40vw',
                                height: '30vw'
                            }}
                    alt="scanQR" src="/static/scanQR.png" />
                </div>
                <img style= {{width: '100%', height: undefined}} alt="waveBanner" src="/static/waveBanner.png" />
                <div
                    style={{
                        width: '100%',
                        padding: '2vw',
                        display: 'flex',
                        flexDirection: 'row'
                    }}
                >

                {/*Description*/}
                    <div style={{ 
                        width: '100%',
                        textAlign: 'center'
                    }}>
                        <h1 style={{ 
                            padding: '5vw',
                            color: '#0C1752'
                        }}>
                         TestFlow tracks test inventory on the blockchain, securing your testing results
                         </h1>
                         <img style= {{}} alt="numberOne" src="/static/numberOne.png" />
                         <h2>Everytime your testing kit is moved, its QR code will be scanned</h2>
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
                                    backgroundColor: '#FF8282',
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
