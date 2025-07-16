import React, { useContext } from "react";
import Sidebar from "./componetes/Sidebar";
import Player from "./componetes/Player";
import Display from "./componetes/Display";
import { PlayerContext } from "./context/PlayerContext";

const App = () => {
  const { audioref, Track } = useContext(PlayerContext);

  return (
    <div className="h-screen flex flex-col bg-black">
      {/* Main Content: Sidebar + Display */}
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        <Sidebar />
        <Display />
      </div>

      {/* Player at the bottom */}
      <Player />

      {/* Hidden Audio Player */}
      <audio ref={audioref} src={Track?.file} preload="auto" />
    </div>
  );
};

export default App;

