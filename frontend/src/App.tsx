import './style/App.css';
import {Header} from "./components/components";
import {CondensedNpcCard} from "./components/npcCard";

function App() {
  return (
    <div className="App">
      <Header />
      <CondensedNpcCard name="testname" race="Orc" />
    </div> );
}

export default App;
