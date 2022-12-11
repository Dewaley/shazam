import axios from "axios";

const API_URL = "https://shazam.p.rapidapi.com/search";

const key = "d9c19dada5msh962a0ae15169b85p17a877jsn7c9aff617f5c";

const searchSong = async (data) => {
  return axios
    .get(API_URL + `?term=${data}&limit=10&locale=en-NG`, {
      headers: {
        "X-RapidAPI-Key": key,
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
      `https://shazam-core.p.rapidapi.com/v1/tracks/details?track_id=${data}`,
      {
        headers: {
          "X-RapidAPI-Key": key,
          "X-RapidAPI-Host": "shazam-core.p.rapidapi.com",
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
    .get(
      `https://shazam-core.p.rapidapi.com/v1/tracks/total-shazams?track_id=${data}`,
      {
        headers: {
          "X-RapidAPI-Key": key,
          "X-RapidAPI-Host": "shazam-core.p.rapidapi.com",
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

const topSongs = async (data) => {
  return axios
    .get(
      `https://shazam.p.rapidapi.com/songs/list-artist-top-tracks?id=${data}&locale=en-NG`,
      {
        headers: {
          "X-RapidAPI-Key": key,
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

const songDetect = async (data) => {
  return axios
    .post("https://shazam-core.p.rapidapi.com/v1/tracks/recognize", data, {
      headers: {
        "X-RapidAPI-Key": key,
        "X-RapidAPI-Host": "shazam-core.p.rapidapi.com",
      },
    })
    .then((response) => {
      // console.log(response)
      return response;
    })
    .catch((error) => {
      // console.log(error)
      return error.response;
    });
};

const fetchYT = async ({ id, data }) => {
  return axios
    .get(
      `https://shazam-core.p.rapidapi.com/v1/tracks/youtube-video?track_id=${id}&name=${data}`,
      {
        headers: {
          "X-RapidAPI-Key": key,
          "X-RapidAPI-Host": "shazam-core.p.rapidapi.com",
        },
      }
    )
    .then((response) => {
      // console.log(response)
      return response;
    })
    .catch((error) => {
      // console.log(error)
      return error.response;
    });
};

const related = async (data) => {
  return axios
    .get(
      `https://shazam-core.p.rapidapi.com/v1/tracks/related?track_id=${data}`,
      {
        headers: {
          "X-RapidAPI-Key": key,
          "X-RapidAPI-Host": "shazam-core.p.rapidapi.com",
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

const fetchArtist = async (data) => {
  return axios
    .get(
      `https://shazam-core.p.rapidapi.com/v2/artists/details?artist_id=${data}`,
      {
        headers: {
          "X-RapidAPI-Key": key,
          "X-RapidAPI-Host": "shazam-core.p.rapidapi.com",
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
  songDetect,
  fetchYT,
  related,
  fetchArtist,
};

export default SearchServices;
