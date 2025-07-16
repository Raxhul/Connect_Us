import { createContext, useRef, useState, useEffect } from "react";
import { songsData } from "../assets/frontend-assets/tamil_song/songData";

export const PlayerContext = createContext();

const PlayerContextProvider = ({ children }) => {
  const audioref = useRef(null);
  const seekBg = useRef();
  const seekBar = useRef();

  const [currentPlaylist, setCurrentPlaylist] = useState(songsData); // 🔁 Playlist state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [Track, setTrack] = useState(songsData[0]);
  const [PlayStatus, setPlayStatus] = useState(false);
  const [loop, setLoop] = useState(false);
  const [shuffle, setShuffle] = useState(false);

  const [Time, setTime] = useState({
    currentTime: { seconds: 0, minutes: 0 },
    totalTime: { seconds: 0, minutes: 0 },
  });

 const playWithId = async (id, playlist = songsData) => {
  setCurrentPlaylist(playlist);
  setCurrentIndex(id);
  setTrack(playlist[id]);
  if (audioref.current) {
    audioref.current.load();
    await audioref.current.play();
    setPlayStatus(true);
  }
};

  useEffect(() => {
    if (currentPlaylist.length === 0) return;
    setTrack(currentPlaylist[currentIndex]);
    if (audioref.current) {
      audioref.current.load();
      if (PlayStatus) audioref.current.play();
    }
  }, [currentIndex]);

  useEffect(() => {
    const audio = audioref.current;

    const handleEnded = () => {
      if (loop) {
        audio.currentTime = 0;
        audio.play();
        return;
      }

      if (shuffle) {
        let nextIndex;
        do {
          nextIndex = Math.floor(Math.random() * currentPlaylist.length);
        } while (nextIndex === currentIndex);
        setCurrentIndex(nextIndex);
      } else {
        setCurrentIndex((prev) => (prev + 1) % currentPlaylist.length);
      }
    };

    if (audio) audio.addEventListener("ended", handleEnded);
    return () => audio?.removeEventListener("ended", handleEnded);
  }, [loop, shuffle, currentIndex, currentPlaylist]);

  useEffect(() => {
    const updateTime = () => {
      const audio = audioref.current;
      if (!audio) return;

      const current = audio.currentTime;
      const total = audio.duration;

      setTime({
        currentTime: {
          minutes: Math.floor(current / 60),
          seconds: Math.floor(current % 60),
        },
        totalTime: {
          minutes: Math.floor(total / 60) || 0,
          seconds: Math.floor(total % 60) || 0,
        },
      });

      if (seekBar.current && total) {
        seekBar.current.style.width = `${(current / total) * 100}%`;
      }
    };

    const audio = audioref.current;
    if (audio) audio.addEventListener("timeupdate", updateTime);
    return () => audio?.removeEventListener("timeupdate", updateTime);
  }, []);

  const Play = () => audioref.current?.play().then(() => setPlayStatus(true));
  const Pause = () => audioref.current?.pause().then(() => setPlayStatus(false));

  const Previous = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const Next = () => {
    if (currentIndex < currentPlaylist.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const seekbarOn = (e) => {
    const clickPosition = e.nativeEvent.offsetX;
    const seekBarWidth = seekBg.current.clientWidth;
    if (audioref.current && seekBarWidth) {
      const seekTime = (clickPosition / seekBarWidth) * audioref.current.duration;
      audioref.current.currentTime = seekTime;
    }
  };

  return (
    <PlayerContext.Provider
      value={{
        
        Previous,
        seekbarOn,
        Next,
        audioref,
        seekBg,
        seekBar,
        Track,
        setTrack,
        currentIndex,
        setCurrentIndex,
        PlayStatus,
        setPlayStatus,
        Time,
        setTime,
        playWithId,
        Play,
        Pause,
        loop,
        setLoop,
        shuffle,
        setShuffle,
        currentPlaylist,
        setCurrentPlaylist,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;

