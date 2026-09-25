import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState
} from "react";


const PlayerContext = createContext();


export function PlayerProvider({ children }) {

  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Queue
  const [queue, setQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  // Shuffle
  const [isShuffle, setIsShuffle] = useState(false);

  // Repeat: "off" | "all" | "one"
  const [repeatMode, setRepeatMode] = useState("off");

  // Liked Songs
  const [likedSongs, setLikedSongs] = useState([]);

  // Audio
  const audioRef = useRef(new Audio());


  // ==========================================
  // PLAY SONG
  // ==========================================

  const playSong = (song, songs = []) => {

    setCurrentSong(song);

    if (songs.length > 0) {

      setQueue(songs);

      const index = songs.findIndex(
        (item) => item.id === song.id
      );

      setCurrentIndex(index);
    }

    audioRef.current.src = song.audio;

    audioRef.current.play();

    setIsPlaying(true);
  };


  // ==========================================
  // PAUSE
  // ==========================================

  const pauseSong = () => {

    audioRef.current.pause();

    setIsPlaying(false);
  };


  // ==========================================
  // PLAY / PAUSE
  // ==========================================

  const togglePlay = () => {

    if (!currentSong) return;

    if (isPlaying) {

      audioRef.current.pause();

      setIsPlaying(false);

    } else {

      audioRef.current.play();

      setIsPlaying(true);
    }
  };


  // ==========================================
  // NEXT SONG
  // ==========================================

  const nextSong = () => {

    if (queue.length === 0) return;


    // SHUFFLE
    if (isShuffle && queue.length > 1) {

      let randomIndex;

      do {

        randomIndex = Math.floor(
          Math.random() * queue.length
        );

      } while (randomIndex === currentIndex);


      const next = queue[randomIndex];

      setCurrentIndex(randomIndex);
      setCurrentSong(next);

      audioRef.current.src = next.audio;
      audioRef.current.play();

      setIsPlaying(true);

      return;
    }


    // NORMAL NEXT
    const nextIndex = currentIndex + 1;


    if (nextIndex < queue.length) {

      const next = queue[nextIndex];

      setCurrentIndex(nextIndex);
      setCurrentSong(next);

      audioRef.current.src = next.audio;
      audioRef.current.play();

      setIsPlaying(true);

      return;
    }


    // REPEAT ALL
    if (repeatMode === "all") {

      const firstSong = queue[0];

      setCurrentIndex(0);
      setCurrentSong(firstSong);

      audioRef.current.src = firstSong.audio;
      audioRef.current.play();

      setIsPlaying(true);

      return;
    }


    // END OF QUEUE
    setIsPlaying(false);
  };


  // ==========================================
  // PREVIOUS SONG
  // ==========================================

  const previousSong = () => {

    if (queue.length === 0) return;


    // Restart current song if more than 3 seconds played
    if (audioRef.current.currentTime > 3) {

      audioRef.current.currentTime = 0;

      setCurrentTime(0);

      return;
    }


    const previousIndex = currentIndex - 1;


    if (previousIndex >= 0) {

      const previous = queue[previousIndex];

      setCurrentIndex(previousIndex);
      setCurrentSong(previous);

      audioRef.current.src = previous.audio;
      audioRef.current.play();

      setIsPlaying(true);

      return;
    }


    // REPEAT ALL
    if (repeatMode === "all") {

      const lastIndex = queue.length - 1;
      const lastSong = queue[lastIndex];

      setCurrentIndex(lastIndex);
      setCurrentSong(lastSong);

      audioRef.current.src = lastSong.audio;
      audioRef.current.play();

      setIsPlaying(true);
    }
  };


  // ==========================================
  // SHUFFLE
  // ==========================================

  const toggleShuffle = () => {

    setIsShuffle((previous) => !previous);

  };


  // ==========================================
  // REPEAT
  // ==========================================

  const toggleRepeat = () => {

    setRepeatMode((currentMode) => {

      if (currentMode === "off") {
        return "all";
      }

      if (currentMode === "all") {
        return "one";
      }

      return "off";

    });

  };


  // ==========================================
  // LIKE / UNLIKE SONG
  // ==========================================

  const toggleLike = (song) => {

    setLikedSongs((currentLikes) => {

      const alreadyLiked = currentLikes.some(
        (item) => item.id === song.id
      );


      // UNLIKE
      if (alreadyLiked) {

        return currentLikes.filter(
          (item) => item.id !== song.id
        );

      }


      // LIKE
      return [...currentLikes, song];

    });

  };


  // ==========================================
  // CHECK IF SONG IS LIKED
  // ==========================================

  const isSongLiked = (songId) => {

    return likedSongs.some(
      (song) => song.id === songId
    );

  };


  // ==========================================
  // AUDIO PROGRESS
  // ==========================================

  useEffect(() => {

    const audio = audioRef.current;


    const updateTime = () => {

      setCurrentTime(audio.currentTime);

    };


    const updateDuration = () => {

      setDuration(audio.duration);

    };


    audio.addEventListener(
      "timeupdate",
      updateTime
    );


    audio.addEventListener(
      "loadedmetadata",
      updateDuration
    );


    return () => {

      audio.removeEventListener(
        "timeupdate",
        updateTime
      );


      audio.removeEventListener(
        "loadedmetadata",
        updateDuration
      );

    };

  }, []);


  // ==========================================
  // AUTO NEXT / REPEAT
  // ==========================================

  useEffect(() => {

    const audio = audioRef.current;


    const handleEnded = () => {

      if (!currentSong || queue.length === 0) {

        setIsPlaying(false);

        return;
      }


      // ======================================
      // REPEAT ONE
      // ======================================

      if (repeatMode === "one") {

        audio.currentTime = 0;

        audio.play();

        setIsPlaying(true);

        return;
      }


      // ======================================
      // SHUFFLE
      // ======================================

      if (isShuffle && queue.length > 1) {

        let randomIndex;

        do {

          randomIndex = Math.floor(
            Math.random() * queue.length
          );

        } while (randomIndex === currentIndex);


        const next = queue[randomIndex];

        setCurrentIndex(randomIndex);
        setCurrentSong(next);

        audio.src = next.audio;

        audio.play();

        setIsPlaying(true);

        return;
      }


      // ======================================
      // NORMAL NEXT
      // ======================================

      const nextIndex = currentIndex + 1;


      if (nextIndex < queue.length) {

        const next = queue[nextIndex];

        setCurrentIndex(nextIndex);
        setCurrentSong(next);

        audio.src = next.audio;

        audio.play();

        setIsPlaying(true);

        return;
      }


      // ======================================
      // REPEAT ALL
      // ======================================

      if (repeatMode === "all") {

        const firstSong = queue[0];

        setCurrentIndex(0);
        setCurrentSong(firstSong);

        audio.src = firstSong.audio;

        audio.play();

        setIsPlaying(true);

        return;
      }


      // ======================================
      // FINISHED
      // ======================================

      setIsPlaying(false);

    };


    audio.addEventListener(
      "ended",
      handleEnded
    );


    return () => {

      audio.removeEventListener(
        "ended",
        handleEnded
      );

    };

  }, [
    queue,
    currentIndex,
    currentSong,
    isShuffle,
    repeatMode
  ]);


  // ==========================================
  // SEEK
  // ==========================================

  const seek = (time) => {

    audioRef.current.currentTime = time;

    setCurrentTime(time);

  };


  // ==========================================
  // VOLUME
  // ==========================================

  const setVolume = (volume) => {

    audioRef.current.volume = volume;

  };


  // ==========================================
  // CONTEXT
  // ==========================================

  return (

    <PlayerContext.Provider
      value={{

        // Current song
        currentSong,
        isPlaying,

        // Progress
        currentTime,
        duration,

        // Queue
        queue,
        currentIndex,

        // Shuffle / Repeat
        isShuffle,
        repeatMode,

        // Liked songs
        likedSongs,
        toggleLike,
        isSongLiked,

        // Player controls
        playSong,
        pauseSong,
        togglePlay,

        nextSong,
        previousSong,

        toggleShuffle,
        toggleRepeat,

        // Audio
        seek,
        setVolume

      }}
    >

      {children}

    </PlayerContext.Provider>

  );

}


// ==========================================
// USE PLAYER
// ==========================================

export function usePlayer() {

  return useContext(PlayerContext);

}