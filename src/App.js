// App.js
import React, { useState } from "react";
import FibonacciTree from "./components/FibonacciTree";
import { generateFibTree } from "./utils/generateFibTree";
import ScrollToTopButton from "./components/ScrollToTopButton/ScrollToTopButton"
import "./App.css";

function App() {
  const [n, setN] = useState("");
  const [treeData, setTreeData] = useState(null);

  const handleGenerate = () => {
    const num = parseInt(n, 10);
    if (!isNaN(num) && num >= 0 && num <= 10) {
      setTreeData(generateFibTree(num));
    } else {
      alert("Please enter a valid number between 0 and 10 (for batter performance).");
    }
  };

  return (
    <div className="app-container">
      <div className="input-section">
        <h1> Fibonacci Tree Generator</h1>
        <span>
          <input
            type="number"
            value={n}
            onChange={(e) => setN(e.target.value)}
            placeholder="Enter a number"
          />
          <button onClick={handleGenerate}>Generate Tree</button>
        </span>
      </div>

      {treeData && (
        <div className="tree-wrapper">
          <FibonacciTree data={treeData} />
        </div>
      )}

      <ScrollToTopButton />
    </div>
  );
}

export default App;
