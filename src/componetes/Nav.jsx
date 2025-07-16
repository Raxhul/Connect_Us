import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, CircleDot, Music, Radio } from "lucide-react";

const Nav = () => {
  const navigate = useNavigate();

  const filters = [
    { name: "All", icon: <CircleDot className="w-4 h-4" /> },
    { name: "Music", icon: <Music className="w-4 h-4" /> },
    { name: "Podcast", icon: <Radio className="w-4 h-4" /> },
  ];

  return (
    <nav className="hidden md:flex  items-center justify-between px-6 py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg mb-6">
      {/* Navigation Arrows */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white rounded-full transition"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => navigate(1)}
          className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white rounded-full transition"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-3">
        {filters.map(({ name, icon }) => (
          <button
            key={name}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 text-white text-sm font-medium hover:bg-white/10 transition`}
          >
            {icon}
            {name}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Nav;
