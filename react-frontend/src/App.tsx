import React from 'react';
import logo from './logo.svg';
import './App.css';
import Routing from "./utils/Routing";
import Header from "./component/layout/header/Header";

function App() {
  return (
      <div className="App">
        <header>
          <Header/>
        </header>
        <section className="content">
          <main>
            <Routing/>
          </main>
        </section>
      </div>
  );
}

export default App;
