import { usePlayer } from "../context/PlayerContext";

function MusicPlayer() {

  const {
    currentSong,
    isPlaying,
    togglePlay,
    currentTime,
    duration,
    seek,
    setVolume,
    nextSong,
    previousSong,
    isShuffle,
    repeatMode,
    toggleShuffle,
    toggleRepeat
  } = usePlayer();


  // --------------------------------
  // FORMAT TIME
  // --------------------------------

  const formatTime = (time) => {

    if (!time || isNaN(time)) {
      return "0:00";
    }

    const minutes = Math.floor(time / 60);

    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };


  return (

    <footer className="music-player">

      {/* =================================
          CURRENT SONG
      ================================= */}

      <div className="current-song">

        <div className="mini-cover">
          🎵
        </div>

        <div>

          {currentSong ? (
            <>
              <h4>{currentSong.title}</h4>
              <p>{currentSong.artist}</p>
            </>
          ) : (
            <>
              <h4>No song playing</h4>
              <p>Select a song to start</p>
            </>
          )}

        </div>

      </div>


      {/* =================================
          PLAYER CONTROLS
      ================================= */}

      <div className="player-controls">

        <div className="controls">

          {/* SHUFFLE */}

          <button
            onClick={toggleShuffle}
            className={isShuffle ? "active-control" : ""}
            title="Shuffle"
          >
            🔀
          </button>


          {/* PREVIOUS */}

          <button
            onClick={previousSong}
            title="Previous"
          >
            ⏮
          </button>


          {/* PLAY / PAUSE */}

          <button
            onClick={togglePlay}
            disabled={!currentSong}
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? "⏸" : "▶"}
          </button>


          {/* NEXT */}

          <button
            onClick={nextSong}
            title="Next"
          >
            ⏭
          </button>


          {/* REPEAT */}

          <button
            onClick={toggleRepeat}
            className={repeatMode !== "off" ? "active-control" : ""}
            title="Repeat"
          >
            {repeatMode === "one" ? "🔂" : "🔁"}
          </button>

        </div>


        {/* =================================
            PROGRESS BAR
        ================================= */}

        <div className="progress">

          <span>
            {formatTime(currentTime)}
          </span>


          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={(e) =>
              seek(Number(e.target.value))
            }
            disabled={!currentSong}
          />


          <span>
            {formatTime(duration)}
          </span>

        </div>

      </div>


      {/* =================================
          VOLUME
      ================================= */}

      <div className="volume">

        <span>🔊</span>

        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          defaultValue="0.8"
          onChange={(e) =>
            setVolume(Number(e.target.value))
          }
        />

      </div>

    </footer>

  );
}

export default MusicPlayer;