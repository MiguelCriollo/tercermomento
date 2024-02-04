import axios from 'axios'
const baseUrl = 'https://localhost:8081';

const fetchFilms=async ()=>{
  return await axios.get(`${baseUrl}/films`);
}