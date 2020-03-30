import axios from 'axios';
import web3 from 'web3';
import { ClipLoader } from 'react-spinners';
import React from 'react';
import { Modal } from 'antd';

export const showErrorModal = text => {
    Modal.error({
        title: 'Error!',
        content: (
            <div>
                <p>{text}</p>
            </div>
        ),
        onOk() {}
    });
};

export const showLoadingModal = () => {
    return Modal.info({
        title: (
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                Processing&emsp;
                <ClipLoader size={30} color="#02B875" />
            </div>
        ),
        content: '',
        onOk() {}
    });
};

export const showSuccessModal = text => {
    Modal.success({
        title: 'Success!',
        content: (
            <div>
                <p>{text}</p>
            </div>
        ),
        onOk() {}
    });
};

const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = token;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
};

export const formatPrice = pricestring => {
    const price = Number.parseInt(pricestring, 10);
    if (isNaN(price)) {
        return price;
    }

    const newprice = round(price, 6);

    try {
        if (price >= Math.pow(10, 19)) {
            const prices = web3.utils.fromWei(price + '', 'ether');
            return round(prices, 4) + ' ETH';
        } else if (price >= Math.pow(10, 13)) {
            const prices = web3.utils.fromWei(price + '', 'finney');
            return round(prices, 4) + ' FINNEY';
        } else {
            const prices = web3.utils.fromWei(price + '', 'wei');
            return round(prices, 4) + ' WEI';
        }
    } catch (error) {
        console.log(error);
        return 'Error';
    }
};

function round(value, sigfigs) {
    const tempprice =
        Number.parseInt(
            Number.parseFloat(value).toPrecision(sigfigs) * Math.pow(10, sigfigs - 1),
            10
        ) / Math.pow(10, sigfigs - 1);
    return tempprice.toString();
}

export const roundHalf = num => {
    return Math.round(num * 2) / 2;
};

export default setAuthToken;
