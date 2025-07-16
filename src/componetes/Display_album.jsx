import React, { useContext } from "react";
import Nav from "./Nav";
import { useParams } from "react-router-dom";
import { albumsData, assets } from "../assets/frontend-assets/assets";
import { songsData } from "../assets/frontend-assets/tamil_song/songData";
import { PlayerContext } from "../context/PlayerContext";

const Display_album = () => {
  const { id } = useParams();
  const albumData = albumsData[id];
  const { playWithId } = useContext(PlayerContext);

  const handlePlayAll = () => playWithId(0);
  const handleShuffle = () =>
    playWithId(Math.floor(Math.random() * songsData.length));

  return (
    <div className="min-h-screen p-4 text-white bg-gradient-to-b from-[#121221] via-[#0b0b14] to-black rounded-xl">
     
      <Nav/>
      {/* Album Header */}
      <section className="flex flex-col md:flex-row items-center md:items-end gap-6 mb-10 bg-white/5 border border-white/10 p-6 rounded-2xl shadow-lg backdrop-blur-md">
        <img
          src={albumData.image}
          alt={albumData.name}
          className="w-32 sm:w-36 md:w-44 rounded-xl shadow-lg object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="flex flex-col gap-2 text-center md:text-left">
          <p className="text-sm uppercase text-[#1DB954] tracking-widest font-medium">
            Playlist
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold">{albumData.name}</h1>
          <p className="text-sm text-white/70 italic">{albumData.desc}</p>

          <div className="flex flex-wrap justify-center md:justify-start gap-3 items-center text-xs text-white/50 mt-1">
            <img src={assets.rj_icon} alt="RJ" className="w-4 h-4" />
            <span className="text-white font-medium">RJ Music</span>
            <span>{albumData.like} Likes</span>
            <span>• 50 Songs</span>
            <span>• ~2h 30m</span>
          </div>

          {/* Controls */}
          <div className="mt-4 flex gap-4 justify-center md:justify-start">
            <button
              onClick={handlePlayAll}
              className="px-5 py-2 bg-[#1DB954] hover:bg-[#17a74a] text-black font-semibold rounded-full shadow-sm transition-all duration-200"
            >
              ▶ Play All
            </button>
            <button
              onClick={handleShuffle}
              className="px-5 py-2 border border-white/20 text-white rounded-full hover:bg-white/10 transition-all duration-200"
            >
              🔀 Shuffle
            </button>
          </div>
        </div>
      </section>

      {/* Song Table Header */}
      <div className="grid grid-cols-3 sm:grid-cols-4 text-[11px] sm:text-xs uppercase text-white/40 font-semibold px-2 mb-2">
        <p className="col-span-1"># Title</p>
        <p className="hidden sm:block">Album</p>
        <p className="hidden sm:block">Added</p>
        <p className="hidden sm:block text-center">
          <img src={assets.clock_icon} alt="clock" className="w-4 mx-auto opacity-70" />
        </p>
      </div>
      <hr className="border-white/10 mb-3" />

      {/* Song List */}
      <div className="max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 pr-1 space-y-2">
        {songsData.map((item, index) => (
          <div
            key={index}
            onClick={() => playWithId(item.id)}
            className="grid grid-cols-3 sm:grid-cols-4 items-center gap-2 text-sm p-2 rounded-xl bg-white/5 backdrop-blur-sm border border-white/5
                       hover:bg-white/10 hover:scale-[1.01] transition-all duration-200 cursor-pointer group"
          >
            <div className="flex items-center gap-2 col-span-1 truncate">
              <span className="w-5 text-right text-white/40 group-hover:text-[#1DB954]">
                {index + 1}
              </span>
              <img
                src={item.image}
                alt={item.name}
                className="w-10 h-10 rounded-lg object-cover"
              />
              <span className="truncate font-medium text-white">
                {item.name}
              </span>
            </div>
            <p className="hidden sm:block truncate text-white/60">{albumData.name}</p>
            <p className="hidden sm:block text-white/50">3 days ago</p>
            <p className="hidden sm:block text-center text-white/50">
              {item.duration}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Display_album;
