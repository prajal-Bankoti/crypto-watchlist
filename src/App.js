import "./App.css";
import { Stoks } from "../src/components/stock";
import { Login } from "../src/components/Login";
import { Link } from "react-router-dom";
import { RoutePage } from "./Route/Route";
function App() {
  return (
    <div className="App">
      <RoutePage />
    </div>
  );
}

export default App;
