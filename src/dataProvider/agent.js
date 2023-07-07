import axios from 'axios';
//http://vicschool.site:8080/api/ https://localhost:7287/
const instance = axios.create({
    baseURL: `${process.env.HOST_API_KEY}api/`,
    timeout: 60000,
});

import { PATH_AUTH } from '@/routes/path';

// LOGIN
const loginAuth = (payload) => {
    return postApi('Auth/login', payload);
};

export{
    loginAuth
}