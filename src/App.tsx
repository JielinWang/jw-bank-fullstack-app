import {Routes, Route, BrowserRouter} from "react-router-dom";
import  NavBar  from "./Components/Navbar";
import "./App.css";
import Home from "./Components/Home";
import FooterComponent  from "./Components/Footer";
import CreateAccount from "./Components/CreateAccount";
import Login from "./Components/Login";
import Deposit from "./Components/Deposit";
import Withdraw from "./Components/Withdraw";
import AllData  from "./Components/AllData";

function App() {
  return (
    <BrowserRouter>
     <NavBar /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/login" element={<Login />} />
        <Route path="/deposit" element={<Deposit />} />
        <Route path="/withdraw" element={<Withdraw />} />
        <Route path="/alldata" element={<AllData />} />
      </Routes>
      <FooterComponent />
    </BrowserRouter>
  );
}

export default App;
