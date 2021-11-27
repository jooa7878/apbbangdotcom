import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

import "../style/App.scss";

function App() {
  return (
    <div className="App">
      <div className="container">
        <BrowserRouter>
          <Navbar></Navbar>
          <main className="main_container">
            <Route path="/signup" exact component={SignUp} />
            <Route path="/signin" exact component={SignIn} />
          </main>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
