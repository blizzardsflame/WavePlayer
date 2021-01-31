export const playAudio = (isPlaying, audioRef) => {
  // Song playing
  if (isPlaying) {
    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise.then((audio) => {
        audioRef.current.play();
      });
    }
  }
};
