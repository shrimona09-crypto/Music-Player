import "./App.css";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import MusicPlayer from "./components/MusicPlayer";
import Library from "./components/Library";

import { PlayerProvider } from "./context/PlayerContext";

function App() {

  return (
    <PlayerProvider>

      <div className="app">

        <Navbar />

        <div className="main-layout">

          <Sidebar />

          <Home />

        </div>

        <MusicPlayer />

      </div>

    </PlayerProvider>
  );
}

export default App;