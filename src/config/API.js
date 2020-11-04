export const API_URL = 'https://recipeeers.herokuapp.com/api';
export const BASE_URL = 
    (process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : 'https://recipeer.netlify.app')