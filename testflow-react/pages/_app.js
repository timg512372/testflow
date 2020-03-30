import React from 'react';
import { Provider } from 'react-redux';
import App, { Container } from 'next/app';
import withRedux from 'next-redux-wrapper';
import jwt_decode from 'jwt-decode';
import { Router } from '../routes';
import { setCurrentUser, logoutUser } from '../redux/actions';
import { initStore } from '../redux/store';
import Toolbar from '../components/Toolbar';
import { DefaultSeo } from 'next-seo';

export default withRedux(initStore)(
    class MyApp extends App {
        static async getInitialProps({ Component, ctx, store }) {
            return {
                pageProps: Component.getInitialProps ? await Component.getInitialProps(ctx) : {}
            };
        }

        state = {
            loading: true
        };

        componentDidMount = () => {
            if (localStorage.jwtToken) {
                const decoded = jwt_decode(localStorage.jwtToken);
                this.props.store.dispatch(setCurrentUser(decoded));
                const currentTime = Date.now() / 1000;
                if (decoded.exp < currentTime) {
                    this.props.store.dispatch(logoutUser());
                    window.location.href = '/';
                }
            }

            this.setState({ loading: false });
        };

        render() {
            const { Component, pageProps, store } = this.props;
            return (
                <div>
                    {this.state.loading ? (
                        <div> Loading </div>
                    ) : (
                        <>
                            <Provider store={store}>
                                <React.Fragment>
                                    <DefaultSeo {...DEFAULT_SEO} />
                                    <Toolbar />
                                    <Component {...pageProps} />
                                </React.Fragment>
                            </Provider>
                        </>
                    )}
                </div>
            );
        }
    }
);

const DEFAULT_SEO = {
    title: 'TestFlow',
    description:
        'Testflow is a decentralized app and website tracking COVID-19 test kits around the US.',
    openGraph: {
        type: 'website',
        locale: 'en_IE',
        title: 'TestFlow',
        description:
            'Testflow is a decentralized app and website tracking COVID-19 test kits around the US.',
        image: '/static/icon.png',
        site_name: 'TestFlow',
        imageWidth: 1200,
        imageHeight: 1200
    },
    twitter: {
        title: 'TestFlow',
        cardType: 'summary_large_image',
        description:
            'Testflow is a decentralized app and website tracking COVID-19 test kits around the US.'
    }
};
