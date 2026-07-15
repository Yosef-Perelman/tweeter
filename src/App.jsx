import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Feed from "./components/Feed";
import Profile from "./pages/Profile";
import { TweetsProvider } from "./context/TweetsContext";

function App() {
  return (
    <TweetsProvider>
      <Navbar />
      <Routes>
        <Route path="/tweeter/" element={<Feed />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </TweetsProvider>
  );
}

export default App;
