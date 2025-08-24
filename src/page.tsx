import { StrictMode } from 'react'
import { BrowserRouter } from "react-router-dom";
import './styles/index.css'
import App from './App.tsx'

export default function Page() {
    return (
        <StrictMode>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </StrictMode>
    );
}