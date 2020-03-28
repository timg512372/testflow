import React, { Component } from 'react';
import { Button } from 'antd';

class HomePage extends Component {
    render() {
        return (
            <div style={{ width: '100%' }}>
                <div
                    style={{
                        backgroundColor: '#FF8282',
                        width: '100%',
                        padding: '40px',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}
                >
                    <div>
                        <h2
                            style={{
                                color: 'white',
                                fontSize: 50,
                                fontWeight: 'bold',
                                marginBottom: 0
                            }}
                        >
                            Welcome to Invisible Ink
                        </h2>
                        <h2 style={{ color: 'white', fontSize: 20 }}>
                            Report bullying anonymously
                        </h2>
                    </div>
                    <img alt="bubble" src="/static/bubble.png" />
                </div>
                <div
                    style={{
                        width: '100%',
                        padding: '2vw',
                        display: 'flex',
                        flexDirection: 'row'
                    }}
                >
                    <div style={{ width: '60vw', paddingLeft: '8vw', marginRight: '5vw' }}>
                        <h1 style={{ color: '#FF8282' }}> Our Mission</h1>
                        <div style={{ fontSize: '130%' }}>Test kits get lost a lot</div>
                    </div>
                    <div
                        style={{
                            borderRadius: '10px',
                            backgroundColor: '#FF8282',
                            width: '27vw',
                            display: 'flex',
                            alignItems: 'center',
                            flexDirection: 'column',
                            padding: '60px 15px 60px 15px',
                            height: '60%'
                        }}
                    >
                        <h1 style={{ color: '#FFFFFF' }}>Get Started Today!</h1>
                        <Button.Group size="large">
                            <Button href="/register/student" size="large">
                                {' '}
                                I'm a Student{' '}
                            </Button>
                            <Button href="/register/admin" size="large">
                                {' '}
                                I'm an Administrator
                            </Button>
                        </Button.Group>
                        <h4 style={{ color: '#FFFFFF', margin: '10px' }}>
                            {' '}
                            Sign in to your account in the Profile tab{' '}
                        </h4>
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
