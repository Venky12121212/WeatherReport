import './App.css';
import WhetherForCast from './components/WhetherForCast';

function App() {
  return (
    <div className="App">
      <WhetherForCast lat={44.34} lon={10.99}/>
    </div>
  );
}

export default App;
