import axios from "axios";

const API_URL = "https://shazam.p.rapidapi.com/search";

const searchSong = async (data) => {
  return axios
    .get(API_URL + `?term=${data}&limit=10&locale=en-NG`, {
      headers: {
        "X-RapidAPI-Key": "2651995183mshfc295dc388f759ep1c99f4jsnfca5388cd972",
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

const songDetails = async (data) => {
  return axios
    .get(
      `https://shazam.p.rapidapi.com/songs/get-details?key=${data}&locale=en-NG`,
      {
        headers: {
          "X-RapidAPI-Key":
            "2651995183mshfc295dc388f759ep1c99f4jsnfca5388cd972",
          "X-RapidAPI-Host": "shazam.p.rapidapi.com",
        },
      }
    )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};

const shazamCount = async (data) => {
  return axios
    .get(`https://shazam.p.rapidapi.com/songs/get-count?key=${data}`, {
      headers: {
        "X-RapidAPI-Key": "2651995183mshfc295dc388f759ep1c99f4jsnfca5388cd972",
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

const topSongs = async (data) => {
  return axios
    .get(
      `https://shazam.p.rapidapi.com/songs/list-artist-top-tracks?id=${data}&locale=en-NG`,
      {
        headers: {
          "X-RapidAPI-Key":
            "2651995183mshfc295dc388f759ep1c99f4jsnfca5388cd972",
          "X-RapidAPI-Host": "shazam.p.rapidapi.com",
        },
      }
    )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};

const SearchServices = {
  searchSong,
  songDetails,
  shazamCount,
  topSongs,
};

export default SearchServices;
