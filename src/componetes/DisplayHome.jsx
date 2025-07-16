import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { albumsData } from "../assets/frontend-assets/assets";
import { songsData } from "../assets/frontend-assets/tamil_song/songData";
import { PlayerContext } from "../context/PlayerContext";

const DisplayHome = () => {
  const navigate = useNavigate();
  const { playWithId } = useContext(PlayerContext);
  const trendingTracks = songsData.slice(0, 12); // fixed list of tracks

  return (
    <motion.div
      className="min-h-screen text-white bg-gradient-to-b from-[#1a1a2e] via-[#0f0f1a] to-black pb-20 px-4 sm:px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* 🎧 Featured Playlists */}
      <section className="mb-12 py-5">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <span role="img" aria-label="fire">🔥</span> Featured Playlists
        </h2>
        <div className="flex gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-white/10 snap-x snap-mandatory scroll-smooth pb-2">
          {albumsData.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={() => navigate(`/album/${item.id}`)}
              className="snap-start min-w-[160px] sm:min-w-[180px] md:min-w-[200px] bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition rounded-xl p-3 shadow cursor-pointer group relative"
            >
              <img
                src={item.image}
                alt={item.name}
                className="rounded-xl w-full h-52 object-cover mb-3"
              />
              <p className="text-sm font-semibold truncate">{item.name}</p>
              <p className="text-xs text-gray-400 truncate">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🎵 Trending Tracks */}
      <section>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <span role="img" aria-label="music">🎵</span> Trending Tracks
        </h2>
        <div className="flex gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-white/10 snap-x snap-mandatory scroll-smooth">
          {trendingTracks.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 250 }}
              onClick={() =>
                playWithId(songsData.findIndex(song => song.id === item.id), songsData)
              }
              className="snap-start relative group min-w-[160px] sm:min-w-[180px] md:min-w-[200px] bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition rounded-xl p-3 shadow cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.name}
                className="rounded-lg w-full h-48 object-cover mb-2"
              />
              <p className="text-sm font-semibold truncate">{item.name}</p>
              <p className="text-xs text-gray-400 truncate">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

export default DisplayHome;
