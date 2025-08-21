
import React, { useEffect } from "react";
// @ts-ignore
import { auth } from "../../firebase/firebase.js";
import { GoogleAuthProvider, EmailAuthProvider } from "firebase/auth";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import { useNavigate } from 'react-router-dom';

const FirebaseAuth = () => {
    const navigate = useNavigate();

  useEffect(() => {
    const ui =
      firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);

    const uiConfig = {
        callbacks: {
            signInSuccessWithAuthResult: (authResult) => {
                console.log('logged in');
                navigate("/generatePage");
                return false;
            }
        },
      signInOptions: [
        GoogleAuthProvider.PROVIDER_ID, 
        EmailAuthProvider.PROVIDER_ID
        ],
    };

    ui.start("#firebaseui-auth-container", uiConfig);

    return () => ui.reset();
  }, []);

  return <div id="firebaseui-auth-container"></div>;
};

const loginPage: React.FC = () => {
  // Completely blank page that still fills the space
  return (
  <>
    <div className="h-full flex items-center justify-center">
        <form className='w-120 dark:bg-slate-800 text-center align-middle'>
            <div className='text-[var(--text-main)] text-size-200'>
                <h2>Log In</h2>
            </div>
            <FirebaseAuth />
        </form>
    </div>
   
  </>
  )
};

export default loginPage;