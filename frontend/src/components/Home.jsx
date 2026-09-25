import { usePlayer } from "../context/PlayerContext";

function Home() {

  const {
    playSong,
    toggleLike,
    isSongLiked
  } = usePlayer();


  const songs = [
    {
      id: 1,
      title: "Song One",
      artist: "Artist One",
      audio: "/songs/song1.mp3"
    },
    {
      id: 2,
      title: "Song Two",
      artist: "Artist Two",
      audio: "/songs/song2.mp3"
    },
    {
      id: 3,
      title: "Song Three",
      artist: "Artist Three",
      audio: "/songs/song3.mp3"
    }
  ];


  return (
    <main className="home">

      <h1>Good evening 👋</h1>

      <h2>Popular Songs</h2>


      <div className="song-grid">

        {songs.map((song) => (

          <div
            className="song-card"
            key={song.id}
            onClick={() => playSong(song, songs)}
          >

            {/* SONG IMAGE */}

            <div className="song-image">
              🎵
            </div>


            {/* SONG DETAILS */}

            <h3>{song.title}</h3>

            <p>{song.artist}</p>


            {/* LIKE BUTTON */}

            <button
              className="like-button"
              onClick={(e) => {

                e.stopPropagation();

                toggleLike(song);

              }}
            >

              {isSongLiked(song.id) ? "❤️" : "🤍"}

            </button>


          </div>

        ))}

      </div>

    </main>
  );
}


export default Home;