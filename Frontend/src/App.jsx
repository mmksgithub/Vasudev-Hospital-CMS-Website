import React from "react";
import ReactDOM from "react-dom/client"; // Use 'react-dom/client' for React 18
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Ensure correct imports
import MainPage from "./Pages/MainPage";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "aos/dist/aos.css";

const App = () => {
  return (
    <Router>
      <div className="App">

        <Routes>
          <Route path="/" element={<MainPage />} /> 
        </Routes>
      </div>
    </Router>
  );
};

// Use ReactDOM.createRoot for React 18
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

export default App;
