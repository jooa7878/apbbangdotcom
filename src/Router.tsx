import { BrowserRouter, Route } from "react-router-dom";
import Home from "./routes/Home";
import Navigation from "./components/Navigation";
import Login from "./routes/Login";
import InputResult from "./routes/InputResult";
import Footer from "./components/Footer";
import TotalMatch from "./routes/TotalMatch";
import UserInfo from "./routes/UserInfo";
import Ranking from "./routes/Ranking";

export default function Router() {
  return (
    <BrowserRouter>
      <Navigation />
      <Route path="/" exact component={Home} />
      <Route path="/login" exact component={Login} />
      <Route path="/inputresult" exact component={InputResult} />
      <Route path="/totalmatch" exact component={TotalMatch} />
      <Route path="/userinfo" exact component={UserInfo} />
      <Route path="/ranking" exact component={Ranking} />
      <Footer />
    </BrowserRouter>
  );
}
