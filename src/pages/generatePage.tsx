import React from 'react';
import '../styles/tailwind.css';
import { useState } from 'react';
import '../styles/App.css';


function generatePage() {
    const [textbooks, setTextbooks] = useState('');
    const [chapters, setChapters] = useState('');
    const [duration, setDuration] = useState('');
    const [result, setResult] = useState('');
    const [examplePlans, setExamplePlans] = useState<File | null>(null);
    const [showButton, setShowButton] = useState(false);

    const handleSubmit = async () => {
        console.log('handleSubmit called');
        console.log(examplePlans);
        const formData = new FormData();
        
        if (examplePlans) {
            formData.append('file', examplePlans);  // file
            console.log('examples added');
        }
        formData.append('textbooks', JSON.stringify(textbooks));
        formData.append('chapters', JSON.stringify(chapters));
        formData.append('duration', JSON.stringify(duration));
        for (const pair of formData.entries()) {
            console.log(pair[0], pair[1]);
        }

        const res = await fetch('http://localhost:3001/generate', {
            method: 'POST',
            body: formData,
        });

        const data = await res.json();
        setResult(data.response.choices[0].message.content); 
        console.log("API Response:", data);
        console.log(result);

        setShowButton(true);
    }

    const savePlan = async () => {
        console.log('hll')
    }

  return (
    <>
        <div className= 'w-screen'>
            <form className='h-190 mx-auto w-full max-w-xl space-y-8 divide-y divide-gray-200 bg-white 
                                text-left shadow dark:divide-slate-200/5 dark:bg-slate-800 sm:overflow-hidden sm:rounded-md'>
                <div id='title' className='text-left'>
                    <h1>Textbook to Lesson Plan</h1>
                    <p className='text-[rgba(202,200,200,0.633)]'>Create a custom lesson plan using your desired textbooks</p>
                </div>

                <div className='space-y-8 divide-y divide-gray-200 px-4 py-5 dark:divide-slate-200/5 sm:p-6'>
                    <div>
                        <label>Select .docx file</label>
                        <input type='file' 
                            accept='.docx' 
                            className='file:border file:border-black file:rounded
                                        text-[rgba(202,200,200,0.633)] file:bg-[#4d4fba42]'
                            onChange={(e) => {
                                if (e.target.files && e.target.files.length > 0) {
                                    setExamplePlans(e.target.files[0]);
                                } else {
                                    setExamplePlans(null);
                                }
                            }}
                        />
                    </div>
                    <div>
                        <label id='label'>textbooks (Links or Names)</label>
                        <textarea
                            placeholder = "Example: https://apsubjects.weebly.com/uploads/2/0/5/3/20538716/petersons_master_ap_calculus.pdf"
                            onChange={(e) => setTextbooks(e.target.value)}>
                        </textarea>
                    </div>
                    <div>
                        <label id='label'>desired chapter/section names</label>
                        <textarea 
                            placeholder = "Example: Implicit Differentiation"
                            onChange={(e) => setChapters(e.target.value)}>
                        </textarea>
                    </div>
                    <div>
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
                <h2 className='mt-10 mb-3 text-center text-[rgba(202,200,200,0.633)]
                                font-bold'>
                                Output:
                </h2>
            </div>
            <div className='mx-auto w-full max-w-xl space-y-8 divide-y divide-gray-200 bg-white 
                                text-left shadow dark:divide-slate-200/5 dark:bg-slate-800 sm:overflow-hidden sm:rounded-md'>
                <p>{result}</p>
                
                <div className='text-center'>
                    {showButton && (
                        <button type='button' onClick={savePlan}>Save Lesson Plan</button>
                    )}
                </div>           
            </div>
        </div>
    </>
  )
}

export default generatePage;

