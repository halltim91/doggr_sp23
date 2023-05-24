import './style/App.css';
import { Header, NpcList } from "./components/components";
import {CondensedNpcCard} from "./components/npcCard";

function App() {
  return (
    <div className="App">
      <Header />
      <NpcList />
      {/*<CondensedNpcCard name="testname" race="Orc" />*/}
    </div> );
}

export default App;
