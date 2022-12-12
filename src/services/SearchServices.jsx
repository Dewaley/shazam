import axios from "axios";

const key = "3a37b77324mshc1d67db245e0a1ap1cb0f5jsn9780d7f6d0af";

const searchSong = async (data) => {
  return axios
    .get(
      `https://shazam-core.p.rapidapi.com/v1/search/multi?search_type=SONGS_ARTISTS&query=${data}`,
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

const fetchConcerts = async ({ id, data }) => {
  return axios
    .get(
      `https://shazam-core.p.rapidapi.com/v1/events/list?artist_id=${id}&date_from=${data}&page_number=1`,
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
  fetchConcerts,
};

export default SearchServices;
