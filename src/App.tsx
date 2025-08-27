
import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { observeAuthState, logOut } from "../firebase/authservice.ts";
import GeneratePlans from "./pages/generatePage";
import SavedPlans from "./pages/planStorage";
import SignIn from "./pages/signin";
import SignUp from './pages/signup';

const App: React.FC = () => {
    const [user, setUser] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = observeAuthState((user) => {
          if (user) setUser(user.email);
          else setUser(null);
        });
    
        // Cleanup on unmount
        return () => unsubscribe();
      }, []);

    const handleRegister = async() => {
        if (user) {
            await logOut();
            navigate('/generate');
        } else {
            console.log('navigating to /signin');
            setTimeout(() => navigate('/signin'), 0);
        }
    }
  
    return (
      <div>
        {/* Full-viewport app layout */}
        <div className="min-h-screen flex flex-col">
          {/* Top navbar */}
          <nav className="h-14 bg-gray-800 text-white px-6 flex items-center justify-between">
            <div className="flex gap-2">
              <Link to="/generate" className="hover:bg-gray-700 px-3 py-2 rounded">
                Generate Plans
              </Link>
              {user &&
                <Link to="/storage" className="hover:bg-gray-700 px-3 py-2 rounded">
                    Saved Plans
                </Link>
                }
            </div>
            <Link to='' onClick={handleRegister} className='px-4 py-2 bg-black border border-transparent text-white rounded-lg hover:border-[#646cff]'>
                {user ? "Logout" : "Login / Sign Up"}
            </Link>
          </nav>
  
          {/* Fill the rest of the screen */}
          <main className="flex-1 bg-black p-10">
            <Routes>
              <Route path="/generate" element={<GeneratePlans />} />
              <Route path="/storage" element={<SavedPlans />} />
              <Route path='/signin' element={<SignIn />} />
              <Route path='/signup' element={<SignUp />} />
            </Routes>
          </main>
        </div>
      </div>
    );
  };
  
  export default App;
  