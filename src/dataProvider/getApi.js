import axios from 'axios';
//http://vicschool.site:8080/api/ https://localhost:7287/
const instance = axios.create({
    baseURL: `${process.env.HOST_API_KEY}api/`,
    timeout: 60000,
});

import { PATH_AUTH } from '@/routes/path';

const getLocalStorage = (key) => {
    if (typeof window !== 'undefined') {
        return JSON.parse(localStorage.getItem(key));
    }
};

async function getApi(url, params){
    const paramObj = {};
    if (params && Object.keys(params).length) {
        Object.keys(params).forEach(function (key) {
            if (params[key]) {
                paramObj[key] = params[key];
            }
        });
    }

    const token = getLocalStorage('access_token');
    try {
        const res = await instance.get(url, {
            headers: {
                Authorization: token ? `Bearer ${token}` : 'no auth',
            },
            params: paramObj,
        });
        return res;
    } catch (err) {
        return err;
    }
}

// LOGIN
// const loginAuth = (payload) => {
//     return postApi('Auth/login', payload);
// };

// export{
//     loginAuth
// }

function getAllTags(params){
    return getApi('Tags/getListAllTagByCategoryID', params);
}

export{
    getAllTags,
    getLocalStorage
}