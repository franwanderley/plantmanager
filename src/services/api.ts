import axios from 'axios';

//Rodar servidor json-server ./src/services/server.json --host 192.168.0.101 --port 3333

const api = axios.create({
   baseURL: 'http://192.168.0.101:3333', 
})
export default api;