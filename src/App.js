import { useRef, useState } from "react";
// Style
import "./styles/app.scss";
// Components
import Song from "./components/Song";
import Player from "./components/Player";
import Library from "./components/Library";
// Data
import data from "./data";

function App() {
  // States
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setisPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });
  // Refs
  const audioRef = useRef(null);
  // Handlers
  const timeHandler = (e) => {
    const currentTimeup = e.target.currentTime;
    const durationup = e.target.duration;
    setSongInfo({
      ...songInfo,
      currentTime: currentTimeup,
      duration: durationup,
    });
  };

  return (
    <div className="App">
      <Song currentSong={currentSong} />
      <Player
        currentSong={currentSong}
        setisPlaying={setisPlaying}
        isPlaying={isPlaying}
        audioRef={audioRef}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
      />
      <Library
        audioRef={audioRef}
        songs={songs}
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying}
        setSongs={setSongs}
      />
      <audio
        onTimeUpdate={timeHandler}
        onLoadedMetadata={timeHandler}
        ref={audioRef}
        src={currentSong.audio}
      ></audio>
    </div>
  );
}

export default App;
