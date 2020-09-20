const axios = require('axios');
import { Actions } from 'react-native-router-flux';

export default function requestHandler({requestType, action, data}) {

    const authToken = JSON.parse(localStorage.getItem("authToken"));

    let config = { headers: { authtoken: authToken && authToken.token } }

    return axios[requestType || 'post'](`http://localhost:3000/${action}`, data, config)
        .catch(err => {
            if(err.status === 401) {
                localStorage.removeItem("authToken");
                Actions.welcome();
            } else console.error(err);
            throw err;
        })
}