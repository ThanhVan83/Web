import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Menu from "./ComponentPage/Menu";
import TagsGrid from "./pages/TagGrid";
import Results from "./pages/Results";
function App() {
  return (
    <Router>
      <div className="w-full h-screen flex">
        <Menu />

        <div className="flex-1 overflow-auto bg-black">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/tags" element={<TagsGrid />} />
            <Route path="/results" element={<Results />} />
            <Route path="/" element={<Navigate to="/home" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
