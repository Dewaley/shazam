import { useState } from "react";
import { BsMusicNoteList } from "react-icons/bs";
import { IoSearch } from "react-icons/io5";
import { IoArrowBackOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { GiMicrophone } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import SearchServices from "../services/SearchServices";
import { Link } from "react-router-dom";

const SearchPage = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState({});
  const [numRecords, setNumRecords] = useState(5);
  const [records, setRecords] = useState(5);

  const navigate = useNavigate();

  const findSong = () => {
    SearchServices.searchSong(search).then((res) => {
      setResults(res.data);
      console.log(res);
      setNumRecords(5)
      setRecords(5)
    });
  };

  return (
    <div className='bg-blackish min-h-screen min-w-screen overflow-x-hidden relative text-white p-3 md:p-6'>
      <div className='flex items-center w-full justify-between gap-2'>
        <IoArrowBackOutline
          onClick={() => navigate(-1)}
          className='cursor-pointer'
        />
        <form
          className='flex items-center w-full justify-between'
          onSubmit={(e) => {
            e.preventDefault();
            findSong();
          }}
        >
          <input
            autocomplete='off'
            type='text'
            value={search}
            name='search'
            id='search'
            placeholder='Search for songs, artists & lyrics'
            className='w-full px-3 bg-transparent focus:outline-0'
            onChange={(e) => setSearch(e.target.value)}
            onBlur={() => {
              if (search !== "") {
                findSong();
              }
            }}
          />
          <IoMdClose
            className={`${
              search === "" ? "text-transparent" : "text-white"
            } cursor-pointer`}
            onClick={() => setSearch("")}
          />
        </form>
      </div>
      {results?.artists || results?.tracks ? (
        <div>
          <div className='pt-6 flex flex-col gap-5'>
            <h2 className='text-xl w-full border-b-[0.2px] border-b-[#17253b] py-2'>
              Songs
            </h2>
            <div className='flex flex-col gap-4'>
              {results?.tracks?.hits?.slice(0, records).map((song, index) => (
                <Link
                  to={`/song-details/${song?.track?.key}`}
                  className='flex gap-3'
                  key={index}
                >
                  <img
                    src={song?.track?.images?.coverarthq}
                    alt=''
                    className='w-24 h-24 rounded object-cover object-center'
                  />
                  <div>
                    <p className='font-medium'>{song?.track?.title}</p>
                    <p className='font-thin'>{song?.track?.subtitle}</p>
                  </div>
                </Link>
              ))}
            </div>
            <button
              className={`text-blue-800 font-bold ${
                (results?.tracks?.hits?.length <= 5 ||
                  records === results?.track?.hits?.length) &&
                "hidden"
              }`}
              onClick={(e) => {
                setRecords(results?.track?.hits?.length);
              }}
            >
              View more
            </button>
            <button
              className={`hidden text-blue-800 font-bold ${
                (results?.track?.hits?.length <= 5 ||
                  records === results?.track?.hits?.length) &&
                "!block"
              }`}
              onClick={(e) => {
                setRecords(5);
              }}
            >
              View less
            </button>
          </div>
          <div className='pt-6 flex flex-col gap-5'>
            <h2 className='text-xl w-full border-b-[0.2px] border-b-[#17253b] py-2'>
              Artists
            </h2>
            <div className='flex flex-col gap-4'>
              {results?.artists?.hits
                ?.slice(0, numRecords)
                .map((song, index) => (
                  <Link to={`/artist-details/${song?.artist?.adamid}`} className='flex gap-3 items-center' key={index}>
                    <img
                      src={song?.artist?.avatar}
                      alt=''
                      className='w-24 h-24 rounded-full object-cover object-center'
                    />
                    <div>
                      <p className='font-medium'>{song?.artist?.name}</p>
                    </div>
                  </Link>
                ))}
            </div>
            <button
              className={`text-blue-800 font-bold ${
                (results?.artists?.hits.length <= 5 ||
                  numRecords === results?.artists?.hits.length) &&
                "hidden"
              }`}
              onClick={(e) => {
                setNumRecords(results?.artists?.hits.length);
              }}
            >
              View more
            </button>
            <button
              className={`hidden text-blue-800 font-bold ${
                (results?.artists?.hits.length <= 5 ||
                  numRecords === results?.artists?.hits.length) &&
                "!block"
              }`}
              onClick={(e) => {
                setNumRecords(5);
              }}
            >
              View less
            </button>
          </div>
        </div>
      ) : (
        <div className='absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] flex flex-col items-center gap-4'>
          <div className='flex items-center gap-2'>
            <span className='h-12 w-12 bg-[#17253b] text-blackish rounded text-2xl flex items-center justify-center'>
              <BsMusicNoteList />
            </span>
            <div className='flex items-center gap-2'>
              <span className='h-2 w-2 bg-[#17253b] rounded-full'></span>
              <span className='h-4 w-4 bg-[#17253b] rounded-full'></span>
            </div>
            <span className='h-16 w-16 bg-[#17253b] text-blackish rounded-full text-4xl flex items-center justify-center'>
              <IoSearch />
            </span>
            <div className='flex items-center gap-2'>
              <span className='h-4 w-4 bg-[#17253b] rounded-full'></span>
              <span className='h-2 w-2 bg-[#17253b] rounded-full'></span>
            </div>
            <span className='h-12 w-12 bg-[#17253b] text-blackish rounded text-2xl flex items-center justify-center'>
              <GiMicrophone />
            </span>
          </div>
          <p className='md:text-xl text-center'>
            Search for songs, artists & lyrics you care about
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
