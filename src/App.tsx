
import './App.css'


function App() {

    const fetchMessage = async () => {
        const res = await fetch('http://localhost:3001/')
        const data = (await res).text();
        console.log(data);
    }

  return (
    <>
      <h1>Lesson Planner</h1>
      <div className="card">
        <button onClick={fetchMessage}>
          Click to Begin
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
    </>
  )
}

export default App
