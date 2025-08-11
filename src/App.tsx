import ReactMarkdown from 'react-markdown';
import './styles/App.css';
import { useState } from 'react';
import './styles/tailwind.css';

function App() {
    const [textbooks, setTextbooks] = useState('');
    const [chapters, setChapters] = useState('');
    const [duration, setDuration] = useState('');
    const [result, setResult] = useState('');
    const [examplePlans, setExamplePlans] = useState<File | null>(null);

    const handleSubmit = async () => {
        console.log('handleSubmit called');
        const formData = new FormData();
        
        if (examplePlans) {
            formData.append('examplePlans', examplePlans);  // file
        }
        formData.append('textbooks', JSON.stringify(textbooks));
        formData.append('chapters', JSON.stringify(chapters));
        formData.append('duration', JSON.stringify(duration));

        const res = await fetch('http://localhost:3001/generate', {
            method: 'POST',
            body: formData,
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
        <div className='space-y-8 divide-y divide-gray-200 px-4 py-5 dark:divide-slate-200/5 sm:p-6'>
            <div>
                <label>Select .docx file</label>
                <input type='file' 
                    accept='.docx' 
                    className='bg-gray-500'
                    onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                            setExamplePlans(e.target.files[0]);
                        } else {
                            setExamplePlans(null);
                        }
                    }}
                />
            </div>

            <br/>
            <div>
                <label id='label'>textbooks (Links or Names)</label>
                <textarea
                    placeholder = "Example: https://apsubjects.weebly.com/uploads/2/0/5/3/20538716/petersons_master_ap_calculus.pdf"
                    onChange={(e) => setTextbooks(e.target.value)}>
                </textarea>
                <label id='label'>desired chapter/section names</label>
                <textarea 
                    placeholder = "Example: Implicit Differentiation"
                    onChange={(e) => setChapters(e.target.value)}>
                </textarea>
                <label id='label'>Desired duration of lesson (hours)</label>
                <input 
                    type='number' 
                    placeholder='Example: 1'
                    onChange={(e) => setDuration(e.target.value)}>
                </input>
            </div>

            <div className="flex items-center justify-center ">
                <button type ='button' onClick={handleSubmit}>
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
