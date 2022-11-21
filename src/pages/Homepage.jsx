import { BsMusicNoteList } from "react-icons/bs";
import { MdShowChart } from "react-icons/md";
import { SiShazam } from "react-icons/si";
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className='bg-blackish min-h-screen min-w-screen overflow-hidden relative text-white font-sans p-3 md:p-6'>
      <div className='flex justify-between'>
        <div className='flex flex-col items-center'>
          <span className='h-8 w-8 bg-white text-blackish rounded-full flex items-center justify-center'>
            <BsMusicNoteList />
          </span>
          <p>Library</p>
        </div>
        <div className='flex flex-col items-center'>
          <span className='h-8 w-8 bg-white text-blackish rounded-full flex items-center justify-center'>
            <MdShowChart />
          </span>
          <p>Charts</p>
        </div>
      </div>
      <div className='absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] flex flex-col items-center gap-16'>
        <h1 className="text-xl">Tap to Shazam</h1>
        <div className='relative bg-white w-40 h-40 rounded-full flex justify-center items-center pumping'>
          <SiShazam className='text-[#4D565A] w-44 h-44 absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]' />
        </div>
        <Link to="/search" className='text-2xl bg-[#4D565A] w-11 h-11 flex justify-center items-center rounded-full'>
          <IoSearch />
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
