import { useRef, useState } from "react";
// Styles
import "./styles/app.scss";
// Components
import Song from "./components/Song";
import Player from "./components/Player";
import Library from "./components/Library";
import Nav from "./components/Nav";
// Data
import data from "./data";

function App() {
  // States
  const [libraryStatus, setLibraryStatus] = useState(false);
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setisPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });
  // Refs
  const audioRef = useRef(null);
  // Handlers
  const timeHandler = (e) => {
    const currentTimeup = e.target.currentTime;
    const durationup = e.target.duration;
    // Get percentage
    const roundedCurrent = Math.round(currentTimeup);
    const roundedDuration = Math.round(durationup);
    const animationPercentage = Math.round(
      (roundedCurrent / roundedDuration) * 100
    );
    console.log(animationPercentage);
    setSongInfo({
      ...songInfo,
      currentTime: currentTimeup,
      duration: durationup,
      animationPercentage: animationPercentage,
    });
  };
  const songEnd = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    if (isPlaying) audioRef.current.play();
  };
  return (
    <div className="App">
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} />
      <Player
        currentSong={currentSong}
        setisPlaying={setisPlaying}
        isPlaying={isPlaying}
        audioRef={audioRef}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        songs={songs}
        setCurrentSong={setCurrentSong}
        setSongs={setSongs}
      />
      <Library
        libraryStatus={libraryStatus}
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
        onEnded={songEnd}
      ></audio>
    </div>
  );
}

export default App;
