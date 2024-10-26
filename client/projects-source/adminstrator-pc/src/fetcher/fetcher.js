const axios = require('axios');
const conf = require('../config');

const get = (url) => {
    return axios.get(conf.SERVER_HOST + url);
};

const post = (url, datato) => {
    const tosend = {data: datato};
    return axios.post(conf.SERVER_HOST + url, tosend);
};

const postAddPerson = (url, data) => {
    return axios.post(conf.SERVER_HOST + url, data);
};

module.exports = {
    get: get,
    post: post,
    postAddPerson: postAddPerson
};