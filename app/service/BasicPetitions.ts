import axios from 'axios'
const baseUrl = 'http://localhost:8082/';

export const fetchFilms=async ()=>{
  return await axios.get(`${baseUrl}/film`);
}