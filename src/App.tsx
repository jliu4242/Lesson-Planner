import ReactMarkdown from 'react-markdown';
import './styles/App.css';
import { useState } from 'react';
import './styles/tailwind.css';

function App() {
    const [textbooks, setTextbooks] = useState('');
    const [chapters, setChapters] = useState('');
    const [duration, setDuration] = useState('');
    const [result, setResult] = useState('');

    const handleSubmit = async () => {
        console.log('handleSubmit called');
        const res = await fetch('http://localhost:3001/generate', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ prompt: textbooks, chapters, duration })
        });

        const data = await res.json();
        setResult(data.response);
    }

  return (
    <>
        <div id='title'>
            <h1>Textbook to Lesson Plan</h1>
            <p>Create a custom lesson plan using your desired textbooks</p>
        </div>
      
      <form className='mx-auto w-full max-w-3xl space-y-8 divide-y divide-gray-200 bg-white 
                        text-left shadow dark:divide-slate-200/5 dark:bg-slate-800 sm:overflow-hidden sm:rounded-md'>
        <div>
            <div>
                <label>Select .docx file</label>
                <input type='file' accept='.docx'></input>
            </div>

            <br/>
            <div>
                <label id='label'>textbooks</label>
                <input 
                    type='text' 
                    onChange={(e) => setTextbooks(e.target.value)}>
                </input>
                <label id='label'>desired chapter/section names</label>
                <input 
                    type='text' 
                    onChange={(e) => setChapters(e.target.value)}>
                </input>
                <label id='label'>Desired duration of lesson (hours)</label>
                <input 
                    type='number' 
                    onChange={(e) => setDuration(e.target.value)}>
                </input>
            </div>

            <div className="card">
                <button onClick={handleSubmit}>
                    Generate Lesson Plan
                </button>
            </div>
        </div> 
      </form>
      
      
      <div>
        <ReactMarkdown>{result}</ReactMarkdown>
      </div>
    </>
  )
}

export default App
