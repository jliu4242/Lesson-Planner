
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import GeneratePlans from "./pages/generatePage";
import SavedPlans from "./pages/planStorage";
import SignIn from "./pages/signin";

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
                Generate Plans
              </Link>
              <Link to="/blank" className="hover:bg-gray-700 px-3 py-2 rounded">
                Saved Plans
              </Link>
            </div>
            <Link to='/auth' className='px-4 py-2 bg-black border border-transparent text-white rounded-lg hover:border-[#646cff]'>
                {isLoggedIn ? "Logout" : "Login / Sign Up"}
            </Link>
          </nav>
  
          {/* Fill the rest of the screen */}
          <main className="flex-1 bg-black p-10">
            <Routes>
              <Route path="/" element={<GeneratePlans />} />
              <Route path="/blank" element={<SavedPlans />} />
              <Route path='/auth' element={<SignIn />} />
            </Routes>
          </main>
        </div>
      </Router>
    );
  };
  
  export default App;
  