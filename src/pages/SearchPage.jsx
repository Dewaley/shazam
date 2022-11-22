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

  const navigate = useNavigate();

  const findSong = () => {
    SearchServices.searchSong(search).then((res) => {
      setResults(res.data);
      console.log(res);
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
      {results.artists || results.track ? (
        <div>
          <div className='pt-6 flex flex-col gap-5'>
            <h2 className='text-xl w-full border-b-[0.2px] border-b-[#17253b] py-2'>
              Songs
            </h2>
            <div className='flex flex-col gap-4'>
              {results.tracks?.hits?.map((song) => (
                <Link to={`/song-details/${song.track.key}`} className='flex gap-3'>
                  <img
                    src={song.track.images.coverarthq}
                    alt=''
                    className='w-24 h-24 rounded object-cover object-center'
                  />
                  <div>
                    <p className='font-medium'>{song.track.title}</p>
                    <p className='font-thin'>{song.track.subtitle}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className='pt-6 flex flex-col gap-5'>
            <h2 className='text-xl w-full border-b-[0.2px] border-b-[#17253b] py-2'>
              Artists
            </h2>
            <div className='flex flex-col gap-4'>
              {results.artists?.hits?.map((song) => (
                <div className='flex gap-3'>
                  <img
                    src={song.artist.avatar}
                    alt=''
                    className='w-24 h-24 rounded object-cover object-center'
                  />
                  <div>
                    <p className='font-medium'>{song.artist.name}</p>
                  </div>
                </div>
              ))}
            </div>
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
