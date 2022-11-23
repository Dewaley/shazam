import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import SearchServices from "../services/SearchServices";
import { useNavigate } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import { BsMusicNoteList, BsMusicNoteBeamed, BsDot } from "react-icons/bs";
import { MdShare } from "react-icons/md";
import { SlOptionsVertical } from "react-icons/sl";
import { SiShazam } from "react-icons/si";
import { result, topSongs } from "../Routes/pseudoData";

const SongDetails = () => {
  const { id } = useParams();

  // const [result, setResult] = useState({});
  // const [topSongs, setTopSongs] = useState({});

  // const [shazams, setShazams] = useState(0);

  // const numberWithCommas = (x) => {
  //   return x && x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  // };

  const navigate = useNavigate();

  useEffect(() => {
    // SearchServices.songDetails(id).then((res) => {
    //   console.log(res);
    //   setResult(res.data);
    // });
    // SearchServices.shazamCount(id).then((res) => {
    //   console.log(res);
    //   setShazams(res.data.total);
    // });
    // SearchServices.topSongs(40008598).then((res) => {
    //   console.log(res.data.tracks);
    //   setTopSongs(res.data.tracks);
    // });
  }, []);

  return (
    <div className='min-h-screen min-w-screen relative'>
      <div className='fixed top-0 left-0 w-full h-[70vh] z-20 main2'></div>
      <div className='fixed top-0 left-0 w-full h-full z-10'>
        <img
          src={result?.images?.background}
          alt=''
          className='h-[70vh] w-full object-cover object-center z-10'
        />
        <div className='h-[30vh] bg-black'></div>
      </div>
      <div className='fixed top-0 left-0 w-full h-[70vh] md:h-[80vh] z-10 from-[transparent] to-[black]'></div>
      <div className='z-30 relative text-white'>
        <div className='fixed top-0 left-0 w-full flex justify-between p-3 md:p-6 text-xl'>
          <IoArrowBackOutline
            onClick={() => navigate(-1)}
            className='cursor-pointer'
          />
          <div className='flex items-center gap-3'>
            <div className='flex items-center text-base'>
              <BsMusicNoteList className='text-xl' />
              Lyrics
            </div>
            <MdShare />
            <SlOptionsVertical />
          </div>
        </div>
        <div className='absolute flex flex-col items-center min-h-screen main top-[60vh] left-0 w-full gap-5'>
          {/* <pre>{JSON.stringify(topSongs)}</pre> */}
          <div className='flex flex-col gap-2 w-full p-3 md:p-6'>
            <h1 className='text-xl md:text-2xl font-bold'>{result?.title}</h1>
            <p className='font-thin md:text-lg flex items-center gap-2'>
              {!result?.hub?.explicit && (
                <span className='text-black bg-[#4D565A] h-4 w-4 flex justify-center items-center rounded font-bold text-sm'>
                  E
                </span>
              )}
              {result?.subtitle}
            </p>
            <p className='text-[#4D565A] text-sm md:text-base flex items-center gap-2'>
              <span>{result.genres.primary}</span>
              <BsDot />
              <SiShazam className='text-base md:text-lg' />
              {`1,000,000 Shazams`}
            </p>
          </div>
          <div className='flex flex-col items-center gap-1 w-full'>
            <a
              href={result.myshazam?.apple?.actions[0].uri}
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center gap-2 bg-orange-600 p-2 rounded-full w-fit uppercase font-bold text-sm'
            >
              <span className='bg-[#F7485F] flex justify-center items-center rounded-full h-7 w-7 border-[1px] border-white'>
                <BsMusicNoteBeamed />
              </span>
              Play Full Song
            </a>
            <p className='text-sm font-bold'>
              Get up to 1 month free of apple music
            </p>
          </div>
          <div className='flex flex-col w-full'>
            <h1 className='text-lg font-bold uppercase px-3 md:px-6'>Top songs</h1>
            <div className='grid grid-rows-3 grid-flow-col gap-6 bg-black p-3 md:p-6 overflow-x-scroll scrollbar-hide'>
              {topSongs.map((song,index) => (
                <Link to={`/song-details/${song.key}`} key={index} className='flex gap-3 w-[60vw] md:w-[400px]'>
                  <img
                    src={song.images.coverarthq}
                    alt=''
                    className='w-24 h-24 rounded object-cover object-center'
                  />
                  <div>
                    <p className='font-medium'>{song.title}</p>
                    <p className='font-thin'>{song.subtitle}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongDetails;
