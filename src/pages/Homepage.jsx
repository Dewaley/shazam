import { BsMusicNoteList } from "react-icons/bs";
import { MdShowChart } from "react-icons/md";
import { SiShazam } from "react-icons/si";
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
  useReactMediaRecorder,
  ReactMediaRecorder,
} from "react-media-recorder";
import SearchServices from "../services/SearchServices";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const { status, startRecording, stopRecording, getBlob } =
    useReactMediaRecorder({
      audio: true,
      blobPropertyBag: {
        type: "audio/wav",
      },
      onStop: (blobUrl, blob) => {
        // Create a FormData object containing the recorded audio data
        const formData = new FormData();
        formData.append("file", blob, `${blobUrl.substring(22)} + ".wav"`);

        SearchServices.songDetect(formData).then((res) => {
          console.log(res.data?.matches[0]?.id);
          if (res.data?.matches[0]?.id === undefined) {
            setTimeout(()=>setMessage("Couldn't find a match"),1000)
          } else {
            navigate(`/song-details/${res.data?.matches[0]?.id}`);
          }
        });
      },
    });

  useEffect(() => {
    if (status === "recording") {
      setMessage("Listening");
    } else {
      setMessage("Tap to Shazam");
    }
  }, [status]);

  return (
    <div className='bg-blackish min-h-screen min-w-screen overflow-hidden relative text-white font-sans p-3 md:p-6'>
      <div className='absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] flex flex-col items-center gap-16'>
        <h1 className='text-xl'>{message}</h1>
        <div
          className={`relative bg-white w-40 h-40 rounded-full flex justify-center items-center ${
            status !== "recording" ? "pumping" : "pumping2"
          }`}
        >
          <SiShazam
            className={`text-[#4D565A] w-44 h-44 absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] `}
            onClick={() => {
              if (status === "recording") {
                stopRecording();
              } else {
                startRecording();
                setTimeout(() => {
                  stopRecording();
                  const blob = getBlob;
                  console.log(blob);
                }, 10000);
              }
            }}
          />
        </div>
        <Link
          to='/search'
          className='text-2xl bg-[#4D565A] w-11 h-11 flex justify-center items-center rounded-full'
        >
          <IoSearch />
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
