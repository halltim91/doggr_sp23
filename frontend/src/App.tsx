import './style/App.css';
import { Routes, Route } from "react-router-dom";
import { MainPage } from "./components/MainPage.tsx";

function App() {

  return (
      <div className="App">
        <Routes>
          <Route path="/" element={<MainPage />}/>
          <Route path="/user" element={<MainPage />} />
        </Routes>
      </div>);
}

export default App;
