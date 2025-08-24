
import React, { useState, useEffect, useRef } from 'react';
import {Firebase, auth} from "../../firebase/firebase.ts";
import '../styles/firebase-ui.css';
import '../styles/signin.css';
import * as firebaseui from 'firebaseui';
import { logIn } from '../../firebase/authservice.ts';
import { useNavigate } from 'react-router-dom';


const firebase = new Firebase();


const SignIn: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    let ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);

    useEffect(() => {
        // Reuse AuthUI instance if it already exists
        let ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);
    
        ui.start("#firebaseui-auth-container", {
          signInOptions: [
            {
              provider: "google.com",
              fullLabel: "Continue with Google",
            },
          ],
          signInFlow: "popup",
          callbacks: {
            signInSuccessWithAuthResult: () => {
                console.log("This should log!"); // Test this first
                navigate("/storage");
                return false;
            }, // stay on page
          },
        });
    
        // Optional: clean up on unmount so it doesn't linger
        return () => {
          ui.reset();
        };
      }, []);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const userCred = await logIn(email, password);
            console.log("Logged in user:", userCred.user)
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className='flex justify-center w-screen'>
            <form onSubmit={handleRegister} 
                    className='text-center w-1/2 space-y-8 divide-y divide-gray-200 bg-white 
                                shadow dark:divide-slate-200/5 dark:bg-slate-800 sm:overflow-hidden sm:rounded-md'>
                <div id='firebaseui-auth-container'>
                    <h3>Sign in with:</h3>
                </div>
                <div>
                    <label>
                        Email:
                    </label>
                    <input type='email' 
                            placeholder='email' 
                            value={email}
                            onChange={e => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>
                        Password:
                    </label>
                    <input type='password' 
                        placeholder='password' 
                        value={password}
                        onChange={e => setPassword(e.target.value)} />
                </div>
                    
                <button className='' type='submit'>Login</button>
                <p>Don't have an account? Sign up <a href='/signup' className='text-blue-500 underline'>here</a></p>
            </form>
        </div>
    )
}

export default SignIn;