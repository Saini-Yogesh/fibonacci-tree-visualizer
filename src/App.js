import React, { useState, useEffect } from "react";
import FibonacciTree from "./components/FibonacciTree";
import { generateFibTree } from "./utils/generateFibTree";
import ScrollToTopButton from "./components/ScrollToTopButton/ScrollToTopButton";
import "./App.css";

function App() {
  const [n, setN] = useState("4");
  const [treeData, setTreeData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = () => {
    const num = parseInt(n, 10);
    if (!isNaN(num) && num >= 0 && num <= 10) {
      setLoading(true);
      setTimeout(() => {
        const tree = generateFibTree(num);
        setTreeData(tree);
        setLoading(false);
      }, 200); // Simulated delay for spinner UX
    } else {
      alert("Please enter a valid number between 0 and 10 (for better performance).");
    }
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setTreeData(generateFibTree(4));
      setLoading(false);
    }, 300);
  }, []);

  return (
    <div className="app-container">
      <div className="input-section">
        <h1>Fibonacci Tree Generator</h1>
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

      {loading ? (
        <div className="spinner">Generating Tree...</div>
      ) : (
        treeData && (
          <div className="tree-wrapper">
            <FibonacciTree data={treeData} />
          </div>
        )
      )}

      <ScrollToTopButton />
    </div>
  );
}

export default App;
