import './style/App.css';
import { Footer, Header } from "./components/components";
import {NpcList} from "./components/NpcList.tsx";
import {CondensedNpcCard} from "./components/npcCard";

function App() {
  return (
    <div className="App">
      <Header />
      <NpcList />
      <Footer />
      {/*<CondensedNpcCard name="testname" race="Orc" />*/}
    </div> );
}

export default App;
