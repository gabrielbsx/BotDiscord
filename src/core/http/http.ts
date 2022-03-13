import axios from 'axios'
import Environment from '../environment/environment';

export default axios.create({
    baseURL: Environment.get('API'),
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
});