import React, { useState } from 'react';
import Firebase from "../../firebase/firebase.ts"
import { signUp } from '../../firebase/authservice.ts';
import { useNavigate } from 'react-router-dom';

const firebase = new Firebase();

const SignUp: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            console.log('Trying to register');
            if (validPassword()) {
                const userCred = await signUp(email, password);
                console.log("registered user:", userCred.user)
                navigate('/generate');
            }
            
        } catch (err) {
            console.error(err);
        }
    }

    const validPassword = () => {
        return password == confirmPassword;
    }

    return (
        <div className='flex justify-center w-screen'>
            <form className='text-center w-1/2 space-y-8 divide-y divide-gray-200 bg-white 
                                shadow dark:divide-slate-200/5 dark:bg-slate-800 sm:overflow-hidden sm:rounded-md' 
                onSubmit={handleRegister}>
                <h2>Sign Up</h2>
                <div>
                    <label>Email:</label>
                    <input type='email' 
                            placeholder='email' 
                            value={email}
                            onChange={e => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type='password' 
                            placeholder='password' 
                            value={password}
                            onChange={e => setPassword(e.target.value)} />
                </div>
                <div>
                    <label>Confirm Password:</label>
                    <input type='password' 
                            placeholder='password' 
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)} />
                </div>
                <button type='submit' onClick={handleRegister}>Register</button>
            </form>
        </div>
    )
}

export default SignUp;