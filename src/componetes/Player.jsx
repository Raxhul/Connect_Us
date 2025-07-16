import React, { useContext, useEffect, useRef, useState } from 'react';
import { assets } from "../assets/frontend-assets/assets";
import { PlayerContext } from '../context/PlayerContext';

const Player = () => {
  const {
    seekBar,
    Track,
    seekBg,
    Play,
    Pause,
    PlayStatus,
    Time,
    Previous,
    Next,
    audioref,
    loop,
    shuffle,
    setLoop,
    setShuffle,
  } = useContext(PlayerContext);

  const [isDragging, setIsDragging] = useState(false);
  const [volume, setVolume] = useState(1);
  const volumeRef = useRef(null);

  const getPercentage = () => {
    const current = Time.currentTime.minutes * 60 + Time.currentTime.seconds;
    const total = Time.totalTime.minutes * 60 + Time.totalTime.seconds;
    return total ? (current / total) * 100 : 0;
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e) => {
    if (!isDragging || !seekBg.current || !seekBar.current) return;
    const rect = seekBg.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = Math.min(Math.max(clickX / rect.width, 0), 1);

    seekBar.current.style.width = `${percentage * 100}%`;

    if (audioref?.current?.duration) {
      audioref.current.currentTime = audioref.current.duration * percentage;
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioref?.current) {
      audioref.current.volume = newVolume;
    }
  };

  const toggleMiniPlayer = () => alert("📱 Mini player view not implemented yet.");
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="bottom-0 w-[99%] rounded-full z-50 px-4 py-3 sm:py-2 backdrop-blur bg-[#1a1a2e] border-t border-white/10 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_-1px_10px_rgba(0,0,0,0.3)]">

      {/* Song Info */}
      <div className="hidden sm:flex items-center gap-4 w-full sm:w-auto">
        <img
          src={Track.image}
          alt="track"
          className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-full shadow-md"
        />
        <div className="truncate max-w-[160px]">
          <p className="text-sm font-semibold text-white">{Track.name}</p>
          <p className="text-xs text-white/50">{Track.desc.slice(0, 30)}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center justify-center w-full sm:w-auto">
        <div className="flex items-center gap-4">
          {/* Shuffle */}
          <img
            src={assets.shuffle_icon}
            onClick={() => setShuffle(!shuffle)}
            className={`w-4 sm:w-5 cursor-pointer transition-opacity ${shuffle ? "opacity-100" : "opacity-50"}`}
            title="Shuffle"
          />

          {/* Prev */}
          <img onClick={Previous} src={assets.prev_icon} className="w-4 sm:w-5 cursor-pointer opacity-70 hover:opacity-100" />

          {/* Play / Pause */}
          {PlayStatus ? (
            <img onClick={Pause} src={assets.pause_icon} className="w-6 sm:w-7 cursor-pointer" />
          ) : (
            <img onClick={Play} src={assets.play_icon} className="w-6 sm:w-7 cursor-pointer" />
          )}

          {/* Next */}
          <img onClick={Next} src={assets.next_icon} className="w-4 sm:w-5 cursor-pointer opacity-70 hover:opacity-100" />

          {/* Loop */}
          <img
            src={assets.loop_icon}
            onClick={() => setLoop(!loop)}
            className={`w-4 sm:w-5 cursor-pointer transition-opacity ${loop ? "opacity-100" : "opacity-50"}`}
            title="Loop"
          />
        </div>

        {/* Seekbar */}
        <div className="flex items-center gap-2 mt-1 text-xs sm:text-sm">
          <p className="text-white/60 font-medium">
            {Time.currentTime.minutes}:{Time.currentTime.seconds.toString().padStart(2, "0")}
          </p>
          <div
            ref={seekBg}
            onMouseDown={handleMouseDown}
            className="w-[50vw] sm:w-[60vh] max-w-[500px] h-2 bg-white/20 rounded-full cursor-pointer relative"
          >
            <hr
              ref={seekBar}
              className="absolute top-0 left-0 h-2 bg-[#facc15] rounded-full"
              style={{ width: `${getPercentage()}%` }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-[#facc15] rounded-full shadow"
              style={{ left: `calc(${getPercentage()}% - 6px)` }}
            ></div>
          </div>
          <p className="text-white/60 font-medium">
            {Time.totalTime.minutes}:{Time.totalTime.seconds.toString().padStart(2, "0")}
          </p>
        </div>
      </div>

      {/* Right Side Controls */}
      <div className="hidden lg:flex items-center gap-3 w-auto opacity-90">
        <img src={assets.plays_icon} className="w-4 cursor-pointer" title="Repeat" />
        <img src={assets.mic_icon} className="w-4 cursor-pointer" title="Lyrics" onClick={() => alert("Lyrics not available yet")} />
        <img src={assets.queue_icon} className="w-4 cursor-pointer" title="Queue" onClick={() => alert("Queue coming soon")} />
        <img src={assets.speaker_icon} className="w-4 cursor-pointer" />
        <img src={assets.volume_icon} className="w-4" />

        <input
          ref={volumeRef}
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="w-20 accent-[#facc15] cursor-pointer"
        />

        <img src={assets.mini_player_icon} className="w-4 cursor-pointer" onClick={toggleMiniPlayer} />
        <img src={assets.zoom_icon} className="w-4 cursor-pointer" onClick={toggleFullscreen} />
      </div>
    </div>
  );
};

export default Player;
