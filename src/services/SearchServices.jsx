import axios from "axios";

const API_URL = "https://shazam.p.rapidapi.com/search";

const searchSong = async (data) => {
  return axios
    .get(API_URL + `?term=${data}&limit=10&locale=en-NG`, {
      headers: {
        "X-RapidAPI-Key": "3277daaaa6msh3450a8b1d34298ep11cbc8jsn2adb45303b97",
        "X-RapidAPI-Host": "shazam.p.rapidapi.com",
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};

const SearchServices = {
    searchSong,
};

export default SearchServices;
