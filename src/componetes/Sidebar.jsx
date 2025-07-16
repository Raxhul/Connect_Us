import React from 'react';
import { assets } from "../assets/frontend-assets/assets";
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="w-[25%] mx-2 h-[98%] hidden lg:flex mt-2">
      <div className="h-full p-5 rounded-2xl bg-gradient-to-b from-[#1a1a2e] via-[#0f0f1a] to-black text-white flex flex-col gap-6 overflow-y-auto shadow-2xl border border-white/10">

        {/* Navigation Section */}
        <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 shadow-inner border border-white/10">
          <h2 className="text-sm font-semibold text-yellow-400 mb-4 tracking-widest uppercase">Menu</h2>

          <div onClick={() => navigate('/')} className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer hover:bg-white/10 transition-all">
            <img className="w-5 invert" src={assets.home_icon} alt="Home" />
            <p className="font-medium text-sm">Home</p>
          </div>

          <div className="flex items-center gap-3 px-4 py-3 mt-2 rounded-lg cursor-pointer hover:bg-white/10 transition-all">
            <img className="w-5 invert" src={assets.search_icon} alt="Search" />
            <p className="font-medium text-sm">Search</p>
          </div>
        </div>

        {/* Library Section Header */}
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-3">
            <img className="w-5 invert" src={assets.stack_icon} alt="Library" />
            <p className="text-md font-semibold tracking-wide">Library</p>
          </div>
          <div className="flex items-center gap-3">
            <img className="w-4 invert cursor-pointer hover:scale-110 transition" src={assets.arrow_icon} alt="Back" />
            <img className="w-4 invert cursor-pointer hover:scale-110 transition" src={assets.plus_icon} alt="Add" />
          </div>
        </div>

        {/* Playlist Card */}
        <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-yellow-400/20 shadow-lg hover:shadow-xl transition-all flex flex-col gap-3">
          <div>
            <h2 className="text-lg font-bold text-yellow-300">Create Playlist</h2>
            <p className="text-sm text-gray-300">Quickly group your favorite songs.</p>
          </div>
          <button className="mt-2 px-4 py-2 border border-yellow-400 text-yellow-300 rounded-full hover:bg-yellow-400/10 hover:text-white transition-all text-sm font-medium">
            Create
          </button>
        </div>

        {/* Podcast Card */}
        <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-purple-400/20 shadow-lg hover:shadow-xl transition-all flex flex-col gap-3">
          <div>
            <h2 className="text-lg font-bold text-purple-300">Discover Podcasts</h2>
            <p className="text-sm text-gray-300">Stay updated with fresh audio stories.</p>
          </div>
          <button className="mt-2 px-4 py-2 border border-purple-400 text-purple-300 rounded-full hover:bg-purple-400/10 hover:text-white transition-all text-sm font-medium">
            Browse
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

