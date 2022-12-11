import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import SearchServices from "../services/SearchServices";
import { useNavigate } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import {
  BsMusicNoteList,
  BsMusicNoteBeamed,
  BsDot,
  BsApple,
} from "react-icons/bs";
import { MdShare } from "react-icons/md";
import { SlOptionsVertical } from "react-icons/sl";
import { SiShazam } from "react-icons/si";
import { AiFillYoutube } from "react-icons/ai";

const SongDetails = () => {
  const { id } = useParams();

  const [position, setPosition] = useState(0);
  const [adj, setAdj] = useState(false);
  const [lyrics, setLyrics] = useState(false);
  const [recommendations, setRecommendations] = useState([]);

  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  window.addEventListener("scroll", () => {
    setPosition(window.pageYOffset);
  });

  const [result, setResult] = useState({});
  const [topSongs, setTopSongs] = useState({});
  const [yt, setYT] = useState({});

  const [shazams, setShazams] = useState(0);

  const numberWithCommas = (x) => {
    return x && x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const formatText = (x) => {
    if (x?.length > 10) {
      let res = x.slice(0, 12) + "...";
      return res;
    } else {
      return x;
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    const height = window.innerHeight;
    if (position > height * 0.6) {
      setAdj(true);
    } else {
      setAdj(false);
    }
  }, [position]);

  useEffect(() => {
    SearchServices.songDetails(id).then((res) => {
      console.log(res);
      SearchServices.shazamCount(id).then((res) => {
        console.log(res);
        setShazams(res?.data?.total);
      });
      setTimeout(() => {
        SearchServices.fetchYT({
          id: id,
          data: res?.data?.alias + " " + res?.data?.artists[0]?.alias,
        }).then((res) => {
          console.log(res);
          setYT(res?.data);
        });
      }, 1000);
      SearchServices.related(id).then((res) => {
        console.log(res);
        setRecommendations(res?.data);
      });
      SearchServices.fetchArtist(res?.data?.artists[0]?.adamid).then((res) => {
        console.log(res?.data?.data[0]?.views["top-songs"].data);
        setTopSongs(res?.data?.data[0]?.views["top-songs"].data);
      });
      setResult(res?.data);
    });
  }, [id]);

  const share = async (item) => {
    if (navigator.canShare) {
      try {
        await navigator.share({
          title: item?.share?.text,
          url: item?.share?.href,
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      {result?.title && (
        <div className='min-h-screen min-w-screen relative'>
          <div
            className={`${
              adj ? "fixed top-0 left-0" : "absolute -top-[4rem] left-0"
            } text-white z-[100] bg-black p-3 md:p-6 text-xl h-12 w-full flex items-center gap-3 transition-all`}
          >
            <IoArrowBackOutline
              onClick={() => navigate(-1)}
              className='cursor-pointer'
            />
            {/* <span className='font-bold text-sm'>{formatText(result?.title)}</span> */}
          </div>
          <div
            className={`${
              lyrics
                ? "fixed top-0 left-0 flex"
                : "absolute left-0 -bottom-[1500vh] hidden"
            } scrollbar-hide text-white z-[90] lyrics px-3 py-16 text-xl overflow-scroll h-screen w-full flex-col items-center gap-3 transition-all`}
          >
            <div
              className={`${
                lyrics
                  ? "fixed top-0 left-0"
                  : "absolute left-0 -bottom-[1500vh]"
              } fixed top-0 left-0 text-white z-[100] bg-black/70 p-3 md:p-6 text-xl h-12 w-full flex items-center gap-3 transition-all`}
            >
              <IoArrowBackOutline
                onClick={() => setLyrics(false)}
                className='cursor-pointer'
              />
              {/* <span className='font-bold text-sm'>{formatText(result?.title)}</span> */}
            </div>
            {result?.sections[1]?.text &&
              result?.sections[1]?.text.map((line, index) => (
                <p className='text-center text-sm' key={index}>
                  {line}
                </p>
              ))}
          </div>
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
          {!lyrics && (
            <div className='z-30 relative text-white'>
              <div className='fixed top-0 left-0 w-full flex justify-between px-3 md:px-6 items-center h-12 text-xl'>
                <IoArrowBackOutline
                  onClick={() => navigate(-1)}
                  className='cursor-pointer'
                />
                <div className='flex items-center gap-3'>
                  {result?.sections[1]?.type === "LYRICS" && (
                    <div
                      className='flex items-center text-base'
                      onClick={() => setLyrics(true)}
                    >
                      <BsMusicNoteList className='text-xl' />
                      Lyrics
                    </div>
                  )}
                </div>
              </div>
              <div className='absolute flex flex-col items-center min-h-screen main top-[60vh] left-0 w-full'>
                {/* <pre>{JSON.stringify(topSongs)}</pre> */}
                <div className='flex flex-col gap-2 w-full p-3 md:p-6 pb-9 md:pb-12'>
                  <h1 className='text-xl md:text-2xl font-bold'>
                    {result?.title}
                  </h1>
                  <p className='font-thin md:text-lg flex items-center gap-2'>
                    {!result?.hub?.explicit && (
                      <span className='text-black bg-[#4D565A] h-4 w-4 flex justify-center items-center rounded font-bold text-sm'>
                        E
                      </span>
                    )}
                    {result?.subtitle}
                  </p>
                  <p className='text-[#4D565A] text-sm md:text-base flex items-center gap-2'>
                    <span>{result?.genres?.primary}</span>
                    <BsDot />
                    <SiShazam className='text-base md:text-lg' />
                    {numberWithCommas(shazams) + " Shazams"}
                  </p>
                </div>
                <div className='flex flex-col items-center gap-1 w-full pb-9 md:pb-12'>
                  <p
                    className='flex items-center gap-2 bg-orange-600 p-2 rounded-full w-fit uppercase font-bold text-sm cursor-pointer'
                    onClick={handlePlayPause}
                  >
                    <span className='bg-[#F7485F] flex justify-center items-center rounded-full h-7 w-7 border-[1px] border-white'>
                      <BsMusicNoteBeamed />
                    </span>
                    Play Full Song
                  </p>
                  <audio
                    src={result?.hub?.actions[1]?.uri}
                    controls
                    ref={audioRef}
                    className='hidden'
                  ></audio>
                  <p className='text-sm font-bold'>
                    Get up to 1 month free of apple music
                  </p>
                </div>
                <div className='flex flex-col w-full topSongs pb-9 md:pb-12'>
                  <h1 className='text-lg font-bold uppercase px-3 md:px-6'>
                    Top songs
                  </h1>
                  <div className='grid grid-rows-3 grid-flow-col gap-6 p-3 md:p-6 overflow-x-scroll scrollbar-hide'>
                    {topSongs.length > 1 &&
                      topSongs?.map((song, index) => (
                        <div
                          className='flex gap-3 w-[80vw] md:w-[400px]'
                          key={index}
                        >
                          <Link
                            to={`/song-details/${song.id}`}
                            className='w-[50%]'
                          >
                            <img
                              src={song?.attributes?.artwork?.url}
                              alt=''
                              className='w-full h-full rounded object-cover object-center'
                            />
                          </Link>
                          <div className='flex flex-col justify-between w-[50%] justify-between gap-3'>
                            <div>
                              <Link
                                to={`/song-details/${song?.id}`}
                                className='w-fit'
                              >
                                <p className='font-medium w-fit'>
                                  {formatText(song?.attributes?.name)}
                                </p>
                              </Link>
                              <Link
                                to={`/song-details/${song?.id}`}
                                className='w-fit'
                              >
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
                {yt?.caption && (
                  <div className='flex flex-col w-full gap-3 bg-[#4D565A]/[.90] py-9 md:py-12 mb-6'>
                    <h1 className='text-lg font-bold uppercase px-3 md:px-6'>
                      Video
                    </h1>
                    <div className='relative w-full px-3 md:px-6 flex flex-col items-center gap-2'>
                      <img
                        src={yt?.image?.url}
                        alt=''
                        className='w-full h-[40vh] rounded object-cover object-center'
                      />
                      <a
                        href={yt?.actions[0]?.uri}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] z-50 text-red-900 text-8xl'
                      >
                        <AiFillYoutube />
                      </a>
                      <p className='text-center font-bold text-sm'>
                        {yt?.caption}
                      </p>
                    </div>
                  </div>
                )}
                <div className='flex flex-col w-full py-9 md:py-12 '>
                  <h1 className='text-lg font-bold uppercase px-3 md:px-6'>
                    You might also like
                  </h1>
                  <div className='grid grid-rows-1 grid-flow-col gap-6 p-3 md:p-6 overflow-x-scroll scrollbar-hide'>
                    {recommendations?.length > 0 &&
                      recommendations
                        ?.filter((object) => object?.images?.coverarthq)
                        .map((song, index) => (
                          <div
                            className='flex flex-col gap-3 w-[45vw] md:w-[400px]'
                            key={index}
                          >
                            <Link
                              to={`/song-details/${song.key}`}
                              className='w-full'
                            >
                              {song.images ? (
                                <img
                                  src={song.images.coverarthq}
                                  alt=''
                                  className='w-full h-full rounded object-cover object-center'
                                />
                              ) : (
                                <div className='w-full h-full bg-red-900 rounded'></div>
                              )}
                            </Link>
                            <div className='flex flex-col justify-between w-[70%] gap-3 h-full'>
                              <div>
                                <Link
                                  to={`/song-details/${song?.key}`}
                                  className='w-fit'
                                >
                                  <p className='font-medium w-fit'>
                                    {formatText(song?.title)}
                                  </p>
                                </Link>
                                <Link
                                  to={`/song-details/${song.key}`}
                                  className='w-fit'
                                >
                                  <p className='font-thin w-fit'>
                                    {formatText(song?.subtitle)}
                                  </p>
                                </Link>
                              </div>
                              <a
                                href={song.hub.options[0].actions[1].uri}
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
                <div className='py-9 md:py-12 mb-6 bg-[#4D565A]/[.15] flex flex-col w-full gap-3'>
                  <h1 className='text-lg font-bold uppercase px-3 md:px-6'>
                    Track Information
                  </h1>
                  <div className='relative w-full px-3 md:px-6 flex flex-col items-center gap-2 divide-y-[1px] divide-neutral-500'>
                    <div className='flex w-full justify-between items-center text-sm'>
                      <span className='text-neutral-300'>Track:</span>
                      <span className='font-bold'>{result?.title}</span>
                    </div>
                    {result?.sections[0]?.metadata?.map((item, index) => (
                      <div
                        key={index}
                        className='flex w-full justify-between items-center text-sm pt-2'
                      >
                        <span className='text-neutral-300'>{item?.title}:</span>
                        <span className='font-bold'>{item?.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  className='text-white font-bold text-sm p-3 rounded w-[90%] max-w-[400px] bg-blue-700 mb-12 md:hidden'
                  onClick={() => {
                    share(result);
                  }}
                >
                  Share song
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SongDetails;
