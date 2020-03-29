import React, { Component } from 'react';

import { connect } from 'react-redux';

import ChatBox from '../components/ChatBox';

import axios from 'axios';

import { Router } from '../routes';

import { Tabs, Radio, Button, Select, Input, Modal } from 'antd';

import * as types from '../redux/types';

 

class TrackerPage extends React.Component {

    static async getInitialProps({ store }) {

        store.dispatch({ type: types.CHANGE_PAGE, payload: 'r' });

        console.log('getInitialProps');

      }

      constructor()

      {

          super();

          this.state = {text:null};

      }

 

    positiveOrNegative=()=>{

     var posOrNeg = Math.random()*(1-0)+0;

       if(posOrNeg <0.5)

       {

        this.setState({text:"Positive"});

        }

        else

      {

          this.setState({text:"Negative"});

     }

     }

     

    render() {

       return (

           

            <div style={{ width: '90vw', margin: '3vw', alignContent: 'center'}}>

                <h2>Please Enter Your Code For Your Results</h2>

                <h2>

                    <body>

                        <Input id ="text1"></Input>

                        <Button type="primary"

                        onClick={this.positiveOrNegative}>

                            Submit

                        </Button>

                        <label>{this.state.text}</label>

                    </body>

                </h2>

            </div>

            

        )

    }

}

 

const mapStateToProps = state => {

    const { user, isAuthenticated, error } = state.auth;

    return { user, isAuthenticated, error };

};

 

export default connect(mapStateToProps, null)(TrackerPage);

