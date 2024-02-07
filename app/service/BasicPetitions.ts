import axios from 'axios'
const baseUrl = 'http://10.0.9.51:8082';
export const fetchFilms = async (ruta) => {
  const url = `${baseUrl}/${ruta}`;
  const response = await axios.get(url);
  console.log(response.data);
  return response.data
};
export const saveFilm = async (ruta,form) => {
  const url = `${baseUrl}/${ruta}`;
  console.log(url)
  const response = await axios.post(url,form).catch((error)=>{console.log("Error:")});
  console.log(response?.data);
};

export const deleteFilm = async (ruta,id) => {
  const url = `${baseUrl}/${ruta}`;
  console.log(id)
  const response = await axios.delete(`${url}/delete/${id}`).catch((error)=>{console.log("Error:")});
  console.log(response?.data);
  return "Borrado Exitoso"
};