import React from "react";
import CatPage from "./components/Cat";
import { OctoCat } from "./components/OctoCat";

function App() {
  return (
    <>
      <header>
        <h1>Cats</h1>
      </header>
      <main>
        <OctoCat />
        <CatPage />
      </main>
    </>
  );
}

export default App;
