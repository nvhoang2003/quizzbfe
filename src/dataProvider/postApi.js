import axios from 'axios';
//http://vicschool.site:8080/api/ https://localhost:7287/
const instance = axios.create({
    baseURL: `${process.env.HOST_API_KEY}api/`,
    timeout: 60000,
});

async function postApi(url, payload, file) {
    //const token = getLocalStorage('access_token');
    const token = null;
    try {
        const res = await instance.post(`/${url}`, payload, {
            headers: {
                'Authorization': token ? `Bearer ${token}` : 'no-author',
                'Content-Type': file ? 'multipart/form-data' : 'application/json; charset=utf-8',
                'Access-Control-Allow-Headers':
                    'Content-Type, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version, X-File-Name',
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Allow-Origin': '*',
            },
        });
        return res;
    } catch (err) {
        return err;
    }
}

const setLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

const loginAuth = (payload) => {
    return postApi('Auth/login', payload);
};

export{
    loginAuth,
    setLocalStorage,
    instance
}
