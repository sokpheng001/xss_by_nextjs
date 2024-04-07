'use client'
import React, { useState } from "react";

function XssDemo() {
  const [userInput, setUserInput] = useState("");

  const handleChange = (event) => {
    setUserInput(event.target.value);
  };

  return (
    <div>
      <h1>XSS Demonstration (Educational Purpose Only)</h1>
      <p>Enter some text:</p>
      <form onSubmit={(e) => e.preventDefault()}>
        <input type="text" value={userInput} onChange={handleChange} />
        <button type="submit">Display</button>
      </form>
      <div dangerouslySetInnerHTML={{ __html: userInput }} />
    </div>
  );
}

export default XssDemo;
