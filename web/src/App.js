import React from "react";
import "./App.css";
import Providers from "./components/Providers/index";
import Appointments from "./components/Appointments/index";

function App() {
  return (
    <div className="App">
      <Providers />
      <Appointments />
    </div>
  );
}

export default App;
