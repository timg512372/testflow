import React, { Component } from 'react';
import { Input, Button } from 'antd';

class ChatBox extends Component {
    render() {
        return (
            <div style={{ width: '100%' }}>
                <div
                    style={{
                        width: '100%',
                        borderRadius: '20px',
                        height: '50vh',
                        overflowX: 'scroll',
                        backgroundColor: '#F2F2F2'
                    }}
                    ref={div => {
                        this.messageList = div;
                    }}
                >
                    {this.props.messages.map(message => {
                        console.log(message);
                        return (
                            <div
                                style={{
                                    margin: '20px',
                                    textAlign:
                                        message[0].toLowerCase() == this.props.address
                                            ? 'right'
                                            : 'left'
                                }}
                            >
                                <div style={{ fontSize: '100%' }}>
                                    {' '}
                                    {message[0].toLowerCase() == this.props.address
                                        ? 'You'
                                        : message[0].toLowerCase()}{' '}
                                </div>
                                <div
                                    style={{
                                        backgroundColor:
                                            message[0].toLowerCase() == this.props.address
                                                ? '#ff8282'
                                                : '#C2C2C2',
                                        color:
                                            message[0].toLowerCase() == this.props.address
                                                ? '#FFFFFF'
                                                : '#212121',
                                        padding: '10px',
                                        borderRadius: '10px',
                                        flexWrap: 'wrap',
                                        display: 'inline-block',
                                        maxWidth: '80vw'
                                    }}
                                >
                                    {message[1]}
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div
                    style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        marginTop: '10px'
                    }}
                >
                    <Input
                        placeholder="Enter Message"
                        onChange={event => this.props.changeInput(event)}
                    />
                    <Button onClick={this.props.handleSubmit} loading={this.props.loading}>
                        Submit
                    </Button>
                </div>
            </div>
        );
    }
}

export default ChatBox;
