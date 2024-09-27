import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetch("/api/message")
      .then(r => r.json())
      .then(({ message }) => setMessage(message))
      .catch(() => setMessage("An error occurred"));
  }, [setMessage, count]);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <p>
          <strong>Message:</strong> { message }
        </p>
        <p>
          <button onClick={() => setCount(count + 1)}>Get a new message!</button>
        </p>
      </div>
    </>
  )
}

export default App
