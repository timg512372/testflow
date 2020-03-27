import React from "react";
import { Provider } from "react-redux";
import App, { Container } from "next/app";
import withRedux from "next-redux-wrapper";
import jwt_decode from "jwt-decode";
import { Router } from "../routes";
import { setCurrentUser, logoutUser } from "../redux/actions";
import { initStore } from "../redux/store";
import Toolbar from "../components/Toolbar";

export default withRedux(initStore)(
  class MyApp extends App {
    static async getInitialProps({ Component, ctx, store }) {
      return {
        pageProps: Component.getInitialProps
          ? await Component.getInitialProps(ctx)
          : {}
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
          window.location.href = "/";
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
  title: "FairLegal",
  description:
    "FairLegal is a decentralized app sharing legal information and connecting lawyers with underprivileged defendants.",
  openGraph: {
    type: "website",
    locale: "en_IE",
    //url: 'https://www.dimedrop.org/',
    title: "Dime",
    description:
      "FairLegal is a decentralized app sharing legal information and connecting lawyers with underprivileged defendants.",
    image: "/static/favicon.ico",
    site_name: "FairLegal",
    imageWidth: 1200,
    imageHeight: 1200
  },
  twitter: {
    title: "FairLegal",
    cardType: "summary_large_image",
    description:
      "FairLegal is a decentralized app sharing legal information and connecting lawyers with underprivileged defendants."
  }
};
