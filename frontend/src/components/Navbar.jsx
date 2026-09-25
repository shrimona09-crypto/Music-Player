function Navbar() {
  return (
    <header className="navbar">

      <div className="logo">
        🎵 MyMusic
      </div>

      <div className="search-box">
        🔍
        <input
          type="text"
          placeholder="What do you want to play?"
        />
      </div>

      <div className="profile">
        👤
      </div>

    </header>
  );
}

export default Navbar;