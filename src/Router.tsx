import { BrowserRouter, Route } from "react-router-dom";
import Home from "./routes/Home";
import Navigation from "./components/Navigation";
import Login from "./routes/Login";
import InputResult from "./routes/InputResult";
import Footer from "./components/Footer";

export default function Router() {
  return (
    <BrowserRouter>
      <Navigation />
      <Route path="/" exact component={Home} />
      <Route path="/login" exact component={Login} />
      <Route path="/inputresult" exact component={InputResult} />
      <Footer />
    </BrowserRouter>
  );
}
