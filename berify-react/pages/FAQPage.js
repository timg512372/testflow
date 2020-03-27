import React, { Component } from 'react';
import * as types from '../redux/types';
import { Collapse } from 'antd';
import { NextSeo } from 'next-seo';

class FAQPage extends Component {
    static getInitialProps({ store }) {
        store.dispatch({ type: types.CHANGE_PAGE, payload: 'q' });
    }

    renderCategory(category) {
        const { Panel } = Collapse;
        const content = category.content.map(label => {
            return (
                <Panel header={label.title} key={label.title}>
                    {label.content}
                </Panel>
            );
        });

        return <Collapse bordered={false}>{content}</Collapse>;
    }
    render() {
        return (
            <div>
                <NextSeo
                    title="FAQ | FairLegal"
                    twitter={{ title: 'FAQ | FairLegal' }}
                    openGraph={{
                        title: 'FAQ | FairLegal'
                    }}
                />

                <div style={{ textAlign: 'center', marginTop: '30px' }}>
                    <h1> Frequently Asked Questions </h1>
                </div>

                <div style={{ margin: '20px 15% 20px 15%' }}>
                    {content.map(category => {
                        return (
                            <div style={{ marginTop: '20px' }}>
                                <h2> {category.title} </h2>
                                {this.renderCategory(category)}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}
const content = [
    {
        title: 'What do I need to play?',
        content: [
            {
                title: 'A Desktop Browser',
                content:
                    'FairLegal requires a desktop browser such as Chrome or Firefox. We are currently working on a mobile solution as well.'
            },
            {
                title: 'Metamask',
                content: (
                    <div>
                        {
                            'We use Metamask as your ether wallet to store your ether and your dimes. You can download Metamask for Google Crome here: '
                        }
                        <a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en">
                            https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en
                        </a>
                    </div>
                )
            },
            {
                title: 'Ethereum',
                content:
                    'Ethereum is a cryptocurrency based on the blockchain. Currently, we are running on Ethereum from the Test Network, which does not count as real money. In the future, we may switch to a more stable cryptocurrency as Ether is very volatile at the moment.'
            }
        ]
    },
    {
        title: 'Technical Questions',
        content: [
            {
                title: 'A page crashed! What do I do?',
                content:
                    'Oh no! While we try our best to stop this from happening, sometimes pages do crash. If a page crashes, try reloading it. If the problem persists, please reach out to us with as much information about the crash as possible.'
            },
            {
                title: 'What is gas?',
                content:
                    'Gas is a transaction fee on the Ethereum blockchain, usually not exceeding a couple of cents. Fortmatic will automatically allocate an appropriate amount of gas for each transaction.'
            },
            {
                title: 'Where are your smart contracts hosted?',
                content: 'You can view our smart contracts at this address: '
            },
            {
                title: 'Why are transactions slow?',
                content:
                    'Due to the nature of the blockchain, each transaction must be verified by miners. This verification process takes around 10-30 seconds.'
            },
            {
                title: 'Why did my transaction fail?',
                content:
                    'Oh no! If the transaction fails, check the error logs. Usually, transactions fail because another player submitted the transaction first, the transaction ran out of gas, or because you have insufficient funds. If that does not solve the problem, feel free to reach out to us.'
            }
        ]
    },
    {
        title: 'Info',
        content: [
            {
                title: 'Who We Are',
                content:
                    'Fairlegal is a decentralized app sharing legal information and connecting lawyers with underprivileged defendants. Defendants will be able to pay lawyers a fair fee for their legal advice, such as whether to take a plea or not. Defendants may also be able to hire lawyers to represent them in court.'
            },
            {
                title: 'Version',
                content:
                    'This app is currently in beta testing. If you are interested, please fill out the contact form'
            }
        ]
    }
];

export default FAQPage;
