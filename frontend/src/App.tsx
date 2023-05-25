import './style/App.css';
import { Footer, Header, NpcList } from "./components/components";
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
