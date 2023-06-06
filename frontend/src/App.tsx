import './style/App.css';
import { Footer, Header } from "./components/components";
import {NpcList} from "./components/NpcList.tsx";
import {NpcCard} from "./components/npcCard";

function App() {
  return (
    <div className="App">
      <Header />
      <NpcList />
      {/*<Footer />*/}
    </div> );
}

export default App;
