import axios from 'axios';


export function getMainData() {
    return axios.get('http:localhost:3001/')
}