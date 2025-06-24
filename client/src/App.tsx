import './App.css'
import { tester } from "./lib/states/tester.tsx";

function App() {
  console.log(tester);
  return (
    <div>
      <p>Hello World!</p>
      <button onClick={() => console.log("You've clicked the button.")}>
      Count: {tester.join(', ')}
      </button>
    </div>
  )
}

export default App
