
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import FormPage from "./pages/generatePage";
import BlankPage from "./pages/planStorage";

const App: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  
    return (
      <Router>
        {/* Full-viewport app layout */}
        <div className="min-h-screen flex flex-col">
          {/* Top navbar */}
          <nav className="h-14 bg-gray-800 text-white px-6 flex items-center justify-between">
            <div className="flex gap-2">
              <Link to="/" className="hover:bg-gray-700 px-3 py-2 rounded">
                Form Page
              </Link>
              <Link to="/blank" className="hover:bg-gray-700 px-3 py-2 rounded">
                Blank Page
              </Link>
            </div>
            <button
              onClick={() => setIsLoggedIn((v) => !v)}
              className="bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded"
            >
              {isLoggedIn ? "Logout" : "Login / Sign Up"}
            </button>
          </nav>
  
          {/* Fill the rest of the screen */}
          <main className="flex-1 bg-black p-10">
            <Routes>
              <Route path="/" element={<FormPage />} />
              <Route path="/blank" element={<BlankPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    );
  };
  
  export default App;
  