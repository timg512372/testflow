import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChatBox from '../components/ChatBox';
import axios from 'axios';
import { Tabs, Radio, Button, Select, Input, Modal } from 'antd';
import * as types from '../redux/types';
import { Router } from '../routes';

class Inks extends Component {
    static async getInitialProps({ store }) {
        store.dispatch({ type: types.CHANGE_PAGE, payload: 'i' });
        console.log('getInitialProps');
    }

    state = {
        text: '',
        highlighted: '-1',
        inks: [],
        school: '',
        schoolInput: '',
        schools: [],
        visible: false,
        title: '',
        description: '',
        allInks: [],
        messageLoading: false
    };

    async componentDidMount() {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');

        if (!this.props.user.administrator) {
            const { data } = await axios({
                method: 'post',
                url: `${process.env.SERVER_URL}/api/ink/myInks`,
                data: { code: this.props.user.code }
            });

            this.setState({ inks: data.inks });
        } else {
            const { data } = await axios({
                method: 'get',
                url: `${process.env.SERVER_URL}/api/ink/getSchools`
            });

            const res = await axios({
                method: 'get',
                url: `${process.env.SERVER_URL}/api/ink/allInks`
            });

            this.setState({ schools: data.schools, allInks: res.data.inks });
        }
    }

    renderInk() {
        console.log(this.props.user);
        return (
            <div style={{ width: '70vw', height: '100%' }}>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        width: '100%',
                        justifyContent: 'space-around',
                        marginTop: '2vh'
                    }}
                >
                    <h2> What's Wrong?</h2>
                    <Radio.Group defaultValue="a">
                        <Radio.Button value="a">Harassment</Radio.Button>
                        <Radio.Button value="b">Physical Bullying</Radio.Button>
                        <Radio.Button value="c">Cyberbulling</Radio.Button>
                        <Radio.Button value="d">Other</Radio.Button>
                    </Radio.Group>
                </div>
                <ChatBox
                    messages={
                        inks[this.state.highlighted] ? inks[this.state.highlighted].messages : null
                    }
                    address={this.props.user.address}
                    handleSubmit={this.handleSubmit}
                    changeInput={event => this.setState({ text: event.target.value })}
                    loading={this.state.messageLoading}
                />
            </div>
        );
    }

    handleSubmit = async () => {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');

        await axios({
            method: 'post',
            url: `${process.env.SERVER_URL}/api/ink/sendMessage`,
            data: {
                text: this.state.text,
                ink: inks[this.state.highlighted].address
            }
        });
    };

    addSchool = async () => {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');

        await axios({
            method: 'post',
            url: `${process.env.SERVER_URL}/api/ink/createSchool`,
            data: { name: this.state.schoolInput }
        });
    };

    renderSchool() {
        const { Option } = Select;
        return (
            <div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Select
                        style={{ width: '200px', margin: '20px' }}
                        placeholder="Select a School"
                        onChange={val => this.setState({ school: val })}
                    >
                        {this.state.schools.map(school => (
                            <Option value={school.address} style={{ width: '190px' }}>
                                {school[0]}
                            </Option>
                        ))}
                    </Select>
                    <div>
                        School Code: {this.state.school ? this.state.school : 'No School Selected'}
                    </div>
                </div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center'
                    }}
                >
                    <Input
                        style={{ width: '200px', marginRight: '20px' }}
                        onChange={event => this.setState({ schoolInput: event.target.value })}
                    ></Input>
                    <Button type="primary" onClick={this.addSchool}>
                        Add School
                    </Button>
                </div>
            </div>
        );
    }

    render() {
        console.log('all the inks');
        console.log(this.state.allInks);
        console.log('student inks');
        console.log(this.state.inks);
        inks = [];
        if (this.props.user.administrator) {
            let discard = this.state.allInks.map(schoolInk => {
                console.log(schoolInk);
                console.log(this.state.school);
                if (
                    schoolInk.address.toLowerCase() == this.state.school.toLowerCase() ||
                    !this.props.user.administrator
                ) {
                    console.log('success');
                    inks = inks.concat(schoolInk.inks);
                }
            });
        } else {
            inks = this.state.inks;
        }

        console.log(inks);

        const { TabPane } = Tabs;
        return (
            <div style={{ width: '90vw', margin: '3vw' }}>
                <h1 style={{ textAlign: 'center' }}> My Inks </h1>
                {this.props.user && this.props.user.administrator ? this.renderSchool() : null}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        width: '100%',
                        marginTop: '3vw'
                    }}
                >
                    <Tabs
                        tabPosition="left"
                        onChange={key => this.setState({ highlighted: key })}
                        activeKey={this.state.highlighted}
                    >
                        {inks
                            ? inks.map((object, index) => (
                                  <TabPane
                                      key={index}
                                      tab={
                                          <div
                                              style={{
                                                  width: '15vw',
                                                  padding: '0.5vw',
                                                  overflowWrap: 'normal',
                                                  whiteSpace: 'normal'
                                              }}
                                          >
                                              <div
                                                  style={{
                                                      fontSize: '150%'
                                                  }}
                                              >
                                                  {object[0]}
                                              </div>
                                          </div>
                                      }
                                  >
                                      {this.renderInk(index)}
                                      {console.log(object)}
                                  </TabPane>
                              ))
                            : null}
                        <TabPane
                            key={-1}
                            disabled
                            tab={
                                this.props.user.administrator ? null : (
                                    <div
                                        style={{
                                            width: '15vw',
                                            padding: '0.5vw',
                                            overflowWrap: 'normal',
                                            whiteSpace: 'normal'
                                        }}
                                    >
                                        <Button
                                            style={{ margin: '5%', width: '90%' }}
                                            type="primary"
                                            onClick={() => {
                                                this.setState({ visible: true });
                                            }}
                                        >
                                            Create New Ink
                                        </Button>
                                    </div>
                                )
                            }
                        >
                            <h2
                                style={{
                                    textAlign: 'center',
                                    width: '60vw',
                                    marginTop: '3vw'
                                }}
                            >
                                No Ink Selected
                            </h2>
                            <h4
                                style={{
                                    textAlign: 'center',
                                    width: '60vw',
                                    marginTop: '1vw'
                                }}
                            >
                                Select a school and ink in the panel on the right
                            </h4>
                        </TabPane>
                    </Tabs>
                </div>
                <Modal
                    title="Create New Ink"
                    visible={this.state.visible}
                    onOk={async () => {
                        axios.defaults.headers.common['Authorization'] = localStorage.getItem(
                            'jwtToken'
                        );

                        await axios({
                            method: 'post',
                            url: `${process.env.SERVER_URL}/api/ink/createInk`,
                            data: {
                                title: this.state.title,
                                description: this.state.description,
                                code: this.props.user.code
                            }
                        });
                    }}
                    onCancel={() => {
                        this.setState({ visible: false });
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            width: '100%'
                        }}
                    >
                        <Input
                            style={{ width: '300px' }}
                            placeholder="Title"
                            onChange={event => this.setState({ title: event.target.value })}
                        ></Input>
                        <Input
                            placeholder="Description"
                            style={{ width: '300px' }}
                            onChange={event => this.setState({ description: event.target.value })}
                        ></Input>
                    </div>
                </Modal>
            </div>
        );
    }
}

let inks = [];

const messageSample = [
    {
        0: '123',
        1: 'message text'
    },
    {
        0: '456',
        1: 'message text 2'
    }
];

const mapStateToProps = state => {
    const { user, isAuthenticated, error } = state.auth;
    return { user, isAuthenticated, error };
};

export default connect(mapStateToProps, null)(Inks);
