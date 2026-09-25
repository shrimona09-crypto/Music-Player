function Sidebar() {
  return (
    <aside className="sidebar">

      <nav>

        <div className="nav-item">
          🏠 Home
        </div>

        <div className="nav-item">
          🔎 Search
        </div>

        <div className="nav-item">
          ❤️ Liked Songs
        </div>

        <div className="nav-item">
          📚 Your Library
        </div>

      </nav>

      <div className="playlists">

        <h3>PLAYLISTS</h3>

        <div className="create-playlist">
          ➕ Create Playlist
        </div>

      </div>

    </aside>
  );
}

export default Sidebar;