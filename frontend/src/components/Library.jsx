import { usePlayer } from "../context/PlayerContext";

function Library() {

  const {
    likedSongs,
    playSong
  } = usePlayer();


  return (
    <main className="library">

      <h1>Your Library 📚</h1>

      <h2>❤️ Liked Songs</h2>


      {likedSongs.length === 0 ? (

        <div className="empty-library">

          <p>You haven't liked any songs yet.</p>

          <p>
            Go to Popular Songs and tap 🤍 to add songs here.
          </p>

        </div>

      ) : (

        <div className="library-songs">

          {likedSongs.map((song) => (

            <div
              className="library-song"
              key={song.id}
            >

              <div className="library-song-image">
                🎵
              </div>


              <div className="library-song-info">

                <h3>{song.title}</h3>

                <p>{song.artist}</p>

              </div>


              <button
                className="library-play-button"
                onClick={() =>
                  playSong(song, likedSongs)
                }
              >
                ▶
              </button>

            </div>

          ))}

        </div>

      )}

    </main>
  );
}

export default Library;