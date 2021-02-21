import { Navbar, NavbarBrand } from "reactstrap";
import Router from "../../routers";
import "./App.css";

const App = () => {
  return (
    <div className="app">
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">Star Wars Planets 🚀</NavbarBrand>
      </Navbar>
      <Router />
      <footer>To the Moon 🌑</footer>
    </div>
  );
};

export default App;
