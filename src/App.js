import React from "react";
import './App.css';
import { ConsultaCep } from './components/ConsutaCep';

function App() {
  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-3">
          <ConsultaCep />
        </div>
      </div>
    </div>
  );
}

export default App;
