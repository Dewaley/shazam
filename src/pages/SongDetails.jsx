import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import SearchServices from "../services/SearchServices";
import { useNavigate } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import { BsMusicNoteList } from "react-icons/bs";
import { MdShare } from "react-icons/md";
import { SlOptionsVertical } from "react-icons/sl";

const SongDetails = () => {
  const { id } = useParams();

  const [result, setResult] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    SearchServices.songDetails(id).then((res) => {
      console.log(res);
      setResult(res.data);
    });
  }, []);

  return (
    <div className='min-h-screen min-w-screen relative'>
      <div className='fixed top-0 left-0 w-full h-[70vh] md:h-[100vh] z-10'>
        <img
          src={result?.images?.background}
          alt=''
          className='w-full h-full object-cover object-center z-10'
        />
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
        <div className='absolute flex flex-col min-h-screen bg-black/90 p-3 md:p-6 top-[60vh] left-0 w-full'>
          <h1 className="text-xl font-bold">{result?.title}</h1>
          <p className="font-thin">{result?.subtitle}</p>
        </div>
      </div>
    </div>
  );
};

export default SongDetails;
