
import React, { useState } from 'react';
import {Firebase, ui, uiConfig} from "../../firebase/firebase.ts";
import '../styles/firebase-ui.css';

ui.start('#firebaseui-auth-container', uiConfig);


const firebase = new Firebase();

const SignIn: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const userCred = await firebase.doSignInWithEmailAndPassword(email, password);
            console.log("Logged in user:", userCred.user)
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <form onSubmit={handleRegister}>
            <input type='email' 
                    placeholder='email' 
                    value={email}
                    onChange={e => setEmail(e.target.value)} />
            <input type='password' 
                    placeholder='password' 
                    value={password}
                    onChange={e => setPassword(e.target.value)} />
            <button type='submit'>Login</button>
            <div id='firebaseui-auth-container'>
                hello
            </div>
        </form>
    )
}

export default SignIn;