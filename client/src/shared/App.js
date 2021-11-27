import { BrowserRouter } from "react-router-dom";
import Navbar from "../components/Navbar";

import "../style/App.scss";

function App() {
  return (
    <div className="App">
      <div className="container">
        <BrowserRouter>
          <Navbar></Navbar>
          <main className="main_container"></main>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
