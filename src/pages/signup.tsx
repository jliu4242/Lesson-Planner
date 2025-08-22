import React, { useState } from 'react';
import Firebase from "../../firebase/firebase.ts"

const firebase = new Firebase();

const SignUp: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const userCred = await firebase.doCreateUserWithEmailAndPassword(email, password);
            console.log("registered user:", userCred.user)
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
            <button type='submit'>Register</button>
        </form>
    )
}

export default SignUp;