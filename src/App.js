import { useState } from "react";
// Style
import "./styles/app.scss";
// Components
import Song from "./components/Song";
import Player from "./components/Player";
// Data
import data from "./data";

function App() {
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setisPlaying] = useState(false);
  return (
    <div className="App">
      <Song currentSong={currentSong} />
      <Player
        currentSong={currentSong}
        setisPlaying={setisPlaying}
        isPlaying={isPlaying}
      />
    </div>
  );
}

export default App;
