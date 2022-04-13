import './App.css';
import PlacementComponent from './PlacementComponent/PlacementComponent';
import './custom.scss'

function App() {
  return (
    <div className="App">
      <h1>Foster Journey</h1>
      <h2>About:</h2>
      <p>Foster journey is an online journal designed to help foster youth keep track of the placements they have visited throughout their individual journeys. Users can create entries for each placement they can later refer back to while trying to track their own personal history through the care system which can often be a difficult task given the vast number of locations, caregivers and short-duration stays they may encounter.</p>
      <PlacementComponent></PlacementComponent>
    </div>
  );
}

export default App;
