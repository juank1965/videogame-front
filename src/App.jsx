import "./App.css";
import LandingPage from "./components/landingPage/LandingPage";
import { Routes, Route } from "react-router-dom";
import NavBarMain from "./components/navBarMain/NavBarMain";
import NavBarSec from "./components/navBarSec/NavBarSec";
import GameDetail from "./components/gameDetail/GameDetail";
import GameCreate from "./components/gameCreate/GameCreate";

function App() {
  return (
    <div className="App">
      <NavBarMain />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<NavBarSec />} />
        <Route path="/create" element={<GameCreate />} />
        <Route path="/:id" element={<GameDetail />} />
      </Routes>
    </div>
  );
}

export default App;
