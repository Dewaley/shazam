import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SearchServices from "../services/SearchServices";
import { Link } from "react-router-dom";
import { BsApple } from "react-icons/bs";

const ArtistDetails = () => {
  const { id } = useParams();

  const [artist, setArtist] = useState({});
  const [topSongs, setTopSongs] = useState([]);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    SearchServices.fetchArtist(id).then((res) => {
      console.log(res?.data?.data[0]);
      setArtist(res?.data?.data[0]);
      setTopSongs(res?.data?.data[0]?.views["top-songs"].data);
      setRelated(res?.data?.data[0]?.views["similar-artists"].data);
    });
  }, [id]);

  const formatText = (x) => {
    if (x?.length > 10) {
      let res = x.slice(0, 12) + "...";
      return res;
    } else {
      return x;
    }
  };

  return (
    <div className='px-3 py-8 bg-blackish min-h-screen text-white flex flex-col gap-8'>
      <div className='flex items-center justify-center flex-col gap-y-1'>
        <img
          src={artist?.attributes?.artwork?.url}
          alt=''
          className='w-20 h-20 rounded-full object-cover object-center'
        />
        <p className='font-bold'>{artist?.attributes?.name}</p>
      </div>
      <div className='relative w-full flex flex-col items-center gap-2 divide-y-[1px] divide-neutral-500'>
        <div className='flex w-full justify-between items-center text-sm pt-2'>
          <span className='text-neutral-300 pr-2'>D.O.B:</span>
          <span className='font-bold'>{artist?.attributes?.bornOrFormed}</span>
        </div>
        <div className='flex w-full justify-between items-center text-sm pt-2'>
          <span className='text-neutral-300 pr-2'>Genre:</span>
          <span className='font-bold'>{artist?.attributes?.genreNames[0]}</span>
        </div>
        <div className='flex w-full justify-between items-center text-sm pt-2'>
          <span className='text-neutral-300 pr-2'>Origin:</span>
          <span className='font-bold'>{artist?.attributes?.origin}</span>
        </div>
      </div>
      <div className='flex flex-col w-full gap-3'>
        <h1 className='text-lg font-bold uppercase'>Similar Artists</h1>
        <div className='grid grid-rows-1 grid-flow-col gap-6 overflow-x-scroll scrollbar-hide'>
          {related &&
            related?.length > 0 &&
            related?.map((item) => (
              <Link
                to={`/artist-details/${item.id}`}
                className='flex flex-col items-center justify-center gap-y-1 w-24 justify-between h-full text-center'
              >
                <img
                  src={item?.attributes?.artwork?.url}
                  alt=''
                  className='!w-20 !h-20 rounded-full object-cover object-center'
                />
                <p className='font-bold'>{item?.attributes?.name}</p>
              </Link>
            ))}
        </div>
      </div>
      <div className='flex flex-col w-full gap-3'>
        <h1 className='text-lg font-bold uppercase'>Top songs</h1>
        <div className='grid grid-cols-1 gap-3 overflow-x-scroll scrollbar-hide'>
          {topSongs.length > 1 &&
            topSongs?.map((song, index) => (
              <div className='flex gap-3 w-[80vw] md:w-[400px]' key={index}>
                <Link to={`/song-details/${song.id}`} className='w-[50%]'>
                  <img
                    src={song?.attributes?.artwork?.url}
                    alt=''
                    className='w-full h-full rounded object-cover object-center'
                  />
                </Link>
                <div className='flex flex-col justify-between w-[50%] justify-between gap-3'>
                  <div>
                    <Link to={`/song-details/${song?.id}`} className='w-fit'>
                      <p className='font-medium w-fit'>
                        {formatText(song?.attributes?.name)}
                      </p>
                    </Link>
                    <Link to={`/song-details/${song?.id}`} className='w-fit'>
                      <p className='font-thin w-fit'>
                        {formatText(song?.attributes?.artistName)}
                      </p>
                    </Link>
                  </div>
                  <a
                    href={song?.attributes?.uri}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='bg-[#4D565A] text-white py-1 px-2 w-fit gap-1 rounded-full flex items-center'
                  >
                    <BsApple />
                    Music
                  </a>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className='my-6'>
        <h1 className='text-lg font-bold uppercase pb-1'>Biography</h1>
        <p>{artist?.attributes?.artistBio}</p>
      </div>
    </div>
  );
};

export default ArtistDetails;
