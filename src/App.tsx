import "./App.css";
import "tailwindcss/tailwind.css";
import Chatbot from "./components/chatbot";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Questions from "./pages/questions";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Chatbot />} />
        <Route path="/questions" element={<Questions />} />
      </Routes>
    </Router>
  );
}

export default App;
