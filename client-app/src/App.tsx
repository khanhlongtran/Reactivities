import './App.css'
import DuckItem from './DuckItem'
import { ducks } from './demo'

function App() {
  return (
    <div>
      <h1>Reactivities</h1>
      {
        ducks.map(duck => (
          // <DuckItem duck={duck} key={duck.name} duck2={duck} />
          <DuckItem duck={duck} key={duck.name} />
        ))
      }
    </div>
  )
}

export default App

