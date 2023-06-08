import './style/App.css';
import { Routes, Route } from "react-router-dom";
import { MainPage } from "./components/MainPage.tsx";
import { createContext, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { fbApp } from "./firebase-config.ts";
import { Login } from "./components/Login.tsx";
import firebase from "firebase/compat";
import User = firebase.User;



export type Dat = {
  user: User
}

export const UserContext = createContext<Dat>({user: null});

function App() {
  // frontend firebase app instance created with initializeApp()
  const auth = getAuth(fbApp);
  const [currentUser, setCurrentUser] = useState(null);

  onAuthStateChanged(auth, async (user: User) => {
    // don't set the user all the time, only when sign in changes
    if (user && !currentUser) {
      console.log("User and not user", user.email);
      setCurrentUser(user);
    } else if(!user && currentUser) {
      console.log("uppdated user", (currentUser as User).email);
      setCurrentUser(user);
    }
  });

  return (
    <UserContext.Provider value={{user: currentUser}}>
      <div className="App">
          <Routes>
            <Route path="/" element={<MainPage />}/>
            <Route path="/user" element={<MainPage />} />
            <Route path="/login" element={<Login />}/>
          </Routes>
        </div>
    </UserContext.Provider>
  );
}

export default App;
