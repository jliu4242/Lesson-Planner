import { auth } from './firebase.ts';


export const uiConfig = {
    signInOptions: [
      {
        provider: "google.com", // Google provider
        fullLabel: "Continue with Google",
      },
      "password", // Email/Password
    ],
    signInFlow: "popup", // or "redirect"
    callbacks: {
      signInSuccessWithAuthResult: () => {
        // Returning false avoids auto-redirect
        return false;
      },
    },
  };