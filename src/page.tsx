import { StrictMode } from 'react'
import './styles/index.css'
import App from './App.tsx'
import LessonPlan from './lessonPlan.tsx'

export default function Page() {
    return (
        <StrictMode>
            <App />
            <LessonPlan />
        </StrictMode>
    );
}